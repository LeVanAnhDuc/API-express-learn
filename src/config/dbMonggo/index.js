import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose
            .connect(`mongodb://localhost:27017/Todo_App_Dev`)
            .then(() => console.log('Connected database succces !'));
    } catch (error) {
        console.error.bind('Connection error:', error);
    }
};

export default dbConnect;
