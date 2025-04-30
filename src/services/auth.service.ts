// libs
import { bcrypt, jwt, sendEmail, speakeasy } from '../libs';
// models
import { IUserDocument } from '../models/user.model';
// repositories
import { authRepo } from '../repositories';
// dto
import { UserResponseDTO } from '../dto/user';
// others
import CONSTANTS from '../constants';
import { formatSI } from '../utils';
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from '../core/error.response';

const { SUBJECT_EMAIL, TEMPLATE_EMAIL } = CONSTANTS;

class AuthService {
  static login = async ({ email, password }) => {
    const infoUser: IUserDocument = await authRepo.findUserRepo(email);

    const { _id: id, password: passWorkHash, verifiedEmail } = infoUser;
    const passwordMatch = bcrypt.isValidPassword(password, passWorkHash);

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
  //     otpExpireAt: new Date(Date.now() + 120 * 1000),
  //   });

  //   const { userName } = infoUser;

  //   await sendEmail({
  //     email,
  //     subject: subjectEmail,
  //     message: formatSI(templateEmail, { userName, otp }),
  //   });

  //   return { message: 'resend otp successfully' };
  // };

  // static refreshAccessToken = async (req: Request) => {
  //   if (!req.headers?.authorization) {
  //     throw new NotFoundError('token is not found');
  //   }

  //   const [type, token] = req.headers.authorization?.split(' ') ?? [];
  //   const refreshToken = type === 'Bearer' ? token : undefined;

  //   if (!refreshToken) {
  //     throw new NotFoundError('refreshToken is not found');
  //   }

  //   const payload = await jwt.decodeRefreshToken(refreshToken);

  //   if (!payload) {
  //     throw new UnauthorizedError('Refresh Token is expire. Back login to get token');
  //   }

  //   const accessToken = await jwt.generateAccessToken({
  //     id: payload.id,
  //   });

  //   return { message: 'get access token successfully', data: { accessToken, refreshToken } };
  // };
}

export default AuthService;
