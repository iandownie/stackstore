'use strict';



var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name:{
		type: String, 
		required:true, 
		unique: true
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
	categories:[{
		type: String, required: true
	}],
	reviews : [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Review'
	}],
	images:[{
		type: String
	}]
});

mongoose.model('Product', schema);

/* 

1. Unauthenticated Users

>>> View Product Listing <<<

Refine Listing by Category
Search Product Listing
View Product Detail Page
View Product Information and Product Reviews left by Authenticated Users

2. Authenticated Users

>>> Account Management <<<

View Past Order List
View Order Detail
Current Order Status
Items with Quantity and Subtotal
Link to the original Product Detail Page
Date/Time Order was created
Product Reviews
Leave a Review (with a 5-star rating) for a Product

3. Admin Users

>>> Site Management <<<

Create Categories for items, Each Item can have multiple Categories

>>> Product Management <<<

Create and Edit Products with name, description, price and one or more photos
Manage the availability of a Product. If a product is no longer available, Users will not see it while Browsing, but they can view the Product Detail page if they've ordered it previously or have a direct link. On that product detail page it should say "Currently Unavailable"
Add/Remove Categories from Items

4. Data Validations

Must have title, description and price
Must belong to at least one category
The title must be unique
If there is no photo, there must be a placeholder photo used

*/