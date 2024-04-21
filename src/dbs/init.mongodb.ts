import mongoose from 'mongoose';
import config from '../config';
import { MongoErrorResponse } from '../core/error.response';

const statusConnecMongo = {
    OPEN: 'open',
    CONNECT: 'connected',
    DISCONNECT: 'disconnected',
    RECONNECT: 'reconnected',
    ERROR: 'error',
    CLOSE: 'close',
};

const MONGO_CONNECT_TIMEOUT = 10000;
const MONGO_CONNECT_MESSAGE = {
    code: -99,
    message: {
        vn: 'redis bị lỗi',
        en: 'service connect mongo error',
    },
};

// Singleton pattern
class MongoDatabase {
    private static instance: MongoDatabase | null = null;
    private connectionTimeout;

    constructor() {
        this.connectionTimeout = null;
    }

    public static getInstance(): MongoDatabase {
        if (this.instance === null) {
            this.instance = new MongoDatabase();
        }
        return this.instance;
    }

    public connect = async () => {
        if (config.DB_URL && config.DB_NAME) {
            this.handleEventConnect();
            await mongoose.connect(config.DB_URL, {
                dbName: config.DB_NAME,
            });
        }
    };

    private handleEventConnect = () => {
        mongoose.connection.on(statusConnecMongo.CONNECT, () => {
            console.log('connected mongo: connected');
            clearTimeout(this.connectionTimeout);
        });
        mongoose.connection.on(statusConnecMongo.OPEN, () => {
            console.log('connected mongo: open');
            clearTimeout(this.connectionTimeout);
        });
        mongoose.connection.on(statusConnecMongo.DISCONNECT, () => {
            console.log('connected mongo: disconnect');
            this.handleTimeoutError();
        });
        mongoose.connection.on(statusConnecMongo.RECONNECT, () => {
            console.log('connected mongo: reconnecting');
            clearTimeout(this.connectionTimeout);
        });
        mongoose.connection.on(statusConnecMongo.ERROR, (error) => {
            console.log(`connected mongo: ${error}`);
            this.handleTimeoutError();
        });
        mongoose.connection.on(statusConnecMongo.CLOSE, () => {
            console.log('connected mongo: close');
            clearTimeout(this.connectionTimeout);
        });
    };

    private handleTimeoutError = () => {
        this.connectionTimeout = setTimeout(() => {
            throw new MongoErrorResponse(MONGO_CONNECT_MESSAGE.message.en, MONGO_CONNECT_MESSAGE.code);
        }, MONGO_CONNECT_TIMEOUT);
    };
}

const instanceMongoDatabase = MongoDatabase.getInstance();
export default instanceMongoDatabase;
