const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: String,
        required: true
    },
    ban: {
        type: String,
        required: true
    }
});

module.exports = User = moongose.model('user', UserSchema);