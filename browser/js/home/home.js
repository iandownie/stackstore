'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            productsList:function(ProductsListFactory){
                return ProductsListFactory.getAll();
            },
            storesList:function(StoresFactory){
                return StoresFactory.loadAllStores();
            }
        }
    });
});
app.controller('HomeCtrl', function ($scope, $state, NavFactory, productsList, storesList) {
    $scope.productsList = productsList;
    $scope.storesList = storesList
});

