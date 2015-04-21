'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('productsList', {
        url: '/products',
        templateUrl: 'js/productsList/productsList.html',
        controller: 'ProductsListCtrl',
        resolve: {
            productsList:function(ProductsListFactory){
                console.log('what');
                return ProductsListFactory.getAll();
            }
        }

    });

});

app.factory('ProductsListFactory', function ($http) {

    return {
        getAll: function () {
            return $http.get('/api/products/').then(function (response) {
                console.log('hello');
                return response.data;
            });
        }
    };

});

app.controller('ProductsListCtrl', function ($scope, productsList) {
    $scope.productsList = productsList;
});