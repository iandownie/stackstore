'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model("Order");

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

var productQuery = [{path: 'product', select: '_id name price store description'}];

schema.statics.addItemToCurrentOrder = function (lineItem, cb) {
    var self = this;
    if (lineItem.order){
        self.findOne({order: lineItem.order, product: lineItem.product._id}, function(err, match){
            if(err) throw new Error(err);
            if(match){
                self.findByIdAndUpdate(match._id, {$inc : {quantity : lineItem.quantity}},
                    function(err, data){
                        self.find({order: lineItem.order})
                            .populate(productQuery)
                            .exec(function (err, allLineItems){
                                    cb(err, allLineItems);
                                });
                        });
            } else {
                self.create(lineItem, function(err, newLineItem) {
                    self.find({order: lineItem.order})
                        .populate(productQuery)
                        .exec(function (err, allLineItems){
                                cb(err, allLineItems);
                            });
                    });
            }
        });
    } else {
        return Order.create({}, function (err, newOrder){
            if(err) throw new Error(err);
            lineItem.order = newOrder._id;
            self.create(lineItem, function(err, newLineItem){
                 cb(err,newLineItem);
            });
        });
    }

};

schema.statics.findByCriteria = function (query) {
    return this.find(query)
                .populate(productQuery)
                .exec(function(err, data){
                    if(err) throw new Error(err);
                    console.log(data);
                    return data;
                });
};

var LineItem = mongoose.model('LineItem', schema);
