'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userName:{
        type: String
    },
    storeName:{
        type: String, required:true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    logo: {
        type: String
    }
});

mongoose.model('Store', schema);