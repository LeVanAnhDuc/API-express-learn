import { Request } from 'express';
import Account from '../models/account.model';
import { generatePairToken, generateAccessToken, decodeRefreshToken } from '../utils/jwt.util';
import { CreateAccountDTO, LoginAccountDTO } from '../dto/auth.dto';
import { hashPassword, isValidPassword } from '../utils/hashing.util';
import redis from '../dbs/init.redis';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../core/error.response';

export const registerAccountService = async (body: CreateAccountDTO) => {
    const { userName, email, passWord } = body;

    const hashPassWord = await hashPassword(passWord);

    const newAccount = await new Account({ userName, email, passWord: hashPassWord });

    await newAccount.save();

    return { message: 'register successfully', data: newAccount };
};

export const loginAccountService = async (body: LoginAccountDTO) => {
    const { email, passWord } = body;

    const infoUser = await Account.findOne({
        email,
    });

    if (!infoUser) {
        throw new BadRequestError('Email or password is wrong');
    }

    const passwordMatch = await isValidPassword(passWord, infoUser.passWord);

    if (!passwordMatch) {
        throw new BadRequestError('Email or password is wrong');
    }

    const { accessToken, refreshToken } = generatePairToken({
        id: infoUser._id,
    });

    const redisClient = redis.getRedis();
    redisClient.hSet('accessToken', infoUser._id, accessToken);
    redisClient.hSet('refreshToken', infoUser._id, refreshToken);

    const expireTimeInSecondsAccToken = Math.floor(Math.random() * 3600) + 3600;
    const expireTimeInSecondsRefToken = Math.floor(Math.random() * 3600) + 3600;

    redisClient.expire('accessToken', expireTimeInSecondsAccToken);
    redisClient.expire('refreshToken', expireTimeInSecondsRefToken);

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
};

export const refreshTokenService = async (req: Request) => {
    if (!req.headers?.authorization) {
        throw new NotFoundError('token is not found');
    }

    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    const refreshToken = type === 'Bearer' ? token : undefined;

    if (!refreshToken) {
        throw new NotFoundError('refreshToken is not found');
    }

    const payload = await decodeRefreshToken(refreshToken);

    if (!payload) {
        throw new UnauthorizedError('Refresh Token is expire. Back login to get token');
    }

    const accessToken = await generateAccessToken({
        id: payload.id,
    });

    return { message: 'get access token successfully', data: { accessToken, refreshToken } };
};
