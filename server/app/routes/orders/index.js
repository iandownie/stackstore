'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model('Order');

var router = require('express').Router();


router.post('/', function(req, res, next){
	//create an order
	Order.create(req.body, function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

router.get('/:id', function(req, res, next){
	//see an order
	Order.findById(req.params.id)
			.populate('user')
			.populate('product')
			.exec(function(err,data){
				if (err) return next(err);
				res.json(data);
			});
});

router.put('/:id', function(req, res, next){
	//update an order
	Order.findByIdAndUpdate(req.params.id, req.body, function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

router.delete('/:id', function(req, res, next){
	//delete an order
	Order.findByIdAndRemove(req.params.id, function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

module.exports = router;