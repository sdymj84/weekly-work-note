var express = require('express');
var router = express.Router();
var User = require('../models/users')
var Note = require('../models/notes')
var mongoose = require('mongoose')

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
                var date = user.currentWeekMon

                week = getWeek(date)
                newWeek = [];

                for (day of week) {
                    day = day.toString().split(" ")
                    day = day.slice(0, 4)
                    newWeek.push(day.toString().replace(/,/g, " "))
                }

                // Note.findOne({user:id, date:date}, (err,notes)=>{
                //     if (err) console.log(err)
                //     else {
                //         notes = notes || {}
                //         res.render('index', { 
                //             user: req.user,
                //             week: newWeek,
                //             notes, wall, font
                //         });      
                //     }
                // })
                
                Note.find({user:id, date:date}, (err,notes)=>{
                    if (err) console.log(err)
                    else {
                        console.log("== Showing notes =========")
                        console.log(id)
                        console.log(date)
                        console.log(notes)
                        console.log("==========================")
                        notes = notes || {}
                        res.render('index', { 
                            user: req.user,
                            week: newWeek,
                            notes, wall, font
                        });
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

// router.post('/save', (req, res) => {
//     var id = mongoose.Types.ObjectId(req.user.id)
//     var d = new Date(Date.now())
//     User.findOne({_id:id}, (err,user)=>{
//         if (err) console.log(err)
//         else {
//             d = new Date(user.currentWeekMon)
//             var date = getMonday(d).toString().substring(0,15)
//             Note.updateOne({
//                 user: id,
//                 date: date
//             }, 
//             {
//                 $set: {
//                     mon: req.body.mon,
//                     tue: req.body.tue,
//                     wed: req.body.wed,
//                     thu: req.body.thu,
//                     fri: req.body.fri,
//                     etc: req.body.etc
//                 }
//             },
//             { upsert: true }, (err, dbRes) => {
//                 if (err) console.log(err)
//                 else {
//                     res.redirect('/')
//                 } 
//             })
//         }
//     })
// })

router.post('/save', (req, res) => {
    var id = mongoose.Types.ObjectId(req.user.id)
    var weekNotes = []
    weekNotes.push(req.body.mon)
    weekNotes.push(req.body.tue)
    weekNotes.push(req.body.wed)
    weekNotes.push(req.body.thu)
    weekNotes.push(req.body.fri)
    weekNotes.push(req.body.etc)
    // var d = new Date(Date.now())
    var week = []

    User.findOne({_id:id}, (err,user)=>{
        if (err) console.log(err)
        else {
            // set date of each date for this week
            d = new Date(user.currentWeekMon)
            
            for (let i=0 ; i<6 ; i++) {
                week[i] = d.toString().substring(0,15)
                console.log(week[i])
                d.setDate(d.getDate() + 1)
                
                Note.updateOne({
                    user: id,
                    date: week[i]
                }, 
                {
                    $set: {
                        note: weekNotes[i],
                    }
                },
                { upsert: true }, (err, dbRes) => {
                    if (err) console.log(err)
                })
            }
            res.redirect('/')
        }
    })
})

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

// function saveNotes() {
//     var id = mongoose.Types.ObjectId(req.user.id)
//     var d = new Date(Date.now())
//     User.findOne({_id:id}, (err,user)=>{
//         if (err) console.log(err)
//         else {
//             d = new Date(user.currentWeekMon)
//             var date = getMonday(d).toString().substring(0,15)
//             Note.updateOne({
//                 user: id,
//                 date: date
//             }, 
//             {
//                 $set: {
//                     mon: req.body.mon,
//                     tue: req.body.tue,
//                     wed: req.body.wed,
//                     thu: req.body.thu,
//                     fri: req.body.fri,
//                     wkn: req.body.wkn
//                 }
//             },
//             { upsert: true }, (err, dbRes) => {
//                 if (err) console.log(err)
//                 else {
//                     res.redirect('/')
//                 } 
//             })
//         }
//     })
// }

module.exports = router;
