const express = require('express');
const routerToDo = require('./todo.router');
const routerAuth = require('./auth.router');

const router = express.Router();

router.use('/auth', routerAuth);
router.use('/todos', routerToDo);

module.exports = router;
