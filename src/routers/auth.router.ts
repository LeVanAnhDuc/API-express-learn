import express from 'express';
import AuthController from '../controllers/auth.controller';
import { checkUniqueValues, validateFieldsRequestBody } from '../middlewares/validate.middleware';
import User from '../models/user.model';
import { CreateAccountDTO, LoginAccountDTO } from '../dto/auth.dto';
import { asyncHandler, asyncMiddlewareHandler } from '../helper';

const router = express.Router();

router.post(
    '/signup',
    asyncMiddlewareHandler(validateFieldsRequestBody(CreateAccountDTO)),
    asyncMiddlewareHandler(checkUniqueValues(['userName', 'email', 'phone'], User)),
    asyncHandler(AuthController.registerAccount),
);

router.post(
    '/login',
    asyncMiddlewareHandler(validateFieldsRequestBody(LoginAccountDTO)),
    asyncHandler(AuthController.loginAccount),
);

router.post('/refresh-token', asyncHandler(AuthController.refreshToken));

export default router;
