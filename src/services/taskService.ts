import { Temporal } from "temporal-polyfill";
import { TaskStatus } from "../models/enums";
import type { Task, TaskUpdate } from "../models/task";
import { FileHandler } from "../utils/fileHandler";

export namespace TaskService {
	export async function getTasks(): Promise<Task[]> {
		return await FileHandler.readTasks();
	}

	export async function createTask(description: string): Promise<Task> {
		const tasks = await FileHandler.readTasks();
		const now = Temporal.Now.instant().toString();
		const newTask: Task = {
			id: generateId(tasks),
			description,
			status: TaskStatus.Todo,
			createdAt: now,
			updatedAt: now,
		};

		await FileHandler.writeTasks([...tasks, newTask]);
		return newTask;
	}

	export async function deleteTask(id: number): Promise<void> {
		const tasks = await FileHandler.readTasks();
		const taskIndex = tasks.findIndex((t) => t.id === id);

		if (taskIndex === -1) throw new Error(`Task ${id} not found`);

		tasks.splice(taskIndex, 1);
		await FileHandler.writeTasks(tasks);
	}

	export async function updateTask(
		id: number,
		update: TaskUpdate,
	): Promise<Task> {
		const tasks = await FileHandler.readTasks();
		const taskIndex = tasks.findIndex((t) => t.id === id);

		if (taskIndex === -1) throw new Error(`Task ${id} not found`);

		const updatedTask = {
			...tasks[taskIndex],
			...update,
			updatedAt: Temporal.Now.instant().toString(),
		};

		tasks[taskIndex] = updatedTask;
		await FileHandler.writeTasks(tasks);
		return updatedTask;
	}

	function generateId(tasks: Task[]): number {
		return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
	}
}
