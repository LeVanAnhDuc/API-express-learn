import { plainToClass } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import TodoService from '../services/todo.service';
import { GetTodosQueryParamsDTO } from '../dto/todo.dto';
import { CreatedResponse, OKResponse } from '../core/success.response';

class TodoController {
    getTodosController = async (req: Request, res: Response, next: NextFunction) => {
        const query = plainToClass(GetTodosQueryParamsDTO, req.query, { excludeExtraneousValues: true });

        return new OKResponse(await TodoService.getTodosService(query)).send(res);
    };

    getTodoByIDController = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        return new OKResponse(await TodoService.getTodoByIDService(id)).send(res);
    };

    addTodoController = async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization.split(' ')[1];

        return new CreatedResponse(await TodoService.addTodoService(accessToken, req.body)).send(res);
    };

    updateTodoController = async (req: Request, res: Response, next: NextFunction) => {
        const updatedTodoData = req.body;
        const { id } = req.params;

        return new OKResponse(await TodoService.updateTodoService(updatedTodoData, id)).send(res);
    };

    deleteTodoController = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        return new OKResponse(await TodoService.deleteTodoService(id)).send(res);
    };
}

export default new TodoController();
