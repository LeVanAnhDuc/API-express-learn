import express from 'express';
import { getTodos, getTodoByID, addTodo, updateTodo, deleteTodo } from '../controllers/todo.controller.js';
import { requiredFields, emptyObject, isIDObject } from '../middlewares/index.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    getTodos(req, res, next);
});

router.get('/:id', isIDObject, (req, res, next) => {
    getTodoByID(req, res, next);
});

router.post('/', requiredFields(['name', 'description']), (req, res, next) => {
    addTodo(req, res, next);
});

router.put('/:id', isIDObject, emptyObject, (req, res, next) => {
    updateTodo(req, res, next);
});

router.delete('/:id', isIDObject, (req, res, next) => {
    deleteTodo(req, res, next);
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

export default router;
