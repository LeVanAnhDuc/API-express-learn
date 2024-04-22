import { Request, Response, NextFunction } from 'express';
import { jwt } from '../libs';
import { BadRequestError, UnauthorizedError } from '../core/error.response';

export const authorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers?.authorization) {
        throw new BadRequestError('token is not found');
    }

    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) {
        throw new BadRequestError('accessToken is not found');
    }

    if (!jwt.decodeAccessToken(accessToken)) {
        throw new UnauthorizedError('the user is no Authorization');
    }

    return Promise.resolve();
};
