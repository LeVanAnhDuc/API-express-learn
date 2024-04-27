import { CreateTodoDTO, GetTodosQueryParamsDTO, UpdateTodoDTO } from '../dto/todo.dto';
import { BadRequestError, NotFoundError } from '../core/error.response';
import { todoRepo } from '../repositories';

export const getTodosService = async (query: GetTodosQueryParamsDTO) => {
    const { pageSize, pageNo } = query;

    const skipTodo = (pageNo - 1) * pageSize;

    const [data, totalItems] = await Promise.all([
        todoRepo.getTodosRepo(...Object.values({ filter: {}, skip: skipTodo, limit: pageSize, saveCache: false })),
        todoRepo.getCountTodosRepo(),
    ]);

    const totalPages = Math.ceil(totalItems / pageSize);

    const perPage = data.length;

    return {
        message: 'Get list todo successfully',
        data: { data, currentPage: pageNo, perPage, totalItems, totalPages },
    };
};

export const getTodoByIDService = async (id: string) => {
    const data = await todoRepo.getTodoByIDRepo(id, false);

    if (!data) {
        throw new NotFoundError('Todo not found');
    }

    return { message: 'Get one todo successfully', data: data };
};

export const addTodoService = async (body: CreateTodoDTO) => {
    const { name, description } = body;
    const newTodo = await todoRepo.addTodoRepo({ name, description });

    return { message: 'add todo successfully', data: newTodo };
};

export const updateTodoService = async (updatedTodoData: UpdateTodoDTO, id: string) => {
    const date = new Date();
    const objectUpdate = { ...updatedTodoData, updatedAt: date };

    const updatedTodo = await todoRepo.updateTodoRepo(id, objectUpdate);

    if (!updatedTodo) {
        throw new NotFoundError('Todo is not found');
    }

    return { message: 'update todo successfully', data: updatedTodo };
};

export const deleteTodoService = async (id: string) => {
    const deletedTodo = await todoRepo.deleteTodoRepo(id);

    if (!deletedTodo) {
        throw new BadRequestError('Todo is not found');
    }

    return { message: 'Todo deleted successfully' };
};
