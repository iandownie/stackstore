'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    storeName:{
        type: String, required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    logo: {
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }
});


schema.statics.findAndPopulate = function (){
    return this.find({})
        .populate('products')
        .populate('user')
        .exec(function (err, store){
            if (err) console.error(err);
            return store;
        });
}

schema.statics.findByIdAndPopulate = function (id){
    return this.findById(id)
        .populate('products')
        .populate('user')
        .exec(function (err, store){
            if (err) console.error(err);
            return store;
        });
}

mongoose.model('Store', schema);