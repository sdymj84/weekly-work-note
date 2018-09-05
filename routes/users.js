var express = require('express');
var router = express.Router();
var User = require('../config/database')
var passport = require('passport')
var bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: false
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

module.exports = router;
