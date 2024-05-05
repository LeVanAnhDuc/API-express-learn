import Account from '../models/account.model';
import Repository from './base.repo';

class AuthRepo extends Repository {
    constructor() {
        super(Account, 'Account');
    }
    registerAccountRepo = async ({ userName, email, passWord }) => {
        return await this.create({ userName, email, passWord });
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
