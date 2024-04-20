import { createClient } from 'redis';
import config from '../config';

let client: Record<string, any> = {};

const statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error',
};

const handleEventConnect = (redisClient) => {
    redisClient.on(statusConnectRedis.CONNECT, () => {
        console.log('connected redis: connected');
    });

    redisClient.on(statusConnectRedis.END, () => {
        console.log('connected redis: end');
    });

    redisClient.on(statusConnectRedis.RECONNECT, () => {
        console.log('connected redis: reconnecting');
    });

    redisClient.on(statusConnectRedis.ERROR, (error) => {
        console.log(`connected redis: error ${error}`);
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
