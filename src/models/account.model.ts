import mongoose, { Document } from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

interface IAccount extends Document {
    userName: string;
    email: string;
    passWord: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
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

const Account = mongoose.model<IAccount>('Account', AccountSchema);

export default Account;
