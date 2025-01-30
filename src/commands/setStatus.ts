import { TaskStatus } from "../models/enums";
import { TaskService } from "../services/taskService";
import { Logger } from "../utils/logger";

export const setStatus = async (id: number, status: string) => {
	try {
		if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
			throw new Error(`Invalid status: ${status}`);
		}
		const taskStatus = status as TaskStatus;
		const task = await TaskService.updateTask(id, { status: taskStatus });
		Logger.success(
			`Task ${task.id} is now ${task.status.slice(0, 1).toUpperCase()}${task.status.slice(1)}`,
		);
	} catch (error) {
		Logger.error(error instanceof Error ? error.message : "Unknown error");
	}
};
