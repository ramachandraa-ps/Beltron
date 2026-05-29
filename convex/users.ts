import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "User not logged in",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (user !== null) {
      // Update name/email from identity if changed
      await ctx.db.patch(user._id, {
        name: identity.name ?? user.name,
        email: identity.email ?? user.email,
      });
      return user._id;
    }
    return await ctx.db.insert("users", {
      name: identity.name,
      email: identity.email,
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    return user;
  },
});

export const updateProfile = mutation({
  args: {
    role: v.optional(v.union(
      v.literal("citizen"),
      v.literal("vendor"),
      v.literal("employee")
    )),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    department: v.optional(v.string()),
    designation: v.optional(v.string()),
    district: v.optional(v.string()),
    organizationName: v.optional(v.string()),
    gstNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "User not logged in",
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
        message: "User profile not found",
      });
    }

    const updates: Record<string, string | undefined> = {};
    if (args.role !== undefined) updates.role = args.role;
    if (args.name !== undefined) updates.name = args.name;
    if (args.phone !== undefined) updates.phone = args.phone;
    if (args.department !== undefined) updates.department = args.department;
    if (args.designation !== undefined) updates.designation = args.designation;
    if (args.district !== undefined) updates.district = args.district;
    if (args.organizationName !== undefined) updates.organizationName = args.organizationName;
    if (args.gstNumber !== undefined) updates.gstNumber = args.gstNumber;

    await ctx.db.patch(user._id, updates);
    return user._id;
  },
});
