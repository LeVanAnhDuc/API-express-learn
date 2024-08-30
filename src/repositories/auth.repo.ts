import User from '../models/user.model';
import Repository from './base.repo';

class AuthRepo extends Repository {
    constructor() {
        super(User, 'User');
    }
    registerAccountRepo = async ({ userName, email, phone, passWord, otpCode, otpExpire }) => {
        return await this.create({ userName, email, phone, passWord, otpCode, otpExpire });
    };

    findUserRepo = async ({ email }) => {
        return await this.findOne({
            email,
        });
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

    refreshTokenRepo = async () => {};
}

export default AuthRepo;
