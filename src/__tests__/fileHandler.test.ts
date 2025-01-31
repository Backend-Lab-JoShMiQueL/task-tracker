import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import path from "node:path";
import { TaskStatus } from "../models/enums";
import type { Task } from "../models/task";
import { FileHandler } from "../utils/fileHandler";

const TASKS_FILE = path.join(process.cwd(), "tasks.json");

describe("FileHandler", () => {
	beforeEach(async () => {
		// Ensure the tasks file is clean before each test
		const taskFile = Bun.file(TASKS_FILE);
		if (await taskFile.exists()) {
			await taskFile.delete();
		} else {
			await Bun.write(TASKS_FILE, JSON.stringify([]));
		}
	});

	afterEach(async () => {
		// Clean up the tasks file after each test
		const taskFile = Bun.file(TASKS_FILE);
		if (await taskFile.exists()) {
			await taskFile.delete();
		}
	});

	it("should read an empty array if tasks file does not exist", async () => {
		const tasks = await FileHandler.readTasks();
		expect(tasks).toEqual([]);
	});

	it("should write tasks to the file", async () => {
		const tasks: Task[] = [
			{
				id: 1,
				description: "Test Task",
				status: TaskStatus.InProgress,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		];
		await FileHandler.writeTasks(tasks);

		const data = await Bun.file(TASKS_FILE).text();
		const savedTasks = JSON.parse(data);
		expect(savedTasks).toEqual(tasks);
	});

	it("should read tasks from the file", async () => {
		const tasks: Task[] = [
			{
				id: 1,
				description: "Test Task",
				status: TaskStatus.InProgress,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		];
		await Bun.write(TASKS_FILE, JSON.stringify(tasks, null, 2));

		const readTasks = await FileHandler.readTasks();
		expect(readTasks).toEqual(tasks);
	});

	it("should overwrite existing tasks in the file", async () => {
		const initialTasks: Task[] = [
			{
				id: 1,
				description: "Initial Task",
				status: TaskStatus.Done,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		];
		await Bun.write(TASKS_FILE, JSON.stringify(initialTasks, null, 2));
		const newTasks: Task[] = [
			{
				id: 2,
				description: "New Task",
				status: TaskStatus.InProgress,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		];
		await FileHandler.writeTasks(newTasks);

		const data = await Bun.file(TASKS_FILE).text();
		const savedTasks = JSON.parse(data);
		expect(savedTasks).toEqual(newTasks);
	});

	it("should handle writing and reading an empty array", async () => {
		const tasks: Task[] = [];
		await FileHandler.writeTasks(tasks);

		const data = await Bun.file(TASKS_FILE).text();
		const savedTasks = JSON.parse(data);
		expect(savedTasks).toEqual(tasks);

		const readTasks = await FileHandler.readTasks();
		expect(readTasks).toEqual(tasks);
	});
});
