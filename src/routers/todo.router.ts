import express from 'express';
import {
    getTodosController,
    getTodoByIDController,
    addTodoController,
    updateTodoController,
    deleteTodoController,
} from '../controllers/todo.controller';
import {
    isIDObject,
    requiredBody,
    validateFieldsRequestBody,
    validateFieldsRequestQuery,
} from '../middlewares/validate.middleware';
import { authorMiddleware } from '../middlewares/auth.middleware';
import { CreateTodoDTO, GetTodosQueryParamsDTO, UpdateTodoDTO } from '../dto/todo.dto';
import { asyncHandler, asyncMiddlewareHandler } from '../helper';

const router = express.Router();

router.get(
    '/',
    asyncMiddlewareHandler(validateFieldsRequestQuery(GetTodosQueryParamsDTO)),
    asyncHandler(getTodosController),
);

router.get('/:id', asyncMiddlewareHandler(isIDObject), asyncHandler(getTodoByIDController));

router.post(
    '/',
    asyncMiddlewareHandler(authorMiddleware),
    asyncMiddlewareHandler(requiredBody),
    asyncMiddlewareHandler(validateFieldsRequestBody(CreateTodoDTO)),
    asyncHandler(addTodoController),
);

router.put(
    '/:id',
    asyncMiddlewareHandler(authorMiddleware),
    asyncMiddlewareHandler(isIDObject),
    asyncMiddlewareHandler(requiredBody),
    asyncMiddlewareHandler(validateFieldsRequestBody(UpdateTodoDTO)),
    asyncHandler(updateTodoController),
);

router.delete(
    '/:id',
    asyncMiddlewareHandler(authorMiddleware),
    asyncMiddlewareHandler(isIDObject),
    asyncHandler(deleteTodoController),
);

export default router;
