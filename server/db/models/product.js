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
	description:{
		type: String, required: true
	}
});

mongoose.model('Product', schema);