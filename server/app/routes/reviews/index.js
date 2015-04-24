'use strict';

var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Promise = require('q');

var router = require('express').Router();

router.get('/', function(req, res, next){
	var query = {};
	if(req.query){
		query = req.query;
	}
	Review.getReviewByQuery(query).then(function(data){
		res.json(data);
	}).then(null, function(err){
		return next(err);
	});
});

router.post('/', function(req, res, next){
	//create a review
	Review.createReview(req.body).then(function(data){
		res.json(data);
	}).catch(function(err){
		return next(err);
	});
});

router.get('/:id', function(req, res, next){
	//see a review
	Review.getReviewById(req.params.id).then(function(data){
		res.json(data);
	}).then(null, function(err){
		return next(err);
	});
});

router.put('/:id', function(req, res, next){
	//update a review
	Review.findByIdAndUpdate(req.params.id, req.body, function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

router.delete('/:id', function(req, res, next){
	//delete a review
	Review.deleteReview(req.params.id).then(function(data){
		res.json(data);
	}).then(null, function(err){
		return next(err);
	});
});

module.exports = router;