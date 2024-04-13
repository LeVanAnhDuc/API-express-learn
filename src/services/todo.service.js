import Todo from '../models/todo.model.js';

export const getTodosService = async (pageNo, pageSize) => {
    try {
        const skipTodo = (pageNo - 1) * pageSize;

        const data = await Todo.find().skip(skipTodo).limit(pageSize);

        const totalItems = await Todo.countDocuments();

        const totalPages = Math.ceil(totalItems / pageSize);

        const perPage = await Todo.countDocuments().skip(skipTodo).limit(pageSize);

        return {
            status: 200,
            message: 'Get list todo successfully',
            data: { data, currentPage: parseInt(pageNo), perPage, totalItems, totalPages },
        };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};

export const getTodoByIDService = async (id) => {
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

export const addTodoService = async (name, description) => {
    try {
        const newTodo = new Todo({ name, description });
        await newTodo.save();

        return { status: 201, message: 'add todo successfully', data: newTodo };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};

export const updateTodoService = async (updatedTodoData, id) => {
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

export const deleteTodoService = async (id) => {
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
