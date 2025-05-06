// models
import UserResetPasswordToken from '../models/passwordResetToken.model';
// repositories
import Repository from './base.repo';

class PasswordResetTokenRepo extends Repository {
  constructor() {
    super(UserResetPasswordToken, 'UserResetPasswordToken');
  }

  createPasswordResetToken = async ({ userId, email, otpCode, otpExpireAt, resetToken, resetTokenExpireAt }) => {
    return await this.create({
      userId,
      otpCode,
      otpExpireAt,
      used: false,
      email,
      resetToken,
      resetTokenExpireAt,
    });
  };
}

export default PasswordResetTokenRepo;
