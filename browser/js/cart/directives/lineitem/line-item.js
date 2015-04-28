'use strict';

app.directive('lineItem', function(){
	return{
		restrict: 'E',
		scope: {
			product : '='
		},
		templateUrl: '/js/cart/directives/lineitem/line-item.html',
		link : function(scope, element, attribute){
			scope.itemTotal = scope.product.price * scope.quantity;

			scope.updateItemTotal = function(){
				scope.itemTotal = scope.product.price * scope.quantity;
			};
		}
	};
});