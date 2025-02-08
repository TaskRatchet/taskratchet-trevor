import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const storeBeeminderToken = mutation({
  args: {
    telegramId: v.string(),
    beeminderToken: v.string(),
    beeminderUsername: v.string(),
  },
  handler: async (ctx, args) => {
    const { telegramId, beeminderToken, beeminderUsername } = args;

    // Find existing user or create new one
    const existing = await ctx.db
      .query("users")
      .withIndex("by_telegram_id", (q) => q.eq("telegramId", telegramId))
      .first();

    if (existing) {
      return await ctx.db.patch(existing._id, {
        beeminderToken,
        beeminderUsername,
      });
    } else {
      return await ctx.db.insert("users", {
        telegramId,
        beeminderToken,
        beeminderUsername,
      });
    }
  },
});
