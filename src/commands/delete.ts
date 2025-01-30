import { TaskService } from "../services/taskService";
import { Logger } from "../utils/logger";

export const deleteCommand = async (id: number) => {
	try {
		await TaskService.deleteTask(id);
		Logger.success(`Task deleted successfully (ID: ${id})`);
	} catch (error) {
		Logger.error(error instanceof Error ? error.message : "Unknown error");
	}
};
