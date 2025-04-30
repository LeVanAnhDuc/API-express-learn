import express from 'express';
import AuthController from '../controllers/auth.controller';
import { checkUniqueValues, validateFieldsRequestBody, validateSchema } from '../middlewares/validate.middleware';
import { CreateAccountDTO, LoginAccountDTO, ReSendOTPAccountDTO, VerifyAccountDTO } from '../dto/auth.dto';
import { asyncHandler, asyncMiddlewareHandler } from '../helper';
import User from '../models/user.model';

// others
import CONSTANTS from '../constants';
import { loginSchema } from '../schema/auth.schema';

const { LOGIN, REFRESH_TOKEN, RESEND_OTP, SIGNUP, VERIFY_SIGNUP } = CONSTANTS.END_POINTS;

const router = express.Router();

// router.post(
//   '/signup',
//   asyncMiddlewareHandler(validateFieldsRequestBody(CreateAccountDTO)),
//   asyncMiddlewareHandler(checkUniqueValues(['userName', 'email', 'phone'], User)),
//   asyncHandler(AuthController.registerAccount),
// );

// router.post(
//   '/verify-signup',
//   asyncMiddlewareHandler(validateFieldsRequestBody(VerifyAccountDTO)),
//   asyncHandler(AuthController.verifyRegisterAccount),
// );

// router.post(
//   '/resend-otp',
//   asyncMiddlewareHandler(validateFieldsRequestBody(ReSendOTPAccountDTO)),
//   asyncHandler(AuthController.reSendOTPRegister),
// );

router.post(LOGIN, validateSchema({ body: loginSchema }), asyncHandler(AuthController.login));

// router.post('/refresh-token', asyncHandler(AuthController.refreshAccessToken));

export default router;
