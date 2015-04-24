'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('orders', {
        url: '/orders/:id',
        templateUrl: 'js/orders/orders.html',
        controller: 'OrderCtrl',
        resolve: {
            orderInfo:function($stateParams, $state, OrderFactory){
                return OrderFactory.getOrder($stateParams.id).catch(function(err){
                    $state.go('error');
                });
            }
        }
    });
});

app.factory('OrderFactory', function ($http, $scope) {

    return {
        getOrder: function (orderID) {
            return $http.get('/api/orders/' + orderID).then(function (response) {
                return response.data;
            });
        },
        editOrder: function(order){
            return $http.put('api/orders/' + order._id, order).then(function(response){
                return response.data;
            });
        },
        deleteOrder: function(orderID){
            return $http.delete('api/orders/' + orderID).then(function(response){
                return response.data;
            });
        }
    };

});

app.controller('OrderCtrl', function ($scope, $state, NavFactory, orderInfo, OrderFactory) {
    console.log(orderInfo);

    $scope.deleteOrder = function(orderID){
        NavFactory.loader=false;
    	OrderFactory.deleteOrder(orderID).then(function(data){
            NavFactory.loader=true;
    	}).catch(function(err){
    		console.log(err);
            NavFactory.loader=true;
    	});
    };
});
