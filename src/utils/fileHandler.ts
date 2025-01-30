import path from "node:path";
import type { Task } from "../models/task";

const TASKS_FILE = path.join(process.cwd(), "tasks.json");

export namespace FileHandler {
	export async function readTasks(): Promise<Task[]> {
		if (!Bun.file(TASKS_FILE).exists()) return [];

		const data = await Bun.file(TASKS_FILE).text();
		return JSON.parse(data);
	}

	export async function writeTasks(tasks: Task[]): Promise<void> {
		await Bun.write(TASKS_FILE, JSON.stringify(tasks, null, 2));
	}
}
