'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');

// router.post('/user', function (req, res, next) {
//     var admin = {
//         firstName: 'Admin',
//         lastName: 'Admin',
//         email: "Admin.com",
//         password: 'Admin'
//     }
//     Admin.create(admin, function (err, createdUser){
//         if (err) console.error(err);
//         console.log('created user: ', createdUser);
//         res.send(createdUser);
//     });
// });

router.post('/user', function (req, res, next) {
    User.create(req.body, function (err, createdUser){
        if (err) return next(err);
        res.json(createdUser);
    });
});

router.get('/user', function (req, res, next) {
    User.getProperLoginType( req.session._id, function(err, whateverUser){
        console.log(whateverUser);
        res.json(whateverUser);
    });
    // User.findById(req.session._id, function (err, user){
    //     if (err) console.error(err);
    //     console.log('GET USER - user: ', user);
    //     res.send(user);
    // });
});
