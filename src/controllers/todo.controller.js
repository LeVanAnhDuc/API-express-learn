const Todo = require('../models/todo.model');

const getTodos = async (req, res, next) => {
    const { pageNo = 1, pageSize = 10 } = req.query;

    try {
        const skipTodo = (pageNo - 1) * pageSize;

        const data = await Todo.find().skip(skipTodo).limit(pageSize);

        const totalItems = await Todo.countDocuments();

        const totalPages = Math.ceil(totalItems / pageSize);

        const perPage = await Todo.countDocuments().skip(skipTodo).limit(pageSize);

        return res.json({
            message: 'Get list todo successfully',
            data: { data, currentPage: parseInt(pageNo), perPage, totalItems, totalPages },
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getTodoByID = async (req, res, next) => {
    const { id } = req.params;

    try {
        const data = await Todo.findOne({ _id: id });
        if (!data) {
            return res.status(400).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ message: 'Get one todo successfully', data: data });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
};

const addTodo = async (req, res, next) => {
    const { name, description } = req.body;

    try {
        const newTodo = new Todo({ name, description });
        await newTodo.save();

        return res.status(201).json({ message: 'add todo successfully', data: newTodo });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTodo = async (req, res, next) => {
    const updatedTodoData = req.body;
    const { id } = req.params;
    const date = new Date();

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { ...updatedTodoData, updatedAt: date }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.json({ message: 'add todo successfully', data: updatedTodo });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteTodo = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.json({ message: 'Todo deleted successfully', data: deletedTodo });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getTodos,
    getTodoByID,
    addTodo,
    updateTodo,
    deleteTodo,
};
