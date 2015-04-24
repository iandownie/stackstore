'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model("Product");
var Store = mongoose.model("Store");
var LineItem = mongoose.model("LineItem");
var Order = mongoose.model("Order");


var router = require('express').Router();

router.post('/', function(req, res, next){

    var order = LineItem.setOrCreateOrder(req.body);
    console.log('ROUTE ORDER!!!', order)
    LineItem.addItemToCurrentOrder(order, function(err, order){
        console.log('HERE!')
        if(err) return next(err);
        res.json(order);
    })

});

module.exports = router;