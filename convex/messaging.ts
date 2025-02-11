import { Platform } from "./commands/messaging";

export interface BotMessage {
  platform: Platform;
  id: number | string;
  chat?: {
    id: number;
  };
  from?: {
    id: string;
    username?: string;
  };
  text: string;
}
