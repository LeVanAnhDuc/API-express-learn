import express from 'express';
import {
    getTodosController,
    getTodoByIDController,
    addTodoController,
    updateTodoController,
    deleteTodoController,
} from '../controllers/todo.controller';
import { requiredFields, emptyObject, isIDObject } from '../middlewares/validate.middleware';
import { authorMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', (req, res, next) => {
    getTodosController(req, res, next);
});

router.get('/:id', isIDObject, (req, res, next) => {
    getTodoByIDController(req, res, next);
});

router.post('/', requiredFields(['name', 'description']), (req, res, next) => {
    addTodoController(req, res, next);
});

router.put('/:id', authorMiddleware, isIDObject, emptyObject, (req, res, next) => {
    updateTodoController(req, res, next);
});

router.delete('/:id', authorMiddleware, isIDObject, (req, res, next) => {
    deleteTodoController(req, res, next);
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

export default router;
