var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    settings: {
        background: Number,
        font: String,
    }
})

module.exports = mongoose.model('User', userSchema)