// models
import { IUserDocument } from '../models/user.model';
// dto
import { UserResponseDTO } from '../dto/user';

import { Request } from 'express';
import { CreateAccountDTO, LoginAccountDTO, ReSendOTPAccountDTO, VerifyAccountDTO } from '../dto/auth.dto';
import { bcrypt, jwt, sendEmail, speakeasy } from '../libs';
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from '../core/error.response';
import { authRepo } from '../repositories';
import { formatSI } from '../utils/common';
import { subjectEmail, templateEmail } from '../constants/email';
import { IUser } from '../types/users';

class AuthService {
  // static registerAccount = async (body: CreateAccountDTO) => {
  //   const { userName, email, phone, passWord } = body;

  //   const hashPassWord = await bcrypt.hashPassword(passWord);
  //   const otp = await speakeasy.getOTP();

  //   const newAccount = await authRepo.registerAccountRepo({
  //     userName,
  //     email,
  //     phone,
  //     passWord: hashPassWord,
  //     otpCode: otp,
  //     otpExpire: new Date(Date.now() + 120 * 1000),
  //   });

  //   await sendEmail({
  //     email,
  //     subject: subjectEmail,
  //     message: formatSI(templateEmail, { userName, otp }),
  //   });

  //   return { message: 'register successfully', data: newAccount };
  // };

  // static verifyRegisterAccount = async (body: VerifyAccountDTO) => {
  //   const { email, otpCode } = body;
  //   const infoUser: IUser = await authRepo.findUserRepo({ email });

  //   if (!infoUser) {
  //     throw new BadRequestError('Email not found');
  //   }

  //   const { otpExpire } = infoUser;
  //   if (!otpExpire) {
  //     throw new BadRequestError('Account already verified');
  //   }

  //   if (new Date().getTime() > otpExpire.getTime()) {
  //     throw new BadRequestError('OTP expired. Please resend OTP');
  //   }

  //   const verifiedOTP = await speakeasy.verifiedOTP(otpCode);

  //   if (!verifiedOTP) {
  //     throw new BadRequestError('OTP not match');
  //   }

  //   await authRepo.verifySignup({ email });

  //   return { message: 'verify successfully', data: undefined };
  // };

  // static reSendOTPRegister = async (body: ReSendOTPAccountDTO) => {
  //   const { email } = body;
  //   const infoUser: IUser = await authRepo.findUserRepo({ email });

  //   if (!infoUser) {
  //     throw new BadRequestError('Email not found');
  //   }

  //   if (infoUser.verifiedEmail) {
  //     throw new BadRequestError('Account already verified');
  //   }

  //   const otp = await speakeasy.getOTP();

  //   await authRepo.updateOTP({
  //     email,
  //     otpCode: otp,
  //     otpExpire: new Date(Date.now() + 120 * 1000),
  //   });

  //   const { userName } = infoUser;

  //   await sendEmail({
  //     email,
  //     subject: subjectEmail,
  //     message: formatSI(templateEmail, { userName, otp }),
  //   });

  //   return { message: 'resend otp successfully' };
  // };

  static login = async ({ email, password }) => {
    const infoUser: IUserDocument = await authRepo.findUserRepo(email);

    const { _id: id, passWord: passWorHash, verifiedEmail } = infoUser;
    const passwordMatch = bcrypt.isValidPassword(password, passWorHash);

    if (!infoUser || !passwordMatch) throw new BadRequestError('Invalid email or password');
    if (!verifiedEmail) throw new ForbiddenError('Account is not verify');

    await authRepo.updateLastLoginRepo(id as string);

    const { accessToken, refreshToken } = jwt.generatePairToken({ id });
    const userInfo = new UserResponseDTO(infoUser);

    return {
      message: 'login successfully',
      data: {
        accessToken,
        refreshToken,
        userInfo,
      },
    };
  };

  //   static refreshAccessToken = async (req: Request) => {
  //     if (!req.headers?.authorization) {
  //       throw new NotFoundError('token is not found');
  //     }

  //     const [type, token] = req.headers.authorization?.split(' ') ?? [];
  //     const refreshToken = type === 'Bearer' ? token : undefined;

  //     if (!refreshToken) {
  //       throw new NotFoundError('refreshToken is not found');
  //     }

  //     const payload = await jwt.decodeRefreshToken(refreshToken);

  //     if (!payload) {
  //       throw new UnauthorizedError('Refresh Token is expire. Back login to get token');
  //     }

  //     const accessToken = await jwt.generateAccessToken({
  //       id: payload.id,
  //     });

  //     return { message: 'get access token successfully', data: { accessToken, refreshToken } };
  //   };
}

export default AuthService;
