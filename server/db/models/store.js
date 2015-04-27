'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

var schema = new mongoose.Schema({
    name:{
        type: String, required: true
    },
    url:{
        type: String, unique: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    logo: {
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'LineItem'
    }],
    description: {
        type: String
    }
});

schema.post('save', function(doc, next){
    //post hook checks if user set up a custom url slug, if not it defaults to document id
    if(!doc.url) doc.url = doc._id;
    next();
});

schema.statics.findAndPopulate = function (){
    var populateQuery = [{path: 'user', select: 'firstName lastName email store'}];
    return this.find({})
        .populate('products')
        .populate(populateQuery)
        .exec(function (err, stores){
            if (err) console.error(err);
            return stores;
        });
};

schema.statics.findByIdAndCategory = function (id, query){
    var userQuery = [{path: 'user', select: 'firstName lastName email store'}];
    var productCategoryQuery = [{path: 'products',
                                match: query}];
    return this.findById(id)
        .populate(productCategoryQuery)
        .populate(userQuery)
        .exec(function (err, store){
            if (err) throw new Error(err);
            return store;
        });
};

schema.statics.findOneAndCategory = function (url, query){
    var userQuery = [{path: 'user', select: 'firstName lastName email store'}];
    var productCategoryQuery = [{path: 'products',
                                match: query}];
    return this.findOne({url : url})
        .populate(productCategoryQuery)
        .populate(userQuery)
        .exec(function (err, store){
            if (err) throw new Error(err);
            return store;
        });
};

schema.statics.createStoreAndAttachUser = function(store){
    var self = this;
    return User.findById(store.user, function (err, user) {
        if (user.store) throw new Error("User Has Store.");
        self.create(store, function(err, newStore){
            if (err) throw new Error(err);
            user.store = newStore._id;
            user.save(function (){
                console.log(newStore);
                return newStore;
            });
        });
    });
};



mongoose.model('Store', schema);
