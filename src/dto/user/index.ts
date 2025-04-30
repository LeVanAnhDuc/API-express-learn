// models
import { IUserDocument } from '../../models/user.model';

class UserResponseDTO {
  public userName: string;
  public email: string;
  public fullName: string;
  public phone: string;
  public passWord: string;
  public isActive: boolean;
  public dateOfBirth: Date;
  public gender: string;
  public avatar: string;
  public address: string;
  public role: string;
  public createdAt: Date;
  public updatedAt: Date;
  public verifiedEmail: boolean;
  public otpCode: string;
  public otpExpire: Date;
  public lastLoginAt: Date;

  constructor(user: Partial<IUserDocument>) {
    this.userName = user.userName;
    this.email = user.email;
    this.fullName = user.fullName;
    this.phone = user.phone;
    this.isActive = user.isActive;
    this.dateOfBirth = user.dateOfBirth;
    this.gender = user.gender;
    this.avatar = user.avatar;
    this.address = user.address;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.lastLoginAt = user.lastLoginAt;
  }
}

export { UserResponseDTO };
