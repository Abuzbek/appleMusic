const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    accountImg: {
        type: String,
        default: 'account.jpg',
    }
})

module.exports = mongoose.model('User', UserSchema);