var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    currentDate: {
        type: String,
        default: getMonday(new Date()).toString().substring(0,15)
    },
    settings: {
        background: Number,
        font: String,
    }
})

function getMonday(d) {
    var d = new Date(d);
    var day = d.getDay()
    var mon = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is d
    return new Date(d.setDate(mon));
}

module.exports = mongoose.model('User', userSchema)