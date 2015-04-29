'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model("Product");
var Store = mongoose.model("Store");
var Review = mongoose.model("Review");

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
	console.log(query);
	Product.getProductsByQuery(query).then(function(data){
		console.log(data);
		res.json(data);
	}).then(null, function(err){
		return next(err);
	});
});

router.post('/', function(req, res, next){
	Product.createProduct(req.body).then(function(data){
		res.json(data);
	}).then(null, function(err){
		return next(err);
	});
});

router.get('/:id', function (req, res, next) {
    //this static takes in two parameters, the product ID and a callback that handles the product and review data
    Product.getProductById(req.params.id, function(product, reviews){
    	res.json({
    		product : product,
    		reviews : reviews
    	});
    }).then(null, function(err){
    	return next(err);
    });
});

router.delete('/:id', function(req, res, next){
	Product.deleteProduct(req.params.id).then(function(data){
		res.json(data);
	}).then(null, function(err){
		return next(err);
	});
});

router.put('/:id', function(req, res, next){
	Product.editProduct(req.params.id, req.body).then(function(data){
		res.json(data);
	}).then(null, function(err){
		return next(err);
	});
});

module.exports = router;
