// libs
import { Types } from 'mongoose';

export interface IUserResetPasswordToken {
  userId: Types.ObjectId;
  email: string;
  resetToken: string;
  resetTokenExpireAt: Date;
  otpCode: string;
  otpExpireAt: Date;
  createdAt: Date;
  usedAt: Date;
  used: boolean;
}
