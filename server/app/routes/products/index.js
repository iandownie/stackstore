'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model("Product");
var Store = mongoose.model("Store");


var router = require('express').Router();


router.get('/', function(req, res, next){
	//get all products
	var query = {};
	if(req.query.hasOwnProperty('categories')){
		if (typeof req.query.categories === 'string'){
			//if you click only one option in the select, categories will be a string
			query = req.query;
		} else {
			//if you click multiple options in the selection, categories will be an array
			query = {categories : {$in : req.query.categories}};
		}
	}
	Product.find(query).populate('store').exec(function(err, dataArr){
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
		});
	});

});

router.get('/:id', function (req, res, next) {
    Product.findById(req.params.id).populate('store').exec(function(err, data){
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
	Product.findByIdAndUpdate(req.params.id, req.body).populate('store').exec(function(err, data){
		if(err) return next(err);
		res.json(data);
	});
});

module.exports = router;
