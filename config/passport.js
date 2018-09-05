var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/users')
var bcrypt = require('bcryptjs')

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
})

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done(err)
        if (!user) {
            console.log("Username not exist")
            return done(null, false);
        }
        bcrypt.compare(password, user.password, (err,res)=>{
            if (res) return done(null, user)
            else return done(null, false)
        })
    })
}))