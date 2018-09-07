var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    settings: {
        background: Number,
    }
})

module.exports = mongoose.model('User', userSchema)