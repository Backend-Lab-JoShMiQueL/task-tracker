import type { TaskStatus } from "./enums";

export interface Task {
	id: number;
	description: string;
	status: TaskStatus;
	createdAt: string;
	updatedAt: string;
}

export type TaskUpdate = Partial<Pick<Task, "description" | "status">>;
