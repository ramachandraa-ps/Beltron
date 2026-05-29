import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

function generateRequestId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `REQ-${year}-${random}`;
}

export const submit = mutation({
  args: {
    type: v.union(
      v.literal("it_support"),
      v.literal("hardware"),
      v.literal("software_access"),
      v.literal("network"),
      v.literal("leave"),
      v.literal("transfer"),
      v.literal("training"),
      v.literal("other")
    ),
    subject: v.string(),
    description: v.string(),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "You must be signed in to submit a request",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "User profile not found. Please complete your profile first.",
      });
    }

    const requestId = generateRequestId();

    const id = await ctx.db.insert("employeeRequests", {
      userId: user._id,
      requestId,
      type: args.type,
      subject: args.subject,
      description: args.description,
      priority: args.priority,
      status: "pending",
    });

    return { id, requestId };
  },
});

export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) return [];

    const requests = await ctx.db
      .query("employeeRequests")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return requests;
  },
});

export const getByRequestId = query({
  args: { requestId: v.string() },
  handler: async (ctx, args) => {
    const request = await ctx.db
      .query("employeeRequests")
      .withIndex("by_request_id", (q) => q.eq("requestId", args.requestId))
      .unique();

    return request;
  },
});

export const updateStatus = mutation({
  args: {
    requestId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("rejected")
    ),
    adminRemarks: v.optional(v.string()),
    assignedTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "You must be signed in",
      });
    }

    const request = await ctx.db
      .query("employeeRequests")
      .withIndex("by_request_id", (q) => q.eq("requestId", args.requestId))
      .unique();

    if (!request) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Request not found",
      });
    }

    const updates: Record<string, string | undefined> = {
      status: args.status,
    };
    if (args.adminRemarks !== undefined) updates.adminRemarks = args.adminRemarks;
    if (args.assignedTo !== undefined) updates.assignedTo = args.assignedTo;
    if (args.status === "completed") updates.completedAt = new Date().toISOString();

    await ctx.db.patch(request._id, updates);
    return request._id;
  },
});
