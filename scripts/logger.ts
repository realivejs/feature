import chalk from "chalk";

export default {
  error: (message: string) =>
    console.log(`${chalk.magenta("·error·:")} ${chalk.red(`${message}`)}`),
  warn: (message: string) =>
    console.log(`${chalk.magenta("·warning·:")} ${chalk.yellow(`${message}`)}`),
  info: (message: string) =>
    console.log(`${chalk.magenta("·message·:")} ${chalk.yellow(`${message}`)}`),
  complete: (message: string) =>
    console.log(`${chalk.magenta("complete:")} ${chalk.cyan(`${message}`)}`),
};
