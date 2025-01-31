import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	type jest,
	spyOn,
} from "bun:test";
import { Temporal } from "temporal-polyfill";
import { TaskStatus } from "../models/enums";
import type { Task } from "../models/task";
import { Logger } from "../utils/logger";

let consoleLogSpy: jest.Mock;
let consoleErrorSpy: jest.Mock;

describe("Logger", () => {
	beforeEach(() => {
		consoleLogSpy = spyOn(console, "log").mockImplementation(() => {});
		consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		consoleLogSpy.mockRestore();
		consoleErrorSpy.mockRestore();
	});

	it("success logs a success message", () => {
		const message = "Operation was successful";
		Logger.success(message);
		expect(consoleLogSpy.mock.calls[0][0]).toBe(`✅ ${message}`);
	});

	it("error logs an error message", () => {
		const message = "Something went wrong";
		Logger.error(message);
		expect(consoleErrorSpy).toHaveBeenCalledWith(`❌ Error: ${message}`);
	});

	it("logs multiple success messages", () => {
		const messages = ["First success", "Second success"];
		for (const message of messages) {
			Logger.success(message);
		}
		expect(consoleLogSpy).toHaveBeenCalledWith("✅ First success");
		expect(consoleLogSpy).toHaveBeenCalledWith("✅ Second success");
	});

	it("logs multiple error messages", () => {
		const messages = ["First error", "Second error"];
		for (const message of messages) {
			Logger.error(message);
		}
		expect(consoleErrorSpy.mock.calls[0][0]).toBe("❌ Error: First error");
		expect(consoleErrorSpy.mock.calls[1][0]).toBe("❌ Error: Second error");
	});

	it("displays a task", () => {
		const task: Task = {
			id: 1,
			description: "Test task",
			status: TaskStatus.Todo,
			createdAt: Temporal.Now.instant().toString(),
			updatedAt: Temporal.Now.instant().toString(),
		};
		Logger.displayTask(task);
		expect(consoleLogSpy).toHaveBeenCalledWith(
			expect.stringContaining(`ID: ${task.id}`),
		);
		expect(consoleLogSpy).toHaveBeenCalledWith(
			expect.stringContaining(`Description: ${task.description}`),
		);
		expect(consoleLogSpy).toHaveBeenCalledWith(
			expect.stringContaining(`Status: ${task.status}`),
		);
		expect(consoleLogSpy).toHaveBeenCalledWith(
			expect.stringContaining(`Created: ${task.createdAt}`),
		);
		expect(consoleLogSpy).toHaveBeenCalledWith(
			expect.stringContaining(`Updated: ${task.updatedAt}`),
		);
	});
});
