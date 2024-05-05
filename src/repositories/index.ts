import TodoRepo from './todo.repo';
import AuthRepo from './auth.repo';

const todoRepo = new TodoRepo();
const authRepo = new AuthRepo();

export { todoRepo, authRepo };
