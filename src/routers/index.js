import express from 'express';
import routerToDo from './todo.router.js';
import routerAuth from './auth.router.js';

const router = express.Router();

router.use('/auth', routerAuth);
router.use('/todos', routerToDo);

export default router;
