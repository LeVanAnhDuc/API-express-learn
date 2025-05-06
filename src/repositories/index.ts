import TodoRepo from './todo.repo';
import AuthRepo from './auth.repo';
import PasswordResetTokenRepo from './passwordResetToken.repo';

const todoRepo = new TodoRepo();
const authRepo = new AuthRepo();
const passwordResetTokenRepo = new PasswordResetTokenRepo();

export { todoRepo, authRepo, passwordResetTokenRepo };
