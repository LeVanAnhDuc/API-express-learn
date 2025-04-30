// libs
import speakeasy from 'speakeasy';
// others
import config from '../config';

const secret = speakeasy.generateSecret({ length: 20, name: config.DB_NAME });

const TIME_EXPIRE_OTP = 120;
const OTP_LENGTH = 6;
const SECRET_TOKEN = secret.base32;
const ENCODING = 'base32';

export const getOTP = () => {
  const otp = speakeasy.totp({
    secret: SECRET_TOKEN,
    encoding: ENCODING,
    step: TIME_EXPIRE_OTP,
    digits: OTP_LENGTH,
  });

  return {
    otp,
    timeExpire: TIME_EXPIRE_OTP,
  };
};

export const verifiedOTP = (token: string) =>
  speakeasy.totp.verify({
    secret: SECRET_TOKEN,
    encoding: ENCODING,
    step: TIME_EXPIRE_OTP,
    digits: OTP_LENGTH,
    token,
  });
