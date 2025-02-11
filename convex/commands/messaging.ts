import { sendTelegramMessage } from "./utils";
import { sendDiscordMessage } from "./discordUtils";
import { ActionCtx } from "../_generated/server";

export type Platform = "telegram" | "discord";

export interface BotMessage {
  platform: Platform;
  id: number | string; // For Telegram: chat id; for Discord: channel id.
  chat: {
    id: number;
  };
  from?: {
    id: string;
    username?: string;
  };
  text: string;
}

export interface CommandContext {
  ctx: ActionCtx;
  message: BotMessage;
  botToken: string;
}

export type CommandExecuteFunction = (
  params: string,
  options: CommandContext,
) => Promise<void>;

/**
 * Sends a bot reply based on the platform.
 */
export async function sendBotMessage(
  botToken: string,
  message: BotMessage,
  text: string,
): Promise<void> {
  if (message.platform === "telegram") {
    await sendTelegramMessage(botToken, Number(message.id), text);
  } else if (message.platform === "discord") {
    await sendDiscordMessage(botToken, message.id.toString(), text);
  }
}
