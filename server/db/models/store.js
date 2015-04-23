'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

var schema = new mongoose.Schema({
    name:{
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
schema.statics.createStoreAndAttachUser = function(store){
    return this.create(store, function(err, newStore){
        if (err) console.error (err);
        User.findById(store.user, function (err, user) {
            if (err) console.error (err);
            user.store = newStore._id;
            user.save(function (){
                newStore.user = user._id;
                newStore.save(function(){
                    return newStore;
                });
            });
        });
    });
}
mongoose.model('Store', schema);
