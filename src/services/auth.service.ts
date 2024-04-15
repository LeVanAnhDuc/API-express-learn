import { Request } from 'express';
import Account from '../models/account.model';
import { generatePairToken, generateAccessToken, decodeRefreshToken } from '../utils/jwt.util';
import { CreateAccountDTO, LoginAccountDTO } from '../dto/auth.dto';
import { hashPassword, isValidPassword } from '../utils/hashing.util';

export const registerAccountService = async (body: CreateAccountDTO) => {
    try {
        const { userName, email, passWord } = body;

        const hashPassWord = await hashPassword(passWord);

        const newAccount = await new Account({ userName, email, passWord: hashPassWord });

        await newAccount.save();

        return { status: 200, message: 'register  successfully', data: newAccount };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};

export const loginAccountService = async (body: LoginAccountDTO) => {
    try {
        const { email, passWord } = body;

        const infoUser = await Account.findOne({
            email,
        });

        if (infoUser) {
            const passwordMatch = await isValidPassword(passWord, infoUser.passWord);
            if (passwordMatch) {
                const { accessToken, refreshToken } = generatePairToken({
                    id: infoUser._id,
                });

                return {
                    status: 200,
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
                return { status: 400, error: 'Email or password is wrong' };
            }
        } else {
            return { status: 400, error: 'Email or password is wrong' };
        }
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};

export const refreshTokenService = async (req: Request) => {
    try {
        if (!req.headers?.authorization) {
            return {
                status: 404,
                message: 'token is not found',
            };
        }

        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        const refreshToken = type === 'Bearer' ? token : undefined;

        if (!refreshToken) {
            return {
                status: 404,
                message: 'refreshToken is not found',
            };
        }

        const payload = await decodeRefreshToken(refreshToken);

        if (!payload) {
            return {
                status: 401,
                message: 'Refresh Token is expire. Back login to get token',
            };
        }

        const accessToken = await generateAccessToken({
            id: payload.id,
        });

        return { status: 200, message: 'get access token successfully', data: { accessToken, refreshToken } };
    } catch (error) {
        return { status: 500, error: 'Internal server error' };
    }
};
