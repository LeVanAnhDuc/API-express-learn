import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    APP_PORT: process.env.APP_PORT || '3000',

    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};
export default config;
