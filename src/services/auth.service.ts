// libs
import { bcrypt, jwt, sendEmail, speakeasy } from '../libs';
import { Response, Request } from 'express';
// models
import { IUserDocument } from '../models/user.model';
// repositories
import { authRepo } from '../repositories';
// dto
import { UserResponseDTO } from '../dto/user';
// others
import CONSTANTS from '../constants';
import { formatSI, setCookie } from '../utils';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../core/error.response';

const { SUBJECT_EMAIL, TEMPLATE_EMAIL, EXPIRE_TOKEN } = CONSTANTS;

class AuthService {
  static login = async ({ email, password }, res) => {
    const infoUser: IUserDocument = await authRepo.findUserRepo(email);

    const { _id: id, password: passWorkHash, verifiedEmail } = infoUser;
    const passwordMatch = bcrypt.isValidPassword(password, passWorkHash);

    if (!infoUser || !passwordMatch) throw new BadRequestError('Invalid email or password');
    if (!verifiedEmail) throw new ForbiddenError('Account is not verify');

    await authRepo.updateLastLoginRepo(id as string);

    const { accessToken, refreshToken } = jwt.generatePairToken({ id });
    const userInfo = new UserResponseDTO(infoUser);

    setCookie({ res, name: 'accessToken', value: accessToken, maxAge: EXPIRE_TOKEN.NUMBER_ACCESS_TOKEN });
    setCookie({ res, name: 'refreshToken', value: refreshToken, maxAge: EXPIRE_TOKEN.NUMBER_REFRESH_TOKEN });
    setCookie({ res, name: 'userInfo', value: userInfo, maxAge: EXPIRE_TOKEN.NUMBER_REFRESH_TOKEN });

    return { message: 'login successfully' };
  };

  static signup = async ({ fullName, email, phone, password }) => {
    const userExists = (await authRepo.findUserRepo(email)) || (await authRepo.findUserRepo(phone));
    if (userExists) throw new BadRequestError('Email or phone already exists');

    const hashPassWord = bcrypt.hashPassword(password);
    const { otp: otpCode, timeExpire } = speakeasy.getOTP();

    await authRepo.registerAccountRepo({
      fullName,
      email,
      phone,
      password: hashPassWord,
      otpCode,
      otpExpireAt: new Date(Date.now() + timeExpire * 1000),
    });

    sendEmail({
      email,
      subject: SUBJECT_EMAIL,
      message: formatSI(TEMPLATE_EMAIL, { fullName, otpCode }),
    });

    return { message: 'Sign up successfully. Please check your email to verify' };
  };

  static verifySignup = async ({ email, otpCode }) => {
    const infoUser: IUserDocument = await authRepo.findUserRepo(email);
    if (!infoUser) throw new BadRequestError('Email not found');

    const { _id: id, otpExpireAt, verifiedEmail } = infoUser;

    if (verifiedEmail) throw new BadRequestError('Account already verified');
    if (new Date().getTime() > otpExpireAt.getTime()) throw new BadRequestError('OTP expired. Please resend OTP');

    const verifiedOTP = speakeasy.verifiedOTP(otpCode);

    if (!verifiedOTP) throw new BadRequestError('OTP not match');

    await authRepo.verifySignup(id);

    return { message: 'Verify successfully' };
  };

  static reSendOTPSignup = async ({ email }) => {
    const infoUser: IUserDocument = await authRepo.findUserRepo(email);

    if (!infoUser) throw new BadRequestError('Email not found');

    const { fullName, verifiedEmail } = infoUser;

    if (verifiedEmail) throw new BadRequestError('Account already verified');

    const { otp: otpCode, timeExpire } = speakeasy.getOTP();

    await authRepo.updateOTP({
      email,
      otpCode,
      otpExpireAt: new Date(Date.now() + timeExpire * 1000),
    });

    await sendEmail({
      email,
      subject: SUBJECT_EMAIL,
      message: formatSI(TEMPLATE_EMAIL, { fullName, otpCode }),
    });

    return { message: 'Re-send OTP successfully' };
  };

  static logOut = async (res: Response) => {
    setCookie({ res, name: 'accessToken', value: '', maxAge: 0 });
    setCookie({ res, name: 'refreshToken', value: '', maxAge: 0 });
    setCookie({ res, name: 'userInfo', value: '', maxAge: 0 });

    return { message: 'Log out successfully' };
  };

  static refreshAccessToken = async (res: Response, req: Request) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new UnauthorizedError('Refresh token is not found');

    const payload = jwt.decodeRefreshToken(refreshToken);

    if (!payload || !payload.id) throw new UnauthorizedError('Invalid refresh token');

    const accessToken = jwt.generateAccessToken({
      id: payload.id,
    });

    setCookie({ res, name: 'accessToken', value: accessToken, maxAge: EXPIRE_TOKEN.NUMBER_ACCESS_TOKEN });

    return { message: 'Refresh token successfully' };
  };
}

export default AuthService;
