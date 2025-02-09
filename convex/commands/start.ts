import { sendTelegramMessage } from "./utils";

export const command = "/start";

export async function execute(
  _params: string,
  options: { ctx: any; message: any; botToken: string }
): Promise<void> {
  const { message, botToken } = options;
  const chatId = message.chat.id;
  const welcomeText =
    'Welcome to TaskRatchet Bot! To get started, you\'ll need to connect your Beeminder account.\n\n' +
    'Use /connect_beeminder <token> to connect your Beeminder account.\n\n' +
    'You can find your token at https://www.beeminder.com/settings/api_token';
  await sendTelegramMessage(botToken, chatId, welcomeText);
}
