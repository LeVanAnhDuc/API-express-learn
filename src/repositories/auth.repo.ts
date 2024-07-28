import User from '../models/user.model';
import Repository from './base.repo';

class AuthRepo extends Repository {
    constructor() {
        super(User, 'User');
    }
    registerAccountRepo = async ({ userName, email, phone, passWord }) => {
        return await this.create({ userName, email, phone, passWord });
    };

    findUserRepo = async ({ email }) => {
        return await this.findOne({
            email,
        });
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
