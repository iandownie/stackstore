'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userName:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    storeName:{
        type: String, required:true
    },
    products: [{
        type: Schema.Types.ObjectId, ref: 'Product'
    }],
    logo: {
        type: String
    }
});

mongoose.model('Store', schema);