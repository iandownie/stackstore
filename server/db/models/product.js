'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name:{
		type: String, required:true
	},
	price:{
		type: Number, required:true
	},
	quantity:{
		type: Number, required: true
	},
	store: {
	    type:  mongoose.Schema.Types.ObjectId, ref: 'Store',
	    required: true
	},
	description:{
		type: String, required: true
	},
	images:[{
		type: String
	}]
});

mongoose.model('Product', schema);