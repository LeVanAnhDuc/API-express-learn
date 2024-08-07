// libs
import mongoose, { Document } from 'mongoose';
import validator from 'validator';
// types
import { TGender, TRole } from '../types';
// others
import { EGender, ERole } from '../constants';

const { Schema } = mongoose;

interface IUser extends Document {
    userName: string;
    fullName: string;
    email: string;
    phone: string;
    passWord: string;
    isActive: boolean;
    dateOfBirth: Date;
    gender: TGender;
    avatar: string;
    address: string;
    role: TRole;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        userName: { type: String, trim: true, unique: true, required: true },
        fullName: { type: String, default: null },
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
        phone: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            validate: {
                validator: (value: string) => validator.isMobilePhone(value),
                message: 'Invalid phone number',
            },
        },
        passWord: { type: String, trim: true, required: true },
        isActive: { type: Boolean, default: true },
        dateOfBirth: { type: Date, default: null },
        gender: { type: String, enum: Object.values(EGender), default: null },
        avatar: { type: String, default: null },
        address: { type: String, default: null },
        role: { type: String, enum: Object.values(ERole), default: ERole.USER },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        collection: 'users',
    },
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
