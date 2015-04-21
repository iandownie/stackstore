'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model("Order");

var router = require('express').Router();


router.post('/', function(req, res, next){
	//create an order

});

router.get('/:id', function(req, res, next){
	//see an order
	
});

module.exports = router;