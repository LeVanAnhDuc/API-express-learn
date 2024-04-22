import { plainToClass } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';

import {
    getTodosService,
    getTodoByIDService,
    addTodoService,
    updateTodoService,
    deleteTodoService,
} from '../services/todo.service';
import { GetTodosQueryParamsDTO } from '../dto/todo.dto';
import { CreatedResponse, OKResponse } from '../core/success.response';

export const getTodosController = async (req: Request, res: Response, next: NextFunction) => {
    const query = plainToClass(GetTodosQueryParamsDTO, req.query);

    return new OKResponse(await getTodosService(query)).send(res);
};

export const getTodoByIDController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    return new OKResponse(await getTodoByIDService(id)).send(res);
};

export const addTodoController = async (req: Request, res: Response, next: NextFunction) => {
    return new CreatedResponse(await addTodoService(req.body)).send(res);
};

export const updateTodoController = async (req: Request, res: Response, next: NextFunction) => {
    const updatedTodoData = req.body;
    const { id } = req.params;

    return new OKResponse(await updateTodoService(updatedTodoData, id)).send(res);
};

export const deleteTodoController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    return new OKResponse(await deleteTodoService(id)).send(res);
};
