import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.union(
      v.literal("citizen"),
      v.literal("vendor"),
      v.literal("employee")
    )),
    phone: v.optional(v.string()),
    department: v.optional(v.string()),
    designation: v.optional(v.string()),
    district: v.optional(v.string()),
    organizationName: v.optional(v.string()),
    gstNumber: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  grievances: defineTable({
    userId: v.id("users"),
    trackingId: v.string(),
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
    status: v.union(
      v.literal("submitted"),
      v.literal("under_review"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("closed")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    ),
    adminRemarks: v.optional(v.string()),
    resolvedAt: v.optional(v.string()),
  }).index("by_user", ["userId"])
    .index("by_tracking", ["trackingId"]),

  employeeRequests: defineTable({
    userId: v.id("users"),
    requestId: v.string(),
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
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("rejected")
    ),
    assignedTo: v.optional(v.string()),
    adminRemarks: v.optional(v.string()),
    completedAt: v.optional(v.string()),
  }).index("by_user", ["userId"])
    .index("by_request_id", ["requestId"]),
});
