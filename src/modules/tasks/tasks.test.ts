import { describe, it, expect, beforeEach } from 'vitest';
import { Hono } from 'hono';
import tasksRouter from './tasks-routes.js';
import { tasksService } from './tasks-service.js';

describe('Tasks API', () => {
    const app = new Hono().route('/', tasksRouter);

    beforeEach(() => {
        tasksService.reset();
    });

    it('should return empty list initially', async () => {
        const res = await app.request('/');
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data).toEqual([]);
    });

    it('should create a task', async () => {
        const res = await app.request('/', {
            method: 'POST',
            body: JSON.stringify({ title: 'Test Task' }),
            headers: { 'Content-Type': 'application/json' }
        });
        expect(res.status).toBe(201);
        const data = await res.json();
        expect(data.title).toBe('Test Task');
        expect(data.id).toBeDefined();
        expect(data.completed).toBe(false);
    });

    it('should get a task by id', async () => {
        // Create first
        const createRes = await app.request('/', {
            method: 'POST',
            body: JSON.stringify({ title: 'Test Task' }),
            headers: { 'Content-Type': 'application/json' }
        });
        const created = await createRes.json();

        // Get
        const res = await app.request(`/${created.id}`);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.id).toBe(created.id);
        expect(data.title).toBe('Test Task');
    });

    it('should update a task', async () => {
        // Create first
        const createRes = await app.request('/', {
            method: 'POST',
            body: JSON.stringify({ title: 'Test Task' }),
            headers: { 'Content-Type': 'application/json' }
        });
        const created = await createRes.json();

        // Update
        const res = await app.request(`/${created.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed: true }),
            headers: { 'Content-Type': 'application/json' }
        });
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.completed).toBe(true);
    });

    it('should delete a task', async () => {
        // Create first
        const createRes = await app.request('/', {
            method: 'POST',
            body: JSON.stringify({ title: 'Test Task' }),
            headers: { 'Content-Type': 'application/json' }
        });
        const created = await createRes.json();

        // Delete
        const res = await app.request(`/${created.id}`, {
            method: 'DELETE'
        });
        expect(res.status).toBe(204);

        // Verify deleted
        const getRes = await app.request(`/${created.id}`);
        expect(getRes.status).toBe(404);
    });
});
