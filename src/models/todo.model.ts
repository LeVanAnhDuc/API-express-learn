import mongoose, { Document } from 'mongoose';
import User, { IUser } from './user.model';

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
    assigneeTo: IUser['_id'];
    reporter: IUser['_id'];
}

const TodoSchema = new Schema<ITodo>(
    {
        name: { type: String, trim: true },
        description: { type: String, trim: true },
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        projectName: { type: String, trim: true },
        status: { type: String, trim: true },
        summary: { type: String, trim: true },
        assigneeTo: { type: Schema.Types.ObjectId, ref: 'User' },
        reporter: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        collection: 'todos',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
