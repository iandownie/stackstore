'use strict';

app.factory('CartFactory', function ($http, localStorageService) {

	var cart = [];

	return{

		//addToCart:function(product, quantity){
		//	cart.push({product: product, quantity: quantity});
		//},



		addToCart:function(product, quantity){

			var order = localStorageService.get('order');

			return $http.post('api/line-item', {localStorageId: order, product: product, quantity: quantity})
				.then( function(newOrder){
					console.log('New Order!!!!', newOrder.data)
					localStorageService.set('order', newOrder.data._id);
					return newOrder;
				});
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
