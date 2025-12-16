import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import tasksRouter from './modules/tasks/tasks-routes.js';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/tasks', tasksRouter);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
