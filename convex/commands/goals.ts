import { sendTelegramMessage } from "./utils";
import { api } from "../_generated/api";

export const command = "/goals";

export async function execute(
  _params: string,
  options: { ctx: any; message: any; botToken: string }
): Promise<void> {
  const { message, botToken, ctx } = options;
  const chatId = message.chat.id;
  const telegramId = message.from?.id?.toString();

  if (!telegramId) {
    throw new Error("No telegram ID found in message");
  }

  try {
    // Get user's Beeminder token
    const user = await ctx.runQuery(api.users.getUser, { telegramId });
    if (!user?.beeminderToken) {
      await sendTelegramMessage(
        botToken,
        chatId,
        'You need to connect your Beeminder account first.\n\n' +
        'Use /connect_beeminder <token> to connect.\n\n' +
        'You can find your token at https://www.beeminder.com/settings/api_token'
      );
      return;
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
      return;
    }

    // Format goals list with key information
    const goalsText = goals
      .sort((a: { losedate: number }, b: { losedate: number }) => a.losedate - b.losedate)
      .map((goal: { 
        losedate: number;
        slug: string;
        title?: string;
        limsum: string;
      }) => {
        const daysLeft = Math.ceil((goal.losedate * 1000 - Date.now()) / (1000 * 60 * 60 * 24));
        const urgencyEmoji =
          daysLeft <= 1 ? '🔴' :
          daysLeft <= 3 ? '🟡' : '🟢';

        return `${urgencyEmoji} ${goal.slug}: ${goal.title || 'Untitled'}\n   ${goal.limsum}\n`;
      })
      .join('\n');

    await sendTelegramMessage(
      botToken,
      chatId,
      'Your Beeminder Goals:\n\n' + goalsText + '\n' +
      '🔴 Due today/tomorrow\n' +
      '🟡 Due in 2-3 days\n' +
      '🟢 Due in 4+ days'
    );
  } catch (error) {
    console.error('Error fetching goals:', error);
    await sendTelegramMessage(
      botToken,
      chatId,
      'Sorry, there was an error fetching your goals. Please try again later.'
    );
  }
}
