import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Generate a unique tracking ID like GRV-2026-XXXXX
function generateTrackingId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `GRV-${year}-${random}`;
}

export const submit = mutation({
  args: {
    category: v.union(
      v.literal("service_delay"),
      v.literal("technical_issue"),
      v.literal("corruption"),
      v.literal("staff_behavior"),
      v.literal("infrastructure"),
      v.literal("payment_issue"),
      v.literal("other")
    ),
    subject: v.string(),
    description: v.string(),
    department: v.string(),
    district: v.optional(v.string()),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "You must be signed in to submit a grievance",
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

    const trackingId = generateTrackingId();

    const grievanceId = await ctx.db.insert("grievances", {
      userId: user._id,
      trackingId,
      category: args.category,
      subject: args.subject,
      description: args.description,
      department: args.department,
      district: args.district,
      status: "submitted",
      priority: args.priority,
    });

    return { grievanceId, trackingId };
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

    const grievances = await ctx.db
      .query("grievances")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return grievances;
  },
});

export const getByTracking = query({
  args: { trackingId: v.string() },
  handler: async (ctx, args) => {
    const grievance = await ctx.db
      .query("grievances")
      .withIndex("by_tracking", (q) => q.eq("trackingId", args.trackingId))
      .unique();

    return grievance;
  },
});
