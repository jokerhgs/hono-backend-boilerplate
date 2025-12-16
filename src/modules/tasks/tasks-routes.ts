import { Hono } from 'hono';
import * as tasksController from './tasks-controller.js';

const tasksRouter = new Hono();

tasksRouter.get('/', tasksController.getTasks);
tasksRouter.get('/:id', tasksController.getTaskFn);
tasksRouter.post('/', tasksController.createTask);
tasksRouter.patch('/:id', tasksController.updateTask);
tasksRouter.delete('/:id', tasksController.deleteTask);

export default tasksRouter;
