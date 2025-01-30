import { TaskService } from "../services/taskService";
import { Logger } from "../utils/logger";

export const addCommand = async (description: string) => {
	try {
		const task = await TaskService.createTask(description);
		Logger.success(`Task added successfully (ID: ${task.id})`);
	} catch (error) {
		Logger.error(error instanceof Error ? error.message : "Unknown error");
	}
};
