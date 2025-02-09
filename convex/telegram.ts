import { httpAction } from "./_generated/server";
import { telegramCommands } from "./commands";

export const telegramWebhook = httpAction(async (ctx, req) => {
  // Ensure the Telegram bot token is set via environment variable.
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    console.error("TELEGRAM_BOT_TOKEN is not defined in the environment.");
    return new Response("Server configuration error", { status: 500 });
  }

  // Only allow POST requests.
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Parse the JSON payload from Telegram.
    const update = await req.json();
    if (typeof update.update_id === "undefined") {
      return new Response("Bad Request: Missing update_id", { status: 400 });
    }

    if (update.message && update.message.text) {
      const { message } = update;
      console.log(`Received message from ${message.from?.username || 'unknown'}: ${message.text}`);
      const text: string = message.text.trim();
      let handled = false;
      for (const cmd of telegramCommands) {
        if (text.startsWith(cmd.command)) {
          // Remove the command portion and pass the rest as parameters
          const params = text.slice(cmd.command.length).trim();
          await cmd.execute(params, { ctx, message, botToken });
          handled = true;
          break;
        }
      }
      if (!handled) {
        console.log("Unknown command:", text);
      }
    }

    // Always return OK to acknowledge receipt.
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing Telegram update:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
