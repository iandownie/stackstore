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

router.put('/:lineItemId', function(req, res, next){
    LineItem.updateLineItem(req.params.lineItemId, req.body, function(err, order){
        if(err) return next(err);
        res.json(order);
    });

});

router.delete('/:id', function(req, res, next){
    LineItem.findByIdAndRemove(req.params.id, function(err, data){
        if(err) return next(err);
        LineItem.find({order : data.order})
                .populate('product')
                .exec(function(err, data){
                    if(err) return next(err);
                    res.json(data);
                });
    });

});

module.exports = router;
