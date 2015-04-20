'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductCtrl',
        resolve: {
            productsInfo:function(ProductFactory){
                console.log("test", ProductFactory.getProduct)
                return ProductFactory.getProduct("55356c46d374a8126f3dcc88");
            }
        }

    });

});

app.factory('ProductFactory', function ($http) {

    return {
        getProduct: function (productID) {
            
            return $http.get('/api/products/'+productID).then(function (response) {
                console.log("response: ", response)
                return response.data;
            })
        }
    };

});

app.controller('ProductCtrl', function ($scope, productsInfo) {
    console.log("scope: ", $scope)
    $scope.product=productsInfo;

});