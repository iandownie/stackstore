'use strict';

var mongoose = require('mongoose');

var LineItem = mongoose.model("LineItem");

var router = require('express').Router();

router.get('/', function(req, res, next){
	//the query will be structured by the front-end, it can be order # or product #
	LineItem.findByCriteria(req.query).then(function(orderArr){
		res.json(orderArr);
	}).then(null, function(err){
		return next(err);
	});
});

router.post('/', function(req, res, next){

    LineItem.addItemToCurrentOrder(req.body, function(err, order){
        if(err) return next(err);
        if(!(order instanceof Array)) order = [order];
        res.json(order);

    });

});

router.delete('/', function(req, res, next){
    LineItem.findByIdAndRemove(req.query.id, function(err, data){
        if(err) return next(err);
        res.json(data);
    });

});

router.put('/', function(req, res, next){
    LineItem.findByIdAndUpdate(req.body.id, {quantity: req.body.quantity},function(err, data){
        if(err) return next(err);
        res.json(data);
    });

});

module.exports = router;
