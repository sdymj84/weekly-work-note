var mongoose = require('mongoose');

// var noteSchema = mongoose.Schema({
//     user: mongoose.Schema.Types.ObjectId,
//     date: String,
//     mon: String,
//     tue: String,
//     wed: String,
//     thu: String,
//     fri: String,
//     etc: String
// })

var noteSchema = mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    date: String,
    note: String,
})

module.exports = mongoose.model('Note', noteSchema)