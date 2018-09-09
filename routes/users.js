var express = require('express');
var router = express.Router();
var User = require('../models/users')
var passport = require('passport')
var bcrypt = require('bcryptjs')
var mongoose = require('mongoose')

/* GET users listing. */
router.get('/login', (req, res) => {
    res.render('login', { message: req.flash().error })
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err,hash)=>{
        let user = new User({
            username: req.body.username,
            password: hash,
            nickname: req.body.nickname
        })

        user.save((err) => {
            if (err) return console.log(err)
            req.login(user, (err) => {
                req.session.save(() => {
                    res.redirect('/')
                })
            })
        })
    })
})

router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
})

// when user select wall-image or font
router.get('/save', (req,res)=>{
    var wallNum = req.query.wall
    var font = req.query.font
    var id = mongoose.Types.ObjectId(req.user.id)

    if (wallNum) {
        User.updateOne({_id:id}, {
            'settings.background': wallNum,
        }, (err)=>{
            if (err) console.log(err)
            else res.redirect('/')
        })    
    } else if (font) {
        User.updateOne({_id:id}, {
            'settings.font': font
        }, (err)=>{
            if (err) console.log(err)
            else res.redirect('/')
        })
    }
})

// when user change date, the new date will be saved in db
// so the app can run based on the certain week the user set
router.get('/set-date', (req,res)=>{
    var id = mongoose.Types.ObjectId(req.user.id)
    var d = new Date(req.query.date || Date.now())
    var date = getMonday(d).toString().substring(0,15)
    console.log(date)
    User.updateOne({_id:id}, {
        $set: {
            currentDate: date
        }
    }, (err)=>{
        if (err) console.log(err)
        else res.redirect('/')
    })
})


function getMonday(d) {
    var d = new Date(d);
    var day = d.getDay()
    var mon = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is d
    return new Date(d.setDate(mon));
}

module.exports = router;
