import { httpAction } from "./_generated/server";
import { commands } from "./commands";
import { BotMessage } from "./commands/messaging";

export const telegramWebhook = httpAction(async (ctx, req) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    console.error("TELEGRAM_BOT_TOKEN is not defined in the environment.");
    return new Response("Server configuration error", { status: 500 });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const update = await req.json();
    if (typeof update.update_id === "undefined") {
      return new Response("Bad Request: Missing update_id", { status: 400 });
    }

    if (update.message && update.message.text) {
      const message: BotMessage = {
        platform: "telegram",
        id: update.message.chat.id,
        from: {
          id: update.message.from?.id?.toString(),
          username: update.message.from?.username,
        },
        text: update.message.text.trim(),
      };

      console.log(
        `Received message from ${message.from?.username || "unknown"}: ${message.text}`,
      );

      let handled = false;
      for (const cmd of commands) {
        if (message.text.startsWith(cmd.command)) {
          const params = message.text.slice(cmd.command.length).trim();
          await cmd.execute(params, { ctx, message, botToken });
          handled = true;
          break;
        }
      }
      if (!handled) {
        console.log("Unknown command:", message.text);
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing Telegram update:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
