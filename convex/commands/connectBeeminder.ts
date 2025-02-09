import { sendTelegramMessage } from "./utils";
import { api } from "../_generated/api";

export const command = "/connect_beeminder";

export async function execute(
  params: string,
  options: { ctx: any; message: any; botToken: string }
): Promise<void> {
  const { message, botToken, ctx } = options;
  const chatId = message.chat.id;
  const telegramId = message.from?.id?.toString();

  if (!telegramId) {
    throw new Error("No telegram ID found in message");
  }

  if (!params) {
    await sendTelegramMessage(
      botToken,
      chatId,
      'Please provide your Beeminder API token.\n\n' +
      'Usage: /connect_beeminder <token>\n\n' +
      'You can find your token at https://www.beeminder.com/settings/api_token'
    );
    return;
  }

  try {
    // Verify the token by fetching the user's info from Beeminder
    const beeminderResponse = await fetch(
      `https://www.beeminder.com/api/v1/users/me.json?auth_token=${params}`
    );
    const beeminderData = await beeminderResponse.json();

    if (!beeminderResponse.ok) {
      throw new Error(beeminderData.errors || 'Invalid token');
    }

    // Store the user's Beeminder token
    await ctx.runMutation(api.users.storeBeeminderToken, {
      telegramId,
      beeminderToken: params,
      beeminderUsername: beeminderData.username,
    });

    await sendTelegramMessage(
      botToken,
      chatId,
      `Successfully connected to Beeminder account: ${beeminderData.username}\n\n` +
      'You can now use the following commands:\n' +
      '/goals - List your Beeminder goals\n' +
      '/add <goal> <value> - Add a datapoint to a goal'
    );
  } catch (error) {
    console.error('Error connecting Beeminder:', error);
    await sendTelegramMessage(
      botToken,
      chatId,
      'Failed to connect to Beeminder. Please check your token and try again.'
    );
  }
}
