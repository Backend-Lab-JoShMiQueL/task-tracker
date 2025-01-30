import type { Task } from "../models/task";

export namespace Logger {
	export function success(message: string): void {
		console.log(`✅ ${message}`);
	}

	export function error(message: string): void {
		console.error(`❌ Error: ${message}`);
	}

	export function displayTask(task: Task): void {
		console.log(`
ID: ${task.id}
Description: ${task.description}
Status: ${task.status}
Created: ${task.createdAt}
Updated: ${task.updatedAt}
    `);
	}
}
