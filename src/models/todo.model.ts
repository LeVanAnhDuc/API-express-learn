import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
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

export default mongoose.model('Todo', TodoSchema);
