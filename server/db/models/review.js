'use strict';

/*

4. Data Validations

>>> REVIEWS <<<

All reviews must belong to a product
All reviews must belong to a user
All reviews must be at least X characters

*/

var mongoose = require('mongoose');

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
    rating : {type:Number, required: true},
    description: {type: String, minlength : 20}

});

mongoose.model('Review', schema);