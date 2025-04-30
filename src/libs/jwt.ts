// libs
import jwt from 'jsonwebtoken';
// others
import config from '../config';

const EXPIRE_IN = {
  ACCESS_TOKEN: '8h',
  REFRESH_TOKEN: '7day',
};
const ALGORITHM_TOKEN = 'HS256';

export const generatePairToken = (payload) => {
  const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    algorithm: ALGORITHM_TOKEN,
    expiresIn: EXPIRE_IN.ACCESS_TOKEN,
  });

  const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    algorithm: ALGORITHM_TOKEN,
    expiresIn: EXPIRE_IN.REFRESH_TOKEN,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    algorithm: ALGORITHM_TOKEN,
    expiresIn: EXPIRE_IN.ACCESS_TOKEN,
  });

  return accessToken;
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
