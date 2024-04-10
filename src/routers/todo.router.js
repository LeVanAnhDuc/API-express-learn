const express = require('express');
const { getTodos, getTodoByID, addTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');
const { requiredFields, emptyObject, isIDObject } = require('../middlewares');
const router = express.Router();

router.get('/', (req, res, next) => {
    getTodos(req, res, next);
});

router.get('/:id', isIDObject, (req, res, next) => {
    getTodoByID(req, res, next);
});

router.post('/', requiredFields(['name', 'description']), (req, res, next) => {
    addTodo(req, res, next);
});

router.put('/:id', isIDObject, emptyObject, (req, res, next) => {
    updateTodo(req, res, next);
});

router.delete('/:id', isIDObject, (req, res, next) => {
    deleteTodo(req, res, next);
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

module.exports = router;
