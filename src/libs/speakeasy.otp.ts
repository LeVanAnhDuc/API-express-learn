import speakeasy from 'speakeasy';
import config from '../config';

const secret = speakeasy.generateSecret({ length: 20, name: config.DB_NAME });

export const getOTP = () =>
    speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
        step: 120, // OTP verify in 120s
        digits: 6, // Create OTP 6 character numbers
    });

export const verifiedOTP = (token: string) =>
    speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        step: 120,
        digits: 6,
        token,
    });
