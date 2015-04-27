'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            productsList:function(ProductsListFactory){
                return ProductsListFactory.getAll();
            }
        }
    });
});
app.controller('HomeCtrl', function ($scope, $state, NavFactory, productsList) {
    $scope.productsList = productsList;

});

