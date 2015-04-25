'use strict';

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');


var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    //removed shipping address requirements for order creation
    shippingAddress: {
        street: {type: String},
        city: {type: String},
        state: {type: String},
        zip: {type: Number}
    },
    status : {
    	type: String,
    	required: true,
    	default: 'Created'
    }

});

schema.plugin(deepPopulate, {} /* more on options below */);

var Order = mongoose.model('Order', schema);


Order.schema.path('status').validate(function (value) {
  return /Created|Processing|Cancelled|Completed/i.test(value);
}, 'Invalid Order Status');



/* 

1. Unauthenticated Users

>>> Manage My Cart <<<

Add an Item to My Cart from Product Listing or Product Detail Page
Remove an Item from My Cart
Edit/Update Quantities of items in My Cart
Log in and continue editing the cart
Refresh the page without being logged in and have the Cart persist (you may use sessionStorage, localStorage, Cookies or JWT for this)

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

>>> Order Management <<<

View a List of all Orders
Filter Orders by Status (Created, Processing, Cancelled, Completed)
Change the Status of the Order (Created -> Processing, Processing -> Cancelled, Completed)
View Details of a specific Order

4. Data Validations

>>> ORDER <<<

Orders must belong to a user OR session
Orders must contain Line Items that capture the price, current product ID and quantity
If a user makes an order, that order should keep the price of the item at when they checked out even if Admins change the price of the product later

*/