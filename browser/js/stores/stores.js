'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('stores', {
        url: '/stores',
        controller: 'StoresController',
        templateUrl: 'js/stores/stores.html',
    });
});

app.controller('StoresController', function ($state, $scope, StoresFactory) {
    StoresFactory.loadAllStores()
        .then(function (stores){
            $scope.stores = stores;
        })
        .catch(function (err){
        });
});

app.factory('StoresFactory', function ($http) {
    return {
        loadAllStores: function () {
            return $http.get('/api/stores/')
                .then(function(response){
                    return response.data;
                });
        },
        loadStoreFrontById: function(storeID){
            var config = {
                params : {id : storeID}
            };
            return $http.get('/api/stores', config)
                .then(function(response){
                    return response.data;
                });
        },
        loadStoreFrontByUrl: function(storeUrl, categories){
            var config = {
                params : {categories: categories}
            };
            return $http.get('/api/stores/' + storeUrl, config)
                .then(function(response){
                    //object with two keys shows up
                    response.data.store.products = response.data.products;
                    return response.data.store;
                });
        },
        newProduct: function(data){
            return $http.post('/api/products/', data)
                .then(function(response){
                    return response.data;
                });
        },
        isOwner : function(userID, ownerID){
            return userID === ownerID;
        }
    };
});