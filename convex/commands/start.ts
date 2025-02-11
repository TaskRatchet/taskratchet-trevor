import { ActionCtx } from "../_generated/server";
import { BotMessage, sendBotMessage } from "./messaging";

export const command = "/start";

export async function execute(
  _params: string,
  options: {
    ctx: ActionCtx;
    message: BotMessage;
    botToken: string;
  },
): Promise<void> {
  const { message, botToken } = options;
  const welcomeText =
    "Welcome to TaskRatchet Bot! To get started, you'll need to connect your accounts.\n\n" +
    "Use /connect_taskratchet <token> to connect your TaskRatchet account.\n" +
    "You can find your token at https://taskratchet.com/account\n\n" +
    "Use /connect_beeminder <token> to connect your Beeminder account.\n" +
    "You can find your token at https://www.beeminder.com/settings/api_token";
  await sendBotMessage(botToken, message, welcomeText);
}
