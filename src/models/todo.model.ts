import mongoose, { Document } from 'mongoose';
import { IUser, IUserSpecificallySchema } from './user.model';
import { IUserSpecifically } from '../interface/user';

const Schema = mongoose.Schema;
interface ITodo extends Document {
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    projectName: string;
    status: string;
    summary: string;
    createBy: IUserSpecifically;
    assigneeTo?: IUserSpecifically;
    reporter?: IUserSpecifically;
    updatedBy?: IUserSpecifically;
}

const TodoSchema = new Schema<ITodo>(
    {
        name: { type: String, trim: true, required: true },
        description: { type: String, trim: true },
        isActive: { type: Boolean, default: true, required: true },
        createdAt: { type: Date, default: Date.now, required: true },
        updatedAt: { type: Date, default: Date.now, required: true },
        projectName: { type: String, trim: true, required: true },
        status: { type: String, trim: true, required: true },
        summary: { type: String, trim: true },
        assigneeTo: { type: IUserSpecificallySchema },
        reporter: { type: IUserSpecificallySchema },
        createBy: { type: IUserSpecificallySchema },
        updatedBy: { type: IUserSpecificallySchema },
    },
    {
        collection: 'todos',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
