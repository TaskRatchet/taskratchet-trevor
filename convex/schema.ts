import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    telegramId: v.string(),
    beeminderToken: v.optional(v.string()),
    beeminderUsername: v.optional(v.string()),
    taskratchetToken: v.optional(v.string()),
  }).index("by_telegram_id", ["telegramId"]),
});
