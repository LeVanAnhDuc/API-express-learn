const mongoose = require('mongoose');

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

module.exports = mongoose.model('Todo', TodoSchema);
