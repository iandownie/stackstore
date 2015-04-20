'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductCtrl'
        resolve: {
            productsInfo:function(ProductFactory){
                return ProductFactory.getProduct();
            }
        }

    });

});

app.factory('ProductFactory', function ($http) {

    return {
        getProduct: function (productID) {
            return $http.get('/api/product/'+productID).then(function (response) {
                return response.data;
            });
        }
    };

});

app.controller('ProductCtrl', function ($scope, productsInfo) {

    $scope.product=productsInfo;

});