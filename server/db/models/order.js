'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    shippingAddress: {type: String, required:true},
    paid: {type: Boolean, default: false},
    shipped: {type: Boolean, default: false}

});

mongoose.model('Order', schema);