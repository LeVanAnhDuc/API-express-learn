import { Request } from 'express';
import { CreateAccountDTO, LoginAccountDTO } from '../dto/auth.dto';
import { bcrypt, jwt } from '../libs';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../core/error.response';
import { authRepo } from '../repositories';

class AuthService {
    static registerAccount = async (body: CreateAccountDTO) => {
        const { userName, email, phone, passWord } = body;

        const hashPassWord = await bcrypt.hashPassword(passWord);

        const newAccount = await authRepo.registerAccountRepo({
            userName,
            email,
            phone,
            passWord: hashPassWord,
        });

        return { message: 'register successfully', data: newAccount };
    };

    static loginAccount = async (body: LoginAccountDTO) => {
        const { email, passWord } = body;

        const infoUser = await authRepo.findUserRepo({ email });

        if (!infoUser) {
            throw new BadRequestError('Email or password is wrong');
        }

        const passwordMatch = await bcrypt.isValidPassword(passWord, infoUser.passWord);

        if (!passwordMatch) {
            throw new BadRequestError('Email or password is wrong');
        }

        const { accessToken, refreshToken } = jwt.generatePairToken({
            id: infoUser._id,
        });

        await authRepo.saveTokenRepo({
            infoUser,
            accessToken,
            refreshToken,
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
    };

    static refreshToken = async (req: Request) => {
        if (!req.headers?.authorization) {
            throw new NotFoundError('token is not found');
        }

        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        const refreshToken = type === 'Bearer' ? token : undefined;

        if (!refreshToken) {
            throw new NotFoundError('refreshToken is not found');
        }

        const payload = await jwt.decodeRefreshToken(refreshToken);

        if (!payload) {
            throw new UnauthorizedError('Refresh Token is expire. Back login to get token');
        }

        const accessToken = await jwt.generateAccessToken({
            id: payload.id,
        });

        return { message: 'get access token successfully', data: { accessToken, refreshToken } };
    };
}

export default AuthService;
