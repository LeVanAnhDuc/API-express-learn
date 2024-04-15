import express from 'express';
import routerToDo from './todo.router';
import routerAuth from './auth.router';

const router = express.Router();

router.use('/auth', routerAuth);
router.use('/todos', routerToDo);

export default router;
