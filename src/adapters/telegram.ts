import { Telegraf } from "telegraf";
import trevor from "../bot/index";
import { message } from "telegraf/filters";

const BOT_TOKEN = process.env.BOT_TOKEN || "";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("Telegram bot started");
});

bot.on(message("text"), async (ctx) => {
  const m = ctx.message.text;
  const r = await trevor(m);
  return ctx.reply(r);
});

bot
  .launch()
  .then(() => console.log("Bot started"))
  .catch(console.error);

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
