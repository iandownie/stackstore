'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model("Product");

var Store = mongoose.model("Store");
var LineItem = mongoose.model("LineItem");
var Order = mongoose.model("Order");


var router = require('express').Router();

router.post('/', function(req, res, next){

    LineItem.addItemToCurrentOrder(req.body, function(err, order){
        if(err) return next(err);
        res.json(order);
    })

});

//router.post('/', function(req, res, next){
//    Order.create({}, function(err, newOrder){
//        console.log('New Order!!!', newOrder)
//        if (err) console.error(err);
//        LineItem.create(req.body, function(err, newLineItem){
//            console.log('New Line Item!!!', newLineItem)
//            if (err) console.error(err);
//            newOrder.products.push(newLineItem);
//            console.log('New Order After Push!!!', newOrder)
//            newOrder.save( function(err, data){
//                if (err) console.error(err);
//                console.log('SAVE!', data)
//                res.send(data);
//            })
//        })
//    })
//
//});

module.exports = router;
