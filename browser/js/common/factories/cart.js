'use strict';

app.factory('CartFactory', function ($http) {

	var cart = [];

	return{
		addCart:function(product, quantity){
			cart.push({product: product, quantity: quantity});
		},

		getCart: function(){
			return cart;
		}
	}
});
