var express = require('express');
var router = express.Router();
var User = require('../models/users')
var Note = require('../models/notes')
var mongoose = require('mongoose')

/* GET home page. */
router.get('/', function (req, res, next) {
    var week = getWeek()
    var newWeek = [];
    for (day of week) {
        day = day.toString().split(" ")
        day = day.slice(0, 4)
        newWeek.push(day.toString().replace(/,/g, " "))
    }
    res.render('index', { user: req.user, week: newWeek });
});

router.post('/save', (req, res) => {
    var id = mongoose.Types.ObjectId(req.user.id)
    var date = getMonday().toString().substring(0,15)
    console.log(date)
    Note.updateOne({
        user: id,
        date: date
    }, {
            $set: {
                mon: req.body.mon,
                tue: req.body.tue,
                wed: req.body.wed,
                thu: req.body.thu,
                fri: req.body.fri,
                wkn: req.body.wkn
            }
        },
        { upsert: true }, (err) => {
            if (err) console.log(err)
            else res.redirect('/')
        })

})

function getWeek() {
    now = new Date()
    var sunday = new Date(now.setDate(now.getDate() - now.getDay()))
    var result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
        result.push(new Date(sunday));
    }
    return result;
}

function getMonday() {
    d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}


module.exports = router;
