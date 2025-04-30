// libs
import express from 'express';
// controllers
import AuthController from '../controllers/auth.controller';
// schemas
import { loginSchema, signupSchema } from '../schema/auth.schema';
// middlewares
import { validateSchema } from '../middlewares/validate.middleware';
// others
import CONSTANTS from '../constants';
import { asyncHandler } from '../helper';

import User from '../models/user.model';

const { LOGIN, REFRESH_TOKEN, RESEND_OTP, SIGNUP, VERIFY_SIGNUP } = CONSTANTS.END_POINTS;

const router = express.Router();

router.post(LOGIN, validateSchema({ body: loginSchema }), asyncHandler(AuthController.login));
router.post(SIGNUP, validateSchema({ body: signupSchema }), asyncHandler(AuthController.signup));

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

// router.post('/refresh-token', asyncHandler(AuthController.refreshAccessToken));

export default router;
