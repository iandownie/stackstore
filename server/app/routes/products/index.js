'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model("Product");

var router = require('express').Router();


router.get('/', function(req, res){
	//get all products
	Product.find().limit(10).exec(function(err, dataArr){
		if(err) return next(err);
		res.json(dataArr);
	});
});

router.post('/', function(req, res){
console.log(req.body)
	Product.create(req.body).then(function(data){
		res.json(data)
	})

});

router.get('/:id', function (req, res) {
    Product.findById(req.params.id, function(err, data){
        res.json(data);
    });

});
router.delete('/:id', function(req, res){

});

router.put('/:id', function(req, res){

});

module.exports = router;
