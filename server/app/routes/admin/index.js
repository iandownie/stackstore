'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');

router.get('/', function(req, res, next){
	User.find({}, function (err, users){
		res.send(users);
	})
})