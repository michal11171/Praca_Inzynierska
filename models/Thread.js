const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
});

module.exports = Thread = mongoose.model('thread', ThreadSchema);
