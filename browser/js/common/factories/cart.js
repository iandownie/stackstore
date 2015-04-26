'use strict';

app.factory('CartFactory', function ($http, localStorageService, $state) {

	return{

		addToCart:function(product, quantity){

			var order = localStorageService.get('order');

			return $http.post('api/line-item', {order: order, product: product, quantity: quantity})
				.then( function(lineItems){
					if (!order) localStorageService.set('order', lineItems.data.order);
					$state.go('cart', {lineItems: lineItems.data});
				});
		},

		getCart: function(){
			var order = localStorageService.get('order');
			return $http.post('api/cart', {order: order})
				.then( function (lineItems){
					return lineItems.data;
			});
		},

		submitOrder: function(newOrder){
			newOrder.products = newOrder.products.map(function(el){
				el.paidUnitPrice = el.product.price;
				el.product = el.product._id;
				return el;
			});
			return $http.post('api/orders', newOrder).then(function(response){
				return response.data;
			});
		}
	};
});
