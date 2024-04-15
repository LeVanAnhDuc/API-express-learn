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

export const getTodosController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = plainToClass(GetTodosQueryParamsDTO, req.query);
        const response = await getTodosService(query);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTodoByIDController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const response = await getTodoByIDService(id);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const addTodoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await addTodoService(req.body);
        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateTodoController = async (req: Request, res: Response, next: NextFunction) => {
    const updatedTodoData = req.body;
    const { id } = req.params;

    try {
        const response = await updateTodoService(updatedTodoData, id);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteTodoController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const response = await deleteTodoService(id);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
