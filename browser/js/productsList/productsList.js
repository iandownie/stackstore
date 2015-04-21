'use strict';
app.config(function ($stateProvider) {



    $stateProvider.state('productsList', {
        url: '/products',
        templateUrl: 'js/productsList/productsList.html',
        controller: 'ProductsListCtrl',
        resolve: {
            productsList:function(ProductsListFactory){
                return ProductsListFactory.getAll();
            }
        }

    });

});

app.factory('ProductsListFactory', function ($http) {

    return {
        getAll: function () {
            return $http.get('/api/products/').then(function (response) {
                return response.data;
            });
        }
    };

});

app.controller('ProductsListCtrl', function ($scope, $http, productsList) {
    $scope.productsList = productsList;
    $scope.product={
        name: "",
        price: null,
        quantity: null,
        description: ""
    }

    $scope.newProduct=function(data){
        console.log("data: ", data)
        return $http.post('/api/products/', data).then(function(response){
            console.log(response)
        })
    }
});