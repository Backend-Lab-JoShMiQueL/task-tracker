import { TaskService } from "../services/taskService";
import { Logger } from "../utils/logger";

export const updateCommand = async (id: number, description: string) => {
	try {
		const task = await TaskService.updateTask(id, { description });
		Logger.success(`Task updated successfully (ID: ${task.id})`);
	} catch (error) {
		Logger.error(error instanceof Error ? error.message : "Unknown error");
	}
};
