'use strict';

app.factory('CartFactory', function ($http) {
	var cart = [];
	var shippingAddress = '';
	
	return{
		addCart:function(product, quantity){
			for(var i = 0; i < quantity; i++){
				cart.push(product);
			}
			console.log(cart);
		}
	};
});
