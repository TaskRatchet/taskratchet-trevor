import { sendTelegramMessage } from "./utils";

export const command = "/start";

export async function execute(
  _params: string,
  options: { ctx: any; message: any; botToken: string }
): Promise<void> {
  const { message, botToken } = options;
  const chatId = message.chat.id;
  const welcomeText =
    'Welcome to TaskRatchet Bot! To get started, you\'ll need to connect your accounts.\n\n' +
    'Use /connect_taskratchet <token> to connect your TaskRatchet account.\n' +
    'You can find your token at https://taskratchet.com/account\n\n' +
    'Use /connect_beeminder <token> to connect your Beeminder account.\n' +
    'You can find your token at https://www.beeminder.com/settings/api_token';
  await sendTelegramMessage(botToken, chatId, welcomeText);
}
