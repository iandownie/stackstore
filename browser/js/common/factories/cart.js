'use strict';

app.factory('CartFactory', function ($http, localStorageService) {

	var cart = [];

	return{

		addToCart:function(product, quantity){

			var order = localStorageService.get('order');

			return $http.post('api/cart', {order: order, product: product, quantity: quantity})
				.then( function(response){
					//response.data will always be an array even if there is only one item
					if (!order) localStorageService.set('order', response.data[0].order);
					cart = response.data;
					console.log("CART", cart)
					return cart;
				});
		},

		getCart: function(){
			var order = localStorageService.get('order');
			if (!order) return [];
			if (cart.length !== 0) return cart;
			else {

				var config = {
					params : {order : order}
				};
				return $http.get('api/cart', config)
					.then( function (response){
						//array of line items
						cart = response.data;
						console.log(cart);
						return cart;
					});
			}
		},

		removeLineItem: function(lineItem){
			var config = {
				params : {id : lineItem}
			};

			return $http.delete('api/cart', config)
				.then( function (response){
					return response;
				});
		},

		updateQuantity: function (id, quantity){
			var config = {id : id, quantity: quantity};
			return $http.put('api/cart', config)
				.then( function (response){
					return response;
				});
		},

		submitOrder: function(newOrder){
			newOrder.products = newOrder.products.map(function(el){
				el.paidUnitPrice = el.product.price;
				el.product = el.product._id;
				return el;
			});
			return $http.post('api/orders', newOrder).then(function(response){
				localStorageService.remove('order')
				return response.data;
			});
		}
	};
});
