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


schema.statics.findAndPopulate = function (id){
    if (!id){
        id = {};
    } else {
        id = {_id: id}
    }
    console.log('ID!!', id);
    console.log('THIS!', this);

    return this.find(id)
        .populate('products')
        .populate('user')
        .exec(function (err, store){
            if (err) console.error(err);
            return store;
        });

}

schema.statics.findByIdAndPopulate = function (id){

    console.log('ID!!', id);
    console.log('THIS!', this);

    return this.findById(id)
        .populate('products')
        .populate('user')
        .exec(function (err, store){
            if (err) console.error(err);
            return store;
        });

}

mongoose.model('Store', schema);