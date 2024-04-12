import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const generatePairToken = (payload) => {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
        algorithm: 'HS256',
        expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
        algorithm: 'HS256',
        expiresIn: '7d',
    });
    return {
        accessToken,
        refreshToken,
    };
};

export const decodeRefreshToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_REFRESH_SECRET, {
            algorithms: 'HS256',
        });
    } catch {
        return null;
    }
};

export const decodeAccessToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_ACCESS_SECRET, {
            algorithms: 'HS256',
        });
    } catch {
        return null;
    }
};
