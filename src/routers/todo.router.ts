import express from 'express';
import {
    getTodosController,
    getTodoByIDController,
    addTodoController,
    updateTodoController,
    deleteTodoController,
} from '../controllers/todo.controller';
import { isIDObject, validateFieldsRequestBody, validateFieldsRequestQuery } from '../middlewares/validate.middleware';
import { authorMiddleware } from '../middlewares/auth.middleware';
import { CreateTodoDTO, GetTodosQueryParamsDTO, UpdateTodoDTO } from '../dto/todo.dto';

const router = express.Router();

router.get('/', validateFieldsRequestQuery(GetTodosQueryParamsDTO), (req, res, next) => {
    getTodosController(req, res, next);
});

router.get('/:id', isIDObject, (req, res, next) => {
    getTodoByIDController(req, res, next);
});

router.post('/', authorMiddleware, validateFieldsRequestBody(CreateTodoDTO), (req, res, next) => {
    addTodoController(req, res, next);
});

router.put('/:id', authorMiddleware, isIDObject, validateFieldsRequestBody(UpdateTodoDTO), (req, res, next) => {
    updateTodoController(req, res, next);
});

router.delete('/:id', isIDObject, (req, res, next) => {
    deleteTodoController(req, res, next);
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

export default router;
