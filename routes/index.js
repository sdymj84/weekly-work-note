var express = require('express');
var router = express.Router();
var User = require('../config/database')

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.user)
    var week = getWeek()
    var newWeek = [];
    for (day of week) {
        day = day.toString().split(" ")
        day = day.slice(0, 4)
        newWeek.push(day.toString().replace(/,/g, " "))
    }
    console.log(newWeek)
    res.render('index', { user: req.user, week: newWeek });
});

function getWeek() {
    now = new Date()
    var sunday = new Date(now.setDate(now.getDate() - now.getDay()))
    var result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
        result.push(new Date(sunday));
    }
    return result;
}


module.exports = router;
