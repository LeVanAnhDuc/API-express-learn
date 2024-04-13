import bcrypt from 'bcrypt';

import Account from '../models/account.model.js';
import { generatePairToken } from '../utils/index.js';

export const loginAccountService = async (email, passWord) => {
    try {
        const infoUser = await Account.findOne({
            email,
        });

        if (infoUser) {
            const passwordMatch = await bcrypt.compare(passWord, infoUser.passWord);
            if (passwordMatch) {
                const { accessToken, refreshToken } = generatePairToken({
                    id: infoUser._id,
                });

                return {
                    message: 'login successfully',
                    data: {
                        accessToken,
                        refreshToken,
                        infoUser: {
                            userName: infoUser.userName,
                            email: infoUser.email,
                        },
                    },
                };
            } else {
                return { error: 'Email or password is wrong' };
            }
        } else {
            return { error: 'Email or password is wrong' };
        }
    } catch (error) {
        return { error: 'Internal server error ser' };
    }
};

export const registerAccountService = async (userName, email, passWord) => {
    try {
        const hashPassWord = await bcrypt.hashSync(passWord, 10);

        const newAccount = await new Account({ userName, email, passWord: hashPassWord });

        await newAccount.save();

        return { message: 'register  successfully', data: newAccount };
    } catch (error) {
        return { error: 'Internal server error ser' };
    }
};
