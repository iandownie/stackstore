'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type: String, required:true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    logo: {
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

mongoose.model('Store', schema);