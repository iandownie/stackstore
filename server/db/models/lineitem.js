'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model("Order");
var Q = require('q');
var deepPopulate = require('mongoose-deep-populate');

var schema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Order'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        min : 1
    },
    paidUnitPrice : {
        type: Number,
        //required: true,
        min : 0
    }
});

schema.plugin(deepPopulate, {} /* more on options below */);


schema.statics.addItemToCurrentOrder = function (lineItem, cb) {
    console.log('!!!!!', lineItem)
    if (lineItem.order){
        LineItem.findOne({order: lineItem.order, product: lineItem.product._id}, function(err, match){
            if(err) throw new Error(err);
            console.log('Match', match)
            if(match){
                LineItem.findByIdAndUpdate(match._id, {$inc : {quantity : lineItem.quantity}},
                    function(err, data){
                        LineItem.find({order: lineItem.order}, function (err, allLineItems){
                            cb(err, allLineItems);
                        });
                    })
            } else {
                LineItem.create(lineItem, function(err, newLineItem) {
                    LineItem.find({order: lineItem.order}, function (err, allLineItems){
                    cb(err, allLineItems);
                    });
                });
            }
        });
    } else {
        return Order.create({}, function (err, newOrder){
            console.log('NEW ORDERRR', newOrder)
            if(err) throw new Error(err);
            lineItem.order = newOrder._id;
            LineItem.create(lineItem, function(err, newLineItem){
                 cb(err,newLineItem);
            })
        })
    }

};

var LineItem = mongoose.model('LineItem', schema);
