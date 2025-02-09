import { Command } from "./utils";
import * as start from "./start";
import * as connectBeeminder from "./connectBeeminder";
import * as goals from "./goals";
import * as connectTaskratchet from "./connectTaskratchet";
import * as tasks from "./tasks";

export const telegramCommands: Command[] = [
  { command: start.command, execute: start.execute },
  { command: connectBeeminder.command, execute: connectBeeminder.execute },
  { command: goals.command, execute: goals.execute },
  { command: connectTaskratchet.command, execute: connectTaskratchet.execute },
  { command: tasks.command, execute: tasks.execute },
];
