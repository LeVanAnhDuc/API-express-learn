// libs
import jwt from 'jsonwebtoken';
// others
import config from '../config';
import CONSTANTS from '../constants';

const { EXPIRE_TOKEN } = CONSTANTS;

const ALGORITHM_TOKEN = 'HS256';

export const generatePairToken = (payload) => {
  const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    algorithm: ALGORITHM_TOKEN,
    expiresIn: EXPIRE_TOKEN.ACCESS_TOKEN,
  });

  const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    algorithm: ALGORITHM_TOKEN,
    expiresIn: EXPIRE_TOKEN.REFRESH_TOKEN,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    algorithm: ALGORITHM_TOKEN,
    expiresIn: EXPIRE_TOKEN.ACCESS_TOKEN,
  });

  return accessToken;
};

export const generateResetPasswordToken = (payload) => {
  const ResetPasswordToken = jwt.sign(payload, config.JWT_RESET_PASS_SECRET, {
    algorithm: ALGORITHM_TOKEN,
    expiresIn: EXPIRE_TOKEN.RESET_PASS_TOKEN,
  });

  return ResetPasswordToken;
};

export const decodeRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET, {
      algorithms: ALGORITHM_TOKEN,
    });
  } catch {
    return null;
  }
};

export const decodeAccessToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_ACCESS_SECRET, {
      algorithms: ALGORITHM_TOKEN,
    });
  } catch {
    return null;
  }
};

export const decodeResetPasswordToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_RESET_PASS_SECRET, {
      algorithms: ALGORITHM_TOKEN,
    });
  } catch {
    return null;
  }
};
