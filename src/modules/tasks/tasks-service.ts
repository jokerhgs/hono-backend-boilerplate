import { type Task, type CreateTaskDTO, type UpdateTaskDTO } from './tasks-schema.js';
import { randomUUID } from 'crypto';

export class TasksService {
    private tasks: Task[] = [];

    findAll(): Task[] {
        return this.tasks;
    }

    findById(id: string): Task | undefined {
        return this.tasks.find(t => t.id === id);
    }

    create(data: CreateTaskDTO): Task {
        const newTask: Task = {
            id: randomUUID(),
            title: data.title,
            completed: data.completed ?? false,
            createdAt: new Date().toISOString()
        };
        this.tasks.push(newTask);
        return newTask;
    }

    update(id: string, data: UpdateTaskDTO): Task | null {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) return null;

        const updatedTask = { ...this.tasks[taskIndex], ...data };
        this.tasks[taskIndex] = updatedTask;
        return updatedTask;
    }

    delete(id: string): boolean {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) return false;

        this.tasks.splice(taskIndex, 1);
        return true;
    }

    // Helper for testing
    reset(): void {
        this.tasks = [];
    }
}

export const tasksService = new TasksService();
