import { sendBotMessage } from "./messaging";
import { api } from "../_generated/api";
import { CommandContext } from "./utils";

export const command = "/connect_taskratchet";

export async function execute(
  params: string,
  options: CommandContext,
): Promise<void> {
  const { message, botToken, ctx } = options;

  if (!params) {
    await sendBotMessage(
      botToken,
      message,
      "Please provide your TaskRatchet API token.\n\n" +
        "Usage: /connect_taskratchet <token>\n\n" +
        "You can find your token at https://taskratchet.com/account",
    );
    return;
  }

  try {
    // Verify credentials by calling the correct API endpoint.
    const response = await fetch("https://api.taskratchet.com/api2/me", {
      headers: {
        Authorization: `ApiKey-v2 ${params}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    // Store the user's TaskRatchet token.
    // (Here, we use the sender's ID from the message as the user identifier.)
    await ctx.runMutation(api.users.storeTaskratchetToken, {
      telegramId: message.from?.id || "unknown",
      taskratchetToken: params,
    });

    await sendBotMessage(
      botToken,
      message,
      "Successfully connected to TaskRatchet!\n\n" +
        "You can now use the following commands:\n" +
        "/tasks - List your TaskRatchet tasks\n" +
        "/add_task - Create a new task",
    );
  } catch (error) {
    console.error("Error connecting TaskRatchet:", error);
    await sendBotMessage(
      botToken,
      message,
      "Failed to connect to TaskRatchet. Please check your token and try again.",
    );
  }
}
