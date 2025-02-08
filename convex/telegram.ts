import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

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
      
      const text = message.text.trim();
      const chatId = message.chat.id;
      const telegramId = message.from?.id?.toString();

      if (!telegramId) {
        throw new Error("No telegram ID found in message");
      }

      // Handle /start command
      if (text.startsWith('/start')) {
        await sendTelegramMessage(botToken, chatId, 
          'Welcome to TaskRatchet Bot! To get started, you\'ll need to connect your Beeminder account.\n\n' +
          'Use /connect_beeminder <token> to connect your Beeminder account.\n\n' +
          'You can find your token at https://www.beeminder.com/settings/api_token'
        );
        return new Response("OK", { status: 200 });
      }

      // Handle /connect_beeminder command
      if (text.startsWith('/connect_beeminder')) {
        const token = text.split(' ')[1]?.trim();
        if (!token) {
          await sendTelegramMessage(botToken, chatId,
            'Please provide your Beeminder API token.\n\n' +
            'Usage: /connect_beeminder <token>\n\n' +
            'You can find your token at https://www.beeminder.com/settings/api_token'
          );
          return new Response("OK", { status: 200 });
        }

        try {
          // Verify the token by fetching the user's info from Beeminder
          const beeminderResponse = await fetch(
            `https://www.beeminder.com/api/v1/users/me.json?auth_token=${token}`
          );
          const beeminderData = await beeminderResponse.json();

          if (!beeminderResponse.ok) {
            throw new Error(beeminderData.errors || 'Invalid token');
          }

          // Store the user's Beeminder token
          await ctx.runMutation(api.users.storeBeeminderToken, {
            telegramId,
            beeminderToken: token,
            beeminderUsername: beeminderData.username,
          });

          await sendTelegramMessage(botToken, chatId,
            `Successfully connected to Beeminder account: ${beeminderData.username}\n\n` +
            'You can now use the following commands:\n' +
            '/goals - List your Beeminder goals\n' +
            '/add <goal> <value> - Add a datapoint to a goal'
          );
        } catch (error) {
          console.error('Error connecting Beeminder:', error);
          await sendTelegramMessage(botToken, chatId,
            'Failed to connect to Beeminder. Please check your token and try again.'
          );
        }
        return new Response("OK", { status: 200 });
      }

      // Handle /goals command
      if (text.startsWith('/goals')) {
        try {
          // Get user's Beeminder token
          const user = await ctx.runQuery(api.users.getUser, { telegramId });
          
          if (!user?.beeminderToken) {
            await sendTelegramMessage(botToken, chatId,
              'You need to connect your Beeminder account first.\n\n' +
              'Use /connect_beeminder <token> to connect.\n\n' +
              'You can find your token at https://www.beeminder.com/settings/api_token'
            );
            return new Response("OK", { status: 200 });
          }

          // Fetch goals from Beeminder
          const beeminderResponse = await fetch(
            `https://www.beeminder.com/api/v1/users/me/goals.json?auth_token=${user.beeminderToken}`
          );
          const goals = await beeminderResponse.json();

          if (!beeminderResponse.ok) {
            throw new Error('Failed to fetch goals from Beeminder');
          }

          if (!goals.length) {
            await sendTelegramMessage(botToken, chatId, 'You don\'t have any Beeminder goals yet.');
            return new Response("OK", { status: 200 });
          }

          // Format goals list with key information
          const goalsText = goals
            .sort((a, b) => a.losedate - b.losedate) // Sort by urgency
            .map(goal => {
              const daysLeft = Math.ceil((goal.losedate * 1000 - Date.now()) / (1000 * 60 * 60 * 24));
              const urgencyEmoji = 
                daysLeft <= 1 ? '🔴' :
                daysLeft <= 3 ? '🟡' : '🟢';
              
              return `${urgencyEmoji} ${goal.slug}: ${goal.title || 'Untitled'}\n` +
                     `   ${goal.limsum}\n`;
            })
            .join('\n');

          await sendTelegramMessage(botToken, chatId,
            'Your Beeminder Goals:\n\n' + goalsText + '\n' +
            '🔴 Due today/tomorrow\n' +
            '🟡 Due in 2-3 days\n' +
            '🟢 Due in 4+ days'
          );
        } catch (error) {
          console.error('Error fetching goals:', error);
          await sendTelegramMessage(botToken, chatId,
            'Sorry, there was an error fetching your goals. Please try again later.'
          );
        }
        return new Response("OK", { status: 200 });
      }
    }

    // Return OK to acknowledge receipt.
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing Telegram update:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

async function sendTelegramMessage(botToken: string, chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });
}
