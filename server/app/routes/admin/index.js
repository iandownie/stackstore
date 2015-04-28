'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');

router.get('/', function(req, res, next){
	if(req.user._type === "Admin"){
		User.find({}, function (err, users){
			res.send(users);
		})	
	} else {
		res.status(401)
	}
})

router.delete('/:id', function(req, res, next){
	User.findByIdAndRemove(req.params.id, function (err, user){
		res.send(user);
	})
})

router.put('/', function(req, res, next){
    User.findByIdAndRemove(req.body._id, function (err, user){
        Admin.create(req.body, function (err, admin){
        	res.send(admin);
        });
    });
})