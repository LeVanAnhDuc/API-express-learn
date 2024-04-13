import {
    getTodosService,
    getTodoByIDService,
    addTodoService,
    updateTodoService,
    deleteTodoService,
} from '../services/todo.service.js';

export const getTodos = async (req, res, next) => {
    const { pageNo = 1, pageSize = 10 } = req.query;

    try {
        const response = await getTodosService(pageNo, pageSize);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTodoByID = async (req, res, next) => {
    const { id } = req.params;

    try {
        const response = await getTodoByIDService(id);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const addTodo = async (req, res, next) => {
    const { name, description } = req.body;

    try {
        const response = await addTodoService(name, description);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateTodo = async (req, res, next) => {
    const updatedTodoData = req.body;
    const { id } = req.params;

    try {
        const response = await updateTodoService(updatedTodoData, id);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteTodo = async (req, res, next) => {
    const { id } = req.params;

    try {
        const response = await deleteTodoService(id);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
