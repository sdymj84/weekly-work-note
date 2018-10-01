var express = require('express');
var router = express.Router();
var User = require('../models/users')
var Note = require('../models/notes')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

router.get('/', function (req, res, next) {
    var week = getWeek(Date.now())
    var newWeek = [];

    // convert date array to string array > save to newWeek
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
                var font = user.settings.font || 'Roboto'
                var wall = `wall-image${wallNum}`
                var currentWeekMon = user.currentWeekMon

                week = getWeek(currentWeekMon)
                newWeek = [];

                // convert date to string > push to newWeek array
                // (week[]:array of week in date type)
                // (newWeek[]: array of week in string type)
                for (day of week) {
                    day = day.toString().split(" ")
                    day = day.slice(0, 4)
                    newWeek.push(day.toString().replace(/,/g, " "))
                }

                Note.find({user:id}, (err,myNotes)=>{
                    let exist = false
                    myNotes.some(eachNote=>{
                        if (eachNote.date === newWeek[1]) {
                            exist = true
                            return true
                        }
                    })
                    if (exist) {
                        Note.find({user:id}).then(myNotes=>{
                            return Promise.all(getArrayNotes(myNotes, newWeek))
                        }).then(arrayNotes=>{
                            res.render('index', {
                                user: req.user,
                                week: newWeek,
                                notes: arrayNotes, 
                                wall, font
                            })
                        })
                    } else {
                        saveNotes(user, id, [])
                        Note.find({user:id}).then(myNotes=>{
                            return Promise.all(getArrayNotes(myNotes, newWeek))
                        }).then(arrayNotes=>{
                            res.render('index', {
                                user: req.user,
                                week: newWeek,
                                notes: arrayNotes, 
                                wall, font
                            })
                        })
                    }
                })
            }
        })
    } else {
        res.render('index', { 
            week: newWeek,
            notes: {}
        });      
    }
});


router.post('/save', (req, res) => {
    var id = mongoose.Types.ObjectId(req.user.id)
    var weekNotes = []
    weekNotes.push(req.body.mon)
    weekNotes.push(req.body.tue)
    weekNotes.push(req.body.wed)
    weekNotes.push(req.body.thu)
    weekNotes.push(req.body.fri)
    weekNotes.push(req.body.etc)
    
    User.findOne({_id:id}, (err,user)=>{
        if (err) console.log(err)
        else {
            saveNotes(user, id, weekNotes)
            res.redirect('/')
        }
    })
})

function getArrayNotes(myNotes, newWeek) {
    var arrayNotes = []
    for (eachDate of newWeek) {
        myNotes.some(eachNote=>{
            if (eachNote.date === eachDate) {
                arrayNotes.push(eachNote || {})
                return true
            }
        })
    }
    return arrayNotes
}

// Receive user db result and weekNotes array
function saveNotes(user, id, weekNotes) {
    var week = []
    // set date of each date for this week
    d = new Date(user.currentWeekMon)
            
    for (let i=0 ; i<6 ; i++) {
        week[i] = d.toString().substring(0,15)
        d.setDate(d.getDate() + 1)
        
        Note.updateOne({
            user: id,
            date: week[i]
        }, 
        {
            $set: {
                note: weekNotes[i] || "",
            }
        },
        { upsert: true }, (err, dbRes) => {
            if (err) console.log(err)
        })
    }
}

function getWeek(d) {
    // show the week. if Sunday, show previous week
    var d = new Date(d)
    var day = d.getDay()
    d = new Date(d.setDate(d.getDate() - (day == 0 ? 7 : day)))
    var result = [new Date(d)];
    while (d.setDate(d.getDate() + 1) && d.getDay() !== 0) {
        result.push(new Date(d));
    }
    return result;
}

function getMonday(d) {
    var d = new Date(d);
    var day = d.getDay()
    var mon = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is d
    return new Date(d.setDate(mon));
}

module.exports = router;
