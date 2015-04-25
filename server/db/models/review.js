'use strict';

/*

4. Data Validations

>>> REVIEWS <<<

All reviews must belong to a product
All reviews must belong to a user
All reviews must be at least X characters

*/
var Promise = require('q');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var schema = new mongoose.Schema({
	createDate :{
		type: Date, default: Date.now()
	},
	product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    rating : {type:Number, required: true, min: 0, max: 5},
    title: {type: String, required: true, minlength: 1},
    description: {type: String, minlength : 10}

});

var userQuery = [{path: 'user', select: 'firstName lastName email store'}];

schema.statics.getReviewById = function(reviewId){
    return this.findById(reviewId)
            .populate(userQuery)
            .exec(function(err, reviewData){
                if (err) throw new Error(err);
                return reviewData;
            });
};

schema.statics.getReviewByQuery = function(query){
    return this.find(query)
            .populate(userQuery)
            .exec(function(err, reviewData){
                if (err) throw new Error(err);
                return reviewData;
            });
};

mongoose.model('Review', schema);