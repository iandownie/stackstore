'use strict';

var mongoose = require('mongoose');
var Category = mongoose.model('Category');

var router = require('express').Router();


router.get('/', function(req, res, next){
	//get all the categories
	Category.find().exec(function(err, dataArr){
		console.log(dataArr);
		if(err) return next(err);
		res.json(dataArr);
	});
});

router.post('/', function(req, res, next){
	//create an category
	Category.create(req.body, function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

router.delete('/:id', function(req, res, next){
	// delete a category
	Category.findByIdAndRemove(req.params.id).exec(function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

router.put('/:id', function(req, res, next){
	//edits a category
	Category.findByIdAndUpdate(req.params.id, req.body).exec(function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

module.exports = router;