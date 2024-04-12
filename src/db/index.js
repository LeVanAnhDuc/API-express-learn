import mongoose from 'mongoose';
import config from '../config/index.js';

const dbConnect = async () => {
    try {
        await mongoose
            .connect(config.DB_URL, { dbName: config.DB_NAME })
            .then(() => console.log('Connection to mongodb created'));
    } catch (error) {
        console.error.bind('Connection error:', error);
    }
};

export default dbConnect;
