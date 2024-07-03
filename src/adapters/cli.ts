import readline from "readline";
import bot from "../bot/index.js";
import chalk from "chalk";
import { marked, MarkedExtension } from "marked";
import { markedTerminal } from "marked-terminal";

marked.use(
  markedTerminal({
    reflowText: true,
    width: 80,
  }) as MarkedExtension,
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function prompt() {
  rl.question(chalk.red.bold(">> "), async (answer) => {
    if (answer.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
    } else {
      const m = await bot(answer);
      console.log(`\n${marked.parse(m)}\n`);
      prompt();
    }
  });
}

prompt();
