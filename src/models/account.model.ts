import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        userName: { type: String, trim: true, unique: true, required: true },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: 'Invalid email address',
            },
        },
        passWord: { type: String, trim: true, required: true },
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        collection: 'accounts',
    },
);

export default mongoose.model('Account', AccountSchema);
