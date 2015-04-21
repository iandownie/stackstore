'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products/:id',
        templateUrl: 'js/products/products.html',
        controller: 'ProductCtrl',
        resolve: {
            productsInfo:function($stateParams, ProductFactory){
                return ProductFactory.getProduct($stateParams.id);
            }
        }
    });
});

app.factory('ProductFactory', function ($http) {

    return {
        getProduct: function (productID) {
            return $http.get('/api/products/' + productID).then(function (response) {
                return response.data;
            });
        }
    };

});

app.controller('ProductCtrl', function ($scope, productsInfo) {

    $scope.product = productsInfo;
});




