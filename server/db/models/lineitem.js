'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model("Order");
var Q = require('q');

var schema = new mongoose.Schema({
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

var checkIfItemIsAlreadyInOrder = function (order, item) {
    console.log('checkIfItemIsAlreadyInOrder!!!(Order)!!!!!', order)
    console.log('checkIfItemIsAlreadyInOrder!!!(item)!!!!!', item)

    if (order.products.indexOf(item) === -1){
        order.products.push(item);
    } else {
        var index = order.products.indexOf(item);
        order.products[index].quantity += item.quantity;
    }
}

schema.statics.setOrCreateOrder = function (newLineItem) {
    console.log(newLineItem)
    if (newLineItem.localStorageId) return newLineItem;
    Order.create({}, function(err, order){
        if (err) error.log(err);
        newLineItem.localStorageId = order._id;
        console.log('SETORCREATEORDER', newLineItem)
        return newLineItem;
    })
};


schema.statics.addItemToCurrentOrder = function (lineItem, cb) {
    var orderId = lineItem.localStorageId;
    console.log('Line ITEM: !', lineItem)

        //Order.findById(orderId, function (err, currentOrder) {
        //    if (err) console.error(err);
        //    console.log('CURRENT ORDER!!', currentOrder)
        //
        //        //currentOrder.deepPopulate('products.product.store',
        //
        //});

};

var LineItem = mongoose.model('LineItem', schema);
