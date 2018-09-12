var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var mongoose = require('mongoose');
var assert = require('assert')
var passport = require('passport')
var flash = require('connect-flash');
require('./config/passport')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*==============================================================================
  Database
==============================================================================*/
mongoose.connect('mongodb://localhost:27017/weekly-work-note')


/*==============================================================================
  Connect Session
==============================================================================*/
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/session',
    collection: 'user'
});

store.on('connected', function () {
    store.client; // The underlying MongoClient object from the MongoDB driver
});

// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));


/*==============================================================================
  Passport
==============================================================================*/
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


/*==============================================================================
  Routers
==============================================================================*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);



/*==============================================================================
  Error Handler
==============================================================================*/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
