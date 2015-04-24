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

app.controller('ProductCtrl', function ($scope, $state, AuthService, productsInfo, ProductFactory, CartFactory, ReviewFactory, NavFactory) {
    $scope.visible=false;

    $scope.quant=1;

    $scope.product = productsInfo;

    $scope.review = {
        rating : 0,
        title: '',
        description: '',
        user: null
    };

    AuthService.getLoggedInUser().then(function (user) {
        $scope.review.user = user._id;
    });

    $scope.editProduct=function(product){
        NavFactory.loader=false;
        ProductFactory.editProduct(product).then(function(){
            $state.go('products', {id:product._id},{reload:true});
            NavFactory.loader=true;
        });
    };
    $scope.deleteProduct = function(productID){
        NavFactory.loader=false;
        ProductFactory.deleteProduct(productID).then(function(){
            $state.go('stores');
            NavFactory.loader=true;
        }).catch(function(err){
            NavFactory.loader=true;
            throw new Error(err);
        });
    };

    $scope.createReview = function(productID, review){
        review.product = productID;
        console.log(ReviewFactory);
        ReviewFactory.createReview(review).then(function(data){
            console.log('this is new review', data);
        });
    };

    $scope.addCart = function(product, quant){
        NavFactory.loader=false;
        CartFactory.addCart(product, quant);
        NavFactory.loader=true;
    };
});




