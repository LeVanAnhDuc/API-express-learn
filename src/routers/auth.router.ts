// libs
import express from 'express';
// controllers
import AuthController from '../controllers/auth.controller';
// schemas
import {
  forgotPasswordSchema,
  loginSchema,
  reSendOtpSchema,
  sendOtpForgotPassword,
  signupSchema,
  signupVerifySchema,
} from '../schema/auth.schema';
// middlewares
import { validateSchema } from '../middlewares/validate.middleware';
// others
import CONSTANTS from '../constants';
import { asyncHandler } from '../helper';

const { LOGIN, REFRESH_TOKEN, RESEND_OTP, SIGNUP, VERIFY_SIGNUP, LOGOUT, FORGOT_PASSWORD, SEND_OTP_FORGOT_PASSWORD } =
  CONSTANTS.END_POINTS;

const router = express.Router();

router.post(LOGIN, validateSchema({ body: loginSchema }), asyncHandler(AuthController.login));
router.post(SIGNUP, validateSchema({ body: signupSchema }), asyncHandler(AuthController.signup));
router.post(VERIFY_SIGNUP, validateSchema({ body: signupVerifySchema }), asyncHandler(AuthController.verifySignup));
router.post(RESEND_OTP, validateSchema({ body: reSendOtpSchema }), asyncHandler(AuthController.reSendOTPSignup));
router.post(LOGOUT, asyncHandler(AuthController.logOut));
router.post(REFRESH_TOKEN, asyncHandler(AuthController.refreshAccessToken));
router.post(
  SEND_OTP_FORGOT_PASSWORD,
  validateSchema({ body: sendOtpForgotPassword }),
  asyncHandler(AuthController.sendOtpForgotPassword),
);
// router.post(
//   FORGOT_PASSWORD,
//   validateSchema({ body: forgotPasswordSchema }),
//   asyncHandler(AuthController.forgotPassword),
// );

// Forgot Password
// Change Password,
// Revoke Token, 2FA

// Revoke Token: ô hiệu hóa một refreshToken hoặc accessToken cụ thể, thường dùng khi phát hiện hành vi đáng ngờ hoặc người dùng đăng xuất
// từ một thiết bị cụ thể.

export default router;
