var express = require('express');
var router = express.Router();
var User = require('../models/users')
var Note = require('../models/notes')
var mongoose = require('mongoose')

router.get('/', function (req, res, next) {
    var week = getWeek()
    var newWeek = [];
    var date = getMonday().toString().substring(0,15)

    for (day of week) {
        day = day.toString().split(" ")
        day = day.slice(0, 4)
        newWeek.push(day.toString().replace(/,/g, " "))
    }
    if (req.user) {
        var id = mongoose.Types.ObjectId(req.user.id)
        User.findOne({_id:id}, (err,user)=>{
            if (err) console.log(err)
            else {
                var wallNum = user.settings.background || 1
                var wall = `wall-image${wallNum}`
                Note.findOne({user:id, date:date}, (err,notes)=>{
                    if (err) console.log(err)
                    else {
                        notes = notes || {}
                        res.render('index', { 
                            user: req.user,
                            week: newWeek,
                            notes,
                            wall
                        });      
                    }
                })
            }
        })
    } else {
        res.render('index', { 
            user: req.user,
            week: newWeek,
            notes: {}
        });      
    }
});

router.post('/save', (req, res) => {
    var id = mongoose.Types.ObjectId(req.user.id)
    var date = getMonday().toString().substring(0,15)
    Note.updateOne({
        user: id,
        date: date
    }, 
    {
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
    var d = new Date(now.setDate(now.getDate() - now.getDay()))
    var result = [new Date(d)];
    while (d.setDate(d.getDate() + 1) && d.getDay() !== 0) {
        result.push(new Date(d));
    }
    return result;
}

function getMonday() {
    d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is d
    return new Date(d.setDate(diff));
}


module.exports = router;
