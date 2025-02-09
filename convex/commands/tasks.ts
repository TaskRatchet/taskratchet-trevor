import { sendTelegramMessage } from "./utils";
import { api } from "../_generated/api";

export const command = "/tasks";

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
    // Get user's TaskRatchet token
    const user = await ctx.runQuery(api.users.getUser, { telegramId });
    if (!user?.taskratchetToken) {
      await sendTelegramMessage(
        botToken,
        chatId,
        'You need to connect your TaskRatchet account first.\n\n' +
        'Use /connect_taskratchet <token> to connect.\n\n' +
        'You can find your token at https://taskratchet.com/account'
      );
      return;
    }

    // Fetch tasks from TaskRatchet
    const response = await fetch('https://api.taskratchet.com/api2/me/tasks', {
      headers: {
        Authorization: `ApiKey-v2 ${user.taskratchetToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks from TaskRatchet');
    }

    const tasks = await response.json();

    if (!tasks.length) {
      await sendTelegramMessage(botToken, chatId, 'You don\'t have any TaskRatchet tasks yet.');
      return;
    }

    // Format tasks list with key information
    const tasksText = tasks
      .sort((a: { due: number }, b: { due: number }) => a.due - b.due)
      .map((task: {
        task: string;
        due: number;
        cents: number;
        status: string;
      }) => {
        const dueDate = new Date(task.due * 1000);
        const daysUntilDue = Math.ceil((task.due * 1000 - Date.now()) / (1000 * 60 * 60 * 24));
        const urgencyEmoji =
          daysUntilDue <= 1 ? '🔴' :
          daysUntilDue <= 3 ? '🟡' : '🟢';
        const dollars = (task.cents / 100).toFixed(2);

        return `${urgencyEmoji} ${task.task}\n   Due: ${dueDate.toLocaleDateString()}\n   Stakes: $${dollars}\n   Status: ${task.status}\n`;
      })
      .join('\n');

    await sendTelegramMessage(
      botToken,
      chatId,
      'Your TaskRatchet Tasks:\n\n' + tasksText + '\n' +
      '🔴 Due today/tomorrow\n' +
      '🟡 Due in 2-3 days\n' +
      '🟢 Due in 4+ days'
    );
  } catch (error) {
    console.error('Error fetching tasks:', error);
    await sendTelegramMessage(
      botToken,
      chatId,
      'Sorry, there was an error fetching your tasks. Please try again later.'
    );
  }
}
