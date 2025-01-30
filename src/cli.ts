import { addCommand } from "./commands/add";
import { deleteCommand } from "./commands/delete";
import { listCommand } from "./commands/list";
import { setStatus } from "./commands/setStatus";
import { updateCommand } from "./commands/update";
import { Command } from "./models/enums";
import { Logger } from "./utils/logger";

const printHelp = () => {
	console.log(`
Usage: task-cli <command> [arguments]

Commands:
  add <description>      Add new task
  help                   Show this help

Examples:
  task-cli add "Buy milk"
`);
};

const main = async () => {
	const [, , command, ...args] = Bun.argv;

	try {
		switch (command) {
			case Command.Add:
				await addCommand(args[0]);
				break;
			case Command.Delete:
				await deleteCommand(Number.parseInt(args[0], 10));
				break;
			case Command.Update:
				await updateCommand(Number.parseInt(args[0], 10), args[1]);
				break;
			case Command.List:
				await listCommand();
				break;
			case Command.SetStatus:
				await setStatus(Number.parseInt(args[0], 10), args[1]);
				break;
			case "help":
				printHelp();
				break;
			default:
				Logger.error("Invalid command");
				printHelp();
				process.exit(1);
		}
	} catch (error) {
		Logger.error(error instanceof Error ? error.message : "Unknown error");
		process.exit(1);
	}
};

await main();
