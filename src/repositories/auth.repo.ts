import User from '../models/user.model';
import Repository from './base.repo';

class AuthRepo extends Repository {
  constructor() {
    super(User, 'User');
  }

  findUserRepo = async (emailOrPhone: string) => {
    return await this.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
  };

  updateLastLoginRepo = async (id: string) => {
    return await this.updateMany(
      { _id: id },
      {
        lastLoginAt: new Date(),
      },
    );
  };

  registerAccountRepo = async ({ fullName, email, phone, password, otpCode, otpExpire }) => {
    return await this.create({ fullName, email, phone, password, otpCode, otpExpire });
  };

  findIDUserRepo = async (id: string) => {
    return await this.findById(id);
  };

  verifySignup = async ({ email }) => {
    return await this.updateMany(
      { email },
      {
        verifiedEmail: true,
        otpCode: null,
        otpExpire: null,
      },
    );
  };

  updateOTP = async ({ email, otpCode, otpExpire }) => {
    return await this.updateMany(
      { email },
      {
        otpCode,
        otpExpire,
      },
    );
  };

  saveTokenRepo = async ({ infoUser, accessToken, refreshToken }) => {
    this.SetHsetWithCache(
      {
        id: infoUser._id,
      },
      {
        accessToken,
        refreshToken,
      },
    );
  };
}

export default AuthRepo;
