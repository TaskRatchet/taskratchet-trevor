import readline from "readline";
import bot from "../bot/index";
import chalk from "chalk";

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
      console.log(`\n${m}\n`);
      prompt();
    }
  });
}

// Start the recursive questioning
prompt();
