import express from 'express';
import AuthController from '../controllers/auth.controller';
import { checkUniqueValues, validateFieldsRequestBody } from '../middlewares/validate.middleware';
import User from '../models/user.model';
import { CreateAccountDTO, LoginAccountDTO, ReSendOTPAccountDTO, VerifyAccountDTO } from '../dto/auth.dto';
import { asyncHandler, asyncMiddlewareHandler } from '../helper';

const router = express.Router();

router.post(
    '/signup',
    asyncMiddlewareHandler(validateFieldsRequestBody(CreateAccountDTO)),
    asyncMiddlewareHandler(checkUniqueValues(['userName', 'email', 'phone'], User)),
    asyncHandler(AuthController.registerAccount),
);

router.post(
    '/verify-signup',
    asyncMiddlewareHandler(validateFieldsRequestBody(VerifyAccountDTO)),
    asyncHandler(AuthController.verifyRegisterAccount),
);

router.post(
    '/resend-otp',
    asyncMiddlewareHandler(validateFieldsRequestBody(ReSendOTPAccountDTO)),
    asyncHandler(AuthController.reSendOTPRegister),
);

router.post(
    '/login',
    asyncMiddlewareHandler(validateFieldsRequestBody(LoginAccountDTO)),
    asyncHandler(AuthController.loginAccount),
);

router.post('/refresh-token', asyncHandler(AuthController.refreshAccessToken));

export default router;
