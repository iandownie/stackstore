'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('productsList', {
        url: '/products',
        templateUrl: 'js/productsList/productsList.html',
        controller: 'ProductsListCtrl',
        resolve: {
            productsList:function(ProductsListFactory){
                return ProductsListFactory.getAll();
            },
            categoryList: function(CategoryFactory){
                return CategoryFactory.getCategoryList();
            }
        }

    });

});

app.factory('ProductsListFactory', function ($http) {

    return {
        getAll: function () {
            return $http.get('/api/products').then(function (response) {
                return response.data;
            });
        },
        getByCategories: function(categories){
            var config = {
                params : {categories: categories}
            };
            return $http.get('api/products', config).then(function(response) {
                return response.data;
            });
        }

    };

});

app.controller('ProductsListCtrl', function ($state, $scope, NavFactory, productsList, categoryList, CategoryFactory, ProductsListFactory, CartFactory) {
    // Holds all the available categories so that you can filter
    $scope.categoryList = categoryList;
    //Holds productsList
    $scope.productsList = productsList;
    $scope.selectedCategories = null;

    $scope.linkToProduct = function(product){
        NavFactory.loader=false;
        $state.go('products', {id: product});
        NavFactory.loader=true;
    };

    $scope.getByCategories = function(categories){
        NavFactory.loader=false;
        ProductsListFactory.getByCategories(categories).then(function(data){
            $scope.productsList = data;
            NavFactory.loader=true;
        });
    };

    $scope.addToCart = function(product, quant){
        NavFactory.loader=false;
        CartFactory.addToCart(product, quant);
        NavFactory.loader=true;

    };

});