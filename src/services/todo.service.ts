import Todo from '../models/todo.model';
import { CreateTodoDTO, GetTodosQueryParamsDTO, UpdateTodoDTO } from '../dto/todo.dto';

export const getTodosService = async (query: GetTodosQueryParamsDTO) => {
    try {
        const { pageSize, pageNo } = query;

        const skipTodo = (pageNo - 1) * pageSize;

        const data = await Todo.find().skip(skipTodo).limit(pageSize);

        const totalItems = await Todo.countDocuments();

        const totalPages = Math.ceil(totalItems / pageSize);

        const perPage = await Todo.countDocuments().skip(skipTodo).limit(pageSize);

        return {
            status: 200,
            message: 'Get list todo successfully',
            data: { data, currentPage: pageNo, perPage, totalItems, totalPages },
        };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};

export const getTodoByIDService = async (id: string) => {
    try {
        const data = await Todo.findOne({ _id: id });

        if (!data) {
            return { status: 404, message: 'Todo not found' };
        }

        return { status: 200, message: 'Get one todo successfully', data: data };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};

export const addTodoService = async (body: CreateTodoDTO) => {
    try {
        const { name, description } = body;
        const newTodo = new Todo({ name, description });
        await newTodo.save();

        return { status: 201, message: 'add todo successfully', data: newTodo };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};

export const updateTodoService = async (updatedTodoData: UpdateTodoDTO, id: string) => {
    try {
        const date = new Date();

        const updatedTodo = await Todo.findByIdAndUpdate(id, { ...updatedTodoData, updatedAt: date }, { new: true });

        if (!updatedTodo) {
            return { status: 404, message: 'Todo is not found' };
        }

        return { status: 200, message: 'add todo successfully', data: updatedTodo };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};

export const deleteTodoService = async (id: string) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return { status: 404, message: 'Todo is not found' };
        }

        return { status: 200, message: 'Todo deleted successfully', data: deletedTodo };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};
