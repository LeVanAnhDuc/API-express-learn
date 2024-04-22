import express from 'express';
import {
    registerAccountController,
    loginAccountController,
    refreshTokenController,
} from '../controllers/auth.controller';
import { checkUniqueValues, validateFieldsRequestBody } from '../middlewares/validate.middleware';
import Account from '../models/account.model';
import { CreateAccountDTO, LoginAccountDTO } from '../dto/auth.dto';
import { asyncHandler, asyncMiddlewareHandler } from '../helper';

const router = express.Router();

router.post(
    '/signup',
    asyncMiddlewareHandler(validateFieldsRequestBody(CreateAccountDTO)),
    asyncMiddlewareHandler(checkUniqueValues(['userName', 'email'], Account)),
    asyncHandler(registerAccountController),
);

router.post(
    '/login',
    asyncMiddlewareHandler(validateFieldsRequestBody(LoginAccountDTO)),
    asyncHandler(loginAccountController),
);

router.post('/refresh-token', asyncHandler(refreshTokenController));

export default router;
