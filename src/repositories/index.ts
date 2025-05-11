import TodoRepo from './todo.repo';
import AuthRepo from './auth.repo';
import UserResetPasswordTokenRepo from './passwordResetToken.repo';

const todoRepo = new TodoRepo();
const authRepo = new AuthRepo();
const userResetPasswordTokenRepo = new UserResetPasswordTokenRepo();

export { todoRepo, authRepo, userResetPasswordTokenRepo };
