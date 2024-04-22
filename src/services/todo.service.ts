import Todo from '../models/todo.model';
import { CreateTodoDTO, GetTodosQueryParamsDTO, UpdateTodoDTO } from '../dto/todo.dto';
import { BadRequestError, NotFoundError } from '../core/error.response';

export const getTodosService = async (query: GetTodosQueryParamsDTO) => {
    const { pageSize, pageNo } = query;

    const skipTodo = (pageNo - 1) * pageSize;

    const data = await Todo.find().skip(skipTodo).limit(pageSize);

    const totalItems = await Todo.countDocuments();

    const totalPages = Math.ceil(totalItems / pageSize);

    const perPage = await Todo.countDocuments().skip(skipTodo).limit(pageSize);

    return {
        message: 'Get list todo successfully',
        data: { data, currentPage: pageNo, perPage, totalItems, totalPages },
    };
};

export const getTodoByIDService = async (id: string) => {
    const data = await Todo.findOne({ _id: id });

    if (!data) {
        throw new NotFoundError('Todo not found');
    }

    return { message: 'Get one todo successfully', data: data };
};

export const addTodoService = async (body: CreateTodoDTO) => {
    const { name, description } = body;
    const newTodo = new Todo({ name, description });
    await newTodo.save();

    return { message: 'add todo successfully', data: newTodo };
};

export const updateTodoService = async (updatedTodoData: UpdateTodoDTO, id: string) => {
    const date = new Date();

    const updatedTodo = await Todo.findByIdAndUpdate(id, { ...updatedTodoData, updatedAt: date }, { new: true });

    if (!updatedTodo) {
        throw new NotFoundError('Todo is not found');
    }

    return { message: 'update todo successfully', data: updatedTodo };
};

export const deleteTodoService = async (id: string) => {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
        throw new BadRequestError('Todo is not found');
    }

    return { message: 'Todo deleted successfully', data: deletedTodo };
};
