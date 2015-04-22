'use strict';

var mongoose = require('mongoose');

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
        type: Number
    }
});

mongoose.model('LineItem', schema);