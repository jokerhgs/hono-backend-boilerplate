import type { Context } from 'hono';
import { tasksService } from './tasks-service.js';
import { CreateTaskSchema, UpdateTaskSchema } from './tasks-schema.js';

export const getTasks = (c: Context) => {
    const tasks = tasksService.findAll();
    return c.json(tasks);
};

export const getTaskFn = (c: Context) => {
    const id = c.req.param('id');
    const task = tasksService.findById(id);
    if (!task) return c.json({ error: 'Task not found' }, 404);
    return c.json(task);
};

export const createTask = async (c: Context) => {
    const body = await c.req.json();
    const result = CreateTaskSchema.safeParse(body);
    if (!result.success) {
        return c.json({ error: result.error }, 400);
    }
    const newTask = tasksService.create(result.data);
    return c.json(newTask, 201);
};

export const updateTask = async (c: Context) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = UpdateTaskSchema.safeParse(body);
    if (!result.success) {
        return c.json({ error: result.error }, 400);
    }
    const updatedTask = tasksService.update(id, result.data);
    if (!updatedTask) return c.json({ error: 'Task not found' }, 404);
    return c.json(updatedTask);
};

export const deleteTask = (c: Context) => {
    const id = c.req.param('id');
    const success = tasksService.delete(id);
    if (!success) return c.json({ error: 'Task not found' }, 404);
    return c.body(null, 204);
};
