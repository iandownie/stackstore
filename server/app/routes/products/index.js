'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model("Product");
var Store = mongoose.model("Store");


var router = require('express').Router();


router.get('/', function(req, res, next){
	//get all products
	Product.find().limit(10).exec(function(err, dataArr){
		if(err) return next(err);
		res.json(dataArr);
	});
});

router.post('/', function(req, res){
	Product.create(req.body).then(function(product){
		Store.findByIdAndUpdate(req.body.store, {
			$push: 
				{ products:  product._id }
			})
			.then(function(store){
				res.json(store);
		})
	});

});

router.get('/:id', function (req, res, next) {
    Product.findById(req.params.id, function(err, data){
        if(err) return next(err);
        res.json(data);
    });

});

router.delete('/:id', function(req, res, next){
	Product.findByIdAndRemove(req.params.id, function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

router.put('/:id', function(req, res, next){
	Product.findByIdAndUpdate(req.params.id, req.body, function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});


router.put('/:id', function(req, res){

});

module.exports = router;
