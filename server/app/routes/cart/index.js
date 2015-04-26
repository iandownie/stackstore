'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model("Product");

var Store = mongoose.model("Store");
var LineItem = mongoose.model("LineItem");
var Order = mongoose.model("Order");


var router = require('express').Router();

router.post('/', function(req, res, next){
    console.log('REQ', req.body)
    LineItem.findAllForOrder(req.body.order, function(err, order){
        if(err) return next(err);
        res.send(order);

    });
});

module.exports = router;
