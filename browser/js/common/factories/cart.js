'use strict';

app.factory('CartFactory', function ($http, localStorageService) {

	var cart = [];

	return{

		addToCart:function(product, quantity){

			var order = localStorageService.get('order');

			return $http.post('api/line-item', {order: order, product: product, quantity: quantity})
				.then( function(lineItem){
					console.log('New Order!!!!', lineItem.data)
					if (!order) localStorageService.set('order', lineItem.data.order);
					return lineItem;
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
