'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products/:id',
        templateUrl: 'js/products/products.html',
        controller: 'ProductCtrl',
        resolve: {
            productsInfo:function($stateParams, $state, ProductFactory){
                return ProductFactory.getProduct($stateParams.id).catch(function(err){
                    $state.go('error');
                });
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
        },
        editProduct: function(product){
            return $http.put('api/products/' + product._id, product).then(function(response){
                return response.data;
            });
        },
        deleteProduct: function(productID){
            return $http.delete('api/products/' + productID).then(function(response){
                return response.data;
            });
        }
    };

});

app.controller('ProductCtrl', function ($scope, $state, productsInfo, ProductFactory, CartFactory) {
    $scope.visible=false;

    $scope.quant=1;

    $scope.product = productsInfo;

    $scope.editProduct=function(product){
        ProductFactory.editProduct(product).then(function(){
            $state.go('products', {id:product._id},{reload:true});
        });
    };
    $scope.deleteProduct = function(productID){
        ProductFactory.deleteProduct(productID).then(function(){
            $state.go('stores');
        }).catch(function(err){
            throw new Error(err);
        });
    };

    $scope.addToCart = function(product, quant){
        CartFactory.addToCart(product, quant);
    };
});




