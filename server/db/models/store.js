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
    logo: {
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    lineitem:[{
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

var userQuery = [{path: 'user', select: 'firstName lastName email store'}];

schema.statics.findAndPopulate = function (){
    return this.find({})
        .populate(userQuery)
        .exec(function (err, stores){
            if (err) console.error(err);
            return stores;
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
    }).exec(function(err, data){
        if(err) throw new Error(err);
        return data;
    });
};



mongoose.model('Store', schema);
