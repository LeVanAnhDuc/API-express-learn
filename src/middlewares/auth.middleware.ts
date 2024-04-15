import { Request, Response, NextFunction } from 'express';
import { decodeAccessToken } from '../utils/jwt.util';

export const authorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers?.authorization) {
        return res.status(404).json({
            message: 'token is not found',
        });
    }

    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) {
        return res.status(404).json({
            message: 'accessToken is not found',
        });
    }

    if (!decodeAccessToken(accessToken)) {
        return res.status(401).json({
            message: 'the user is no Authorization',
        });
    }

    next();
};
