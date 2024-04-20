import { createClient } from 'redis';
import config from '../config';
import { RedisErrorResponse } from '../core/error.response';

const statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error',
};

let client: Record<string, any> = {};
let connectionTimeout = null;

const REDIS_CONNECT_TIMEOUT = 10000;
const REDIS_CONNECT_MESSAGE = {
    code: -99,
    message: {
        vn: 'redis bị lỗi',
        en: 'service connect redis error',
    },
};

const handleTimeoutError = () => {
    connectionTimeout = setTimeout(() => {
        throw new RedisErrorResponse(REDIS_CONNECT_MESSAGE.message.en, REDIS_CONNECT_MESSAGE.code);
    }, REDIS_CONNECT_TIMEOUT);
};

const handleEventConnect = (redisClient) => {
    redisClient.on(statusConnectRedis.CONNECT, () => {
        console.log('connected redis: connected');
        clearTimeout(connectionTimeout);
    });

    redisClient.on(statusConnectRedis.END, () => {
        console.log('connected redis: end');
        handleTimeoutError();
    });

    redisClient.on(statusConnectRedis.RECONNECT, () => {
        console.log('connected redis: reconnecting');
        clearTimeout(connectionTimeout);
    });

    redisClient.on(statusConnectRedis.ERROR, (error) => {
        console.log(`connected redis: ${error}`);
        handleTimeoutError();
    });
};

export const initRedis = async () => {
    const redisClient = createClient({ url: config.REDIS_URL });
    redisClient.connect();
    handleEventConnect(redisClient);
    client.redisClient = redisClient;
};

export const getRedis = () => client;

export const closeRedis = () => client.redisClient.disconnect();
