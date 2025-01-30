import { TaskService } from "../services/taskService";
import { Logger } from "../utils/logger";

export const listCommand = async () => {
	try {
		const tasks = await TaskService.getTasks();
		for (const task of tasks) {
			console.log(` - [${task.id}] ${task.description}`);
		}
	} catch (error) {
		Logger.error(error instanceof Error ? error.message : "Unknown error");
	}
};
