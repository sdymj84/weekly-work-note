var express = require('express');
var router = express.Router();
var User = require('../config/database')

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.user)
    res.render('index', { title: 'Weekly Work Note', user: req.user });
});

module.exports = router;
