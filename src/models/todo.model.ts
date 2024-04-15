import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
interface ITodo extends Document {
    name: string;
    description: string;
    isStatus: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
    {
        name: { type: String, trim: true },
        description: { type: String, trim: true },
        isStatus: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        collection: 'todos',
    },
);

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
