import { httpAction } from "./_generated/server";

export const telegramWebhook = httpAction(async (ctx, req) => {
  // Ensure the Telegram bot token is set via environment variable.
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    console.error("TELEGRAM_BOT_TOKEN is not defined in the environment.");
    return new Response("Server configuration error", { status: 500 });
  }
``
  // Only allow POST requests.
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Parse the JSON payload from the Telegram webhook.
    const update = await req.json();

    // Validate the incoming update (Telegram sends an update_id).
    if (typeof update.update_id === "undefined") {
      return new Response("Bad Request: Missing update_id", { status: 400 });
    }

    // Basic message handling logic:
    if (update.message && update.message.text) {
      const { message } = update;
      console.log(`Received message from ${message.from?.username || 'unknown'}: ${message.text}`);
      
      // Handle /start command
      if (message.text.startsWith('/start')) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: message.chat.id,
            text: 'Hello! I am your TaskRatchet bot. How can I help you today?'
          }),
        });
      }
    } else {
      console.log("Received non-message update:", update);
    }

    // Return OK to acknowledge receipt.
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing Telegram update:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
