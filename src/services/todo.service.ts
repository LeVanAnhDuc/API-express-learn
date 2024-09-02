import { CreateTodoDTO, GetTodosQueryParamsDTO, UpdateTodoDTO } from '../dto/todo.dto';
import { BadRequestError, NotFoundError } from '../core/error.response';
import { todoRepo } from '../repositories';

class TodoService {
    static getTodosService = async (query: GetTodosQueryParamsDTO) => {
        const { pageSize, pageNo, status, projectName, searchKey, isActive } = query;

        const skipTodo = (pageNo - 1) * pageSize;

        const filter: Record<string, any> = {};

        if (projectName) {
            filter.projectName = projectName;
        }

        if (status) {
            filter.status = status;
        }

        if (isActive) {
            filter.isActive = isActive;
        }

        if (searchKey) {
            filter.name = { $regex: searchKey, $options: 'i' };
        }

        const [data, totalItems] = await Promise.all([
            todoRepo.getTodosRepo({
                filter,
                skip: skipTodo,
                limit: pageSize,
                saveCache: false,
            }),
            todoRepo.getCountTodosRepo(),
        ]);

        const totalPages = Math.ceil(totalItems / pageSize);

        const perPage = data.length;

        return {
            message: 'Get list todo successfully',
            data: { data, currentPage: pageNo, perPage, totalItems, totalPages },
        };
    };

    static getTodoByIDService = async (id: string) => {
        const data = await todoRepo.getTodoByIDRepo(id, false);

        if (!data) {
            throw new NotFoundError('Todo not found');
        }

        return { message: 'Get one todo successfully', data: data };
    };

    static addTodoService = async (body: CreateTodoDTO) => {
        const { name, description } = body;
        const newTodo = await todoRepo.addTodoRepo({ name, description });

        return { message: 'add todo successfully', data: newTodo };
    };

    static updateTodoService = async (updatedTodoData: UpdateTodoDTO, id: string) => {
        const date = new Date();
        const objectUpdate = { ...updatedTodoData, updatedAt: date };

        const updatedTodo = await todoRepo.updateTodoRepo(id, objectUpdate);

        if (!updatedTodo) {
            throw new NotFoundError('Todo is not found');
        }

        return { message: 'update todo successfully', data: updatedTodo };
    };

    static deleteTodoService = async (id: string) => {
        const deletedTodo = await todoRepo.deleteTodoRepo(id);

        if (!deletedTodo) {
            throw new BadRequestError('Todo is not found');
        }

        return { message: 'Todo deleted successfully' };
    };
}

export default TodoService;
