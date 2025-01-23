import { program } from "commander";
import pkg from "../package.json";

program
	.name("task-cli")
	.description(
		"A simple CLI to track and manage your tasks. You can add, update, delete tasks, and mark them as in progress or done. You can also list tasks by their status.",
	)
	.version(pkg.version);

program
	.command("add")
	.description("Add a new task")
	.argument("<task_id>", "Task ID")
	.argument("<task_name>", "Task Name")
	.argument("<task_description>", "Task Description")
	.action((task_id, task_name, task_description) => {
		console.log(
			`Adding task: ID: ${task_id} - Name: ${task_name} - Description: ${task_description}`,
		);
	});

program.parse();
