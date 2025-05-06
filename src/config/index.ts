import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  APP_PORT: process.env.APP_PORT || '3000',

  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,

  REDIS_URL: process.env.REDIS_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_RESET_PASS_SECRET: process.env.JWT_RESET_PASS_SECRET,

  USERNAME_EMAIL: process.env.USERNAME_EMAIL,
  PASSWORD_EMAIL: process.env.PASSWORD_EMAIL,
};
export default config;
