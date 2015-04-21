'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var User = mongoose.model('User');

router.post('/createUser', function (req, res, next) {
    console.log('User create: ', req.body)
    User.create(req.body, function (err, createdUser){
        if (err) console.error(err);
        console.log('created user: ', createdUser)
        res.send(createdUser);
    })
});
