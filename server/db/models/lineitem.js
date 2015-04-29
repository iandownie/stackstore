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
    },
    status : {
        type: String, 
        required: true, 
        default: 'Created'
    }
});

var productQuery = [{path: 'product', select: '_id name price store description'}];
var userQuery = [{path: 'user', select: 'firstName lastName email store'}];

schema.statics.addItemToCurrentOrder = function (lineItem, cb) {
    var self = this;
    if (lineItem.order){
        self.findOne({order: lineItem.order, product: lineItem.product._id}, function(err, match){
            if(err) throw new Error(err);
            if(match){
                self.findByIdAndUpdate(match._id, {$inc : {quantity : lineItem.quantity}},
                    function(err, data){
                        if(err) throw new Error(err);
                        self.find({order: lineItem.order})
                            .populate(productQuery)
                            .exec(function (err, allLineItems){
                                    cb(err, allLineItems);
                                });
                        });
            } else {
                self.create(lineItem, function(err, newLineItem) {
                    if(err) throw new Error(err);
                    self.find({order: lineItem.order})
                        .populate(productQuery)
                        .exec(function (err, allLineItems){
                                cb(err, allLineItems);
                            });
                    });
            }
        });
    } else {
        Order.create({}, function (err, newOrder){
            if(err) throw new Error(err);
            lineItem.order = newOrder._id;
            self.create(lineItem, function(err, newLineItem) {
                if(err) throw new Error(err);
                self.find({order: lineItem.order})
                    .populate(productQuery)
                    .exec(function (err, allLineItems){
                        cb(err, allLineItems);
                    });
                });
            });
        }
};


schema.statics.updateLineItem = function(lineItemID, statusChange){
    //update line items and if all line items of the same objectId changes, it'' affect the status of the entire order.
    this.findByIdAndUpdate(lineItemID, statusChange,function(err,lineItem){
        if (err) throw new Error(err);
        // if line item is changed to completed or cancelled, check to see if the other line items are completed/cancelled to update the total order status
        if (statusChange.status === 'Completed' || statusChange.status === 'Cancelled'){
            this.find({order : lineItem.order}, function(err, cart){
                if(err) throw new Error(err);
                var completedLineItems = cart.filter(function(el){
                    return el.status === 'Completed' || el.status === 'Cancelled';
                });

                if(completedLineItems.length === cart.length){
                    //if all is completed then update the entire order status to completed
                    Order.findByIdAndUpdate(lineItem.order, {status : 'Completed'}, {new: true}, function(err, data){
                        if (err) throw new Error(err);
                        return data;
                    });
                }
            });
        }
    });
};

schema.statics.updateOrder = function(orderID, statusChange){
    if(statusChange.status === 'Created') throw new Error('Cannot revert an Order status back to Created');
    // if order status changes, line item status would also have to change
    return this.update({order : orderID}, statusChange, {multi: true}, function(err, data){
        if(err) throw new Error(err);
        return Order.findByIdAndUpdate(orderID, statusChange, {new: true}, function(err, orderData){
            if(err) throw new Error(err);
            return orderData;
        });
    }).exec();
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

schema.statics.findOneOrderWithItems = function(orderID){
    return Order.findById(orderID)
        .populate(userQuery)
        .exec(function(err, orderData){
                if(err) throw new Error(err);
                return this.find({order: orderID})
                            .populate(productQuery)
                            .exec(function(err, lineItemData){
                                if (err) throw new Error(err);
                                return {
                                    order : orderData,
                                    lineItem : lineItemData
                                };
                            });
    });
};

var LineItem = mongoose.model('LineItem', schema);

LineItem.schema.path('status').validate(function (value) {
  return /Created|Processing|Cancelled|Completed/i.test(value);
}, 'Invalid Line Item Status');
