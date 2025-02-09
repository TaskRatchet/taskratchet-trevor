import { Command } from "./utils";
import * as start from "./start";
import * as connectBeeminder from "./connectBeeminder";
import * as goals from "./goals";

export const telegramCommands: Command[] = [
  { command: start.command, execute: start.execute },
  { command: connectBeeminder.command, execute: connectBeeminder.execute },
  { command: goals.command, execute: goals.execute },
];
