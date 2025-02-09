export interface TelegramMessage {
  chat: {
    id: number;
  };
  from?: {
    id: number;
    username?: string;
  };
  text: string;
}

export interface CommandContext {
  ctx: any;
  message: TelegramMessage;
  botToken: string;
}

export interface Command {
  command: string;
  execute: (params: string, options: CommandContext) => Promise<void>;
}

export async function sendTelegramMessage(botToken: string, chatId: number, text: string): Promise<void> {
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
