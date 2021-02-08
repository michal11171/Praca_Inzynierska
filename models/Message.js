const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thread'
    },
    content: {
        type: String,
        required: true
    },
    dateSent: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);
