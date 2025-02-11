import { httpAction } from "./_generated/server";
import { commands } from "./commands";

// Discord webhook handler.
// Here we assume Discord sends a JSON payload for a message created event.
export const discordWebhook = httpAction(async (ctx, req) => {
  // Only allow POST requests.
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const event = await req.json();

    // Assume this is a Discord message create event:
    // Example payload properties: channel_id, author, content.
    if (event.content) {
      const message = {
        platform: "discord" as const,
        id: event.channel_id,
        chat: { id: Number(event.channel_id) },
        from: event.author,
        text: event.content,
      };

      console.log(
        `Received Discord message from ${event.author?.username || "unknown"}: ${event.content}`,
      );

      let handled = false;
      for (const cmd of commands) {
        if (message.text.startsWith(cmd.command)) {
          // Remove command part and pass the rest as parameters.
          const params = message.text.slice(cmd.command.length).trim();
          await cmd.execute(params, {
            ctx,
            message,
            botToken: process.env.DISCORD_BOT_TOKEN || "",
          });
          handled = true;
          break;
        }
      }
      if (!handled) {
        console.log("Unknown Discord command:", message.text);
      }
    }

    // Always respond OK.
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing Discord event:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
