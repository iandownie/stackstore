'use strict';

app.factory('CartFactory', function ($http) {

	var cart = [];

	return{
		addCart:function(product, quantity){
			cart.push({product: product, quantity: quantity});
		},

		getCart: function(){
			return cart;
		},

		submitOrder: function(newOrder){
			newOrder.products = newOrder.products.map(function(el){
				el.paidUnitPrice = el.product.price;
				el.product = el.product._id;
				return el;
			});
			console.log('call me');
			return $http.post('api/orders', newOrder).then(function(response){
				return response.data;
			});
		}
	};
});
