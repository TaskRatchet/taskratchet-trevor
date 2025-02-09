import { sendTelegramMessage } from "./utils";
import { api } from "../_generated/api";

export const command = "/connect_taskratchet";

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
      'Please provide your TaskRatchet API v2 token.\n\n' +
      'Usage: /connect_taskratchet <token>\n\n' +
      'You can find your token at https://taskratchet.com/account'
    );
    return;
  }

  try {
    // Verify the token by making a test API call
    const response = await fetch('https://api.taskratchet.com/api/v2/user', {
      headers: {
        'Authorization': `Bearer ${params}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }

    // Store the user's TaskRatchet token
    await ctx.runMutation(api.users.storeTaskratchetToken, {
      telegramId,
      taskratchetToken: params,
    });

    await sendTelegramMessage(
      botToken,
      chatId,
      'Successfully connected to TaskRatchet!\n\n' +
      'You can now use the following commands:\n' +
      '/tasks - List your TaskRatchet tasks\n' +
      '/add_task - Create a new task'
    );
  } catch (error) {
    console.error('Error connecting TaskRatchet:', error);
    await sendTelegramMessage(
      botToken,
      chatId,
      'Failed to connect to TaskRatchet. Please check your token and try again.'
    );
  }
}
