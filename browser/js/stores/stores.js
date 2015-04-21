'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('stores', {
        url: '/stores',
        controller: 'StoresController',
        templateUrl: 'js/stores/stores.html'
    });

    $stateProvider.state('storeFront', {
        url: '/stores/:id',
        controller: 'StoreFrontController',
        templateUrl: 'js/stores/store-front.html',
        resolve: {
            getStoreById: function($stateParams, StoresFactory){
                return StoresFactory.loadStoreFront($stateParams.id)
            }
        }
    });

});

app.controller('StoresController', function ($scope, StoresFactory) {
    StoresFactory.loadAllStores()
        .then(function (stores){
            $scope.stores = stores;
        })
        .catch(function (err){
        });

});

app.controller('StoreFrontController', function ($state, $scope, $http, AuthService, StoresFactory, getStoreById) {
    $scope.store = getStoreById;

    $scope.product = {
        name: "",
        price: null,
        quantity: null,
        description: "",
        store: null
    }

    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
        $scope.product.store = $scope.user.store;

    });
    $scope.newProduct =function(data){
        StoresFactory.newProduct(data).then(function (response){
            $state.go('storeFront', {id: $scope.store._id }, {reload: true})
        })
    }

});

app.factory('StoresFactory', function ($http) {
    return {
        loadAllStores: function () {
            return $http.get('/api/stores/getAllStores')
                .then(function(response){
                    return response.data;
                });
        },
        loadStoreFront: function(id){
            return $http.get('/api/stores/' + id)
                .then(function(response){
                    return response.data
                });
        },
        newProduct: function(data){
            return $http.post('/api/products/', data)
                .then(function(response){
                    return response.data
                })
        }
    };
});