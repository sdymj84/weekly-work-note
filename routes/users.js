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

router.get('/save', (req,res)=>{
    var wallNum = req.query.wall
    console.log(wallNum)
    var id = mongoose.Types.ObjectId(req.user.id)
    User.updateOne({_id:id}, {
        'settings.background': wallNum
    }, (err)=>{
        if (err) console.log(err)
        else res.redirect('/')
    })
})

module.exports = router;
