'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

var router = require('express').Router();


router.post('/', function(req, res, next){
	console.log('Order route: ', req.body)
	//update order status to processing
	req.body.status = 'Processing';

	//submit an order by finding open order by id
	Order.findByIdAndUpdate(req.body.id, req.body, function(err, data){
		if(err) return next(err);

		Product.updateQuantities(req.body, function (err, otherData){
			if(err) return next(err);
			console.log('ORDERS ROUTE - DATA', data)
			console.log('ORDERS ROUTE - OTHERDATA', otherData)

			res.send(data);
		})
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