'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('stores', {
        url: '/stores',
        controller: 'StoresController',
        templateUrl: 'js/stores/stores.html'
    });
    $stateProvider.state('storeFront', {
        url: '/stores/:id',
        controller: 'StoresController',
        templateUrl: 'js/stores/store-front.html',
        resolve: {
            getStoreById: function($stateParams, StoresFactory){
                return StoresFactory.loadStoreFront($stateParams.id)
            }
        }
    });

});

app.controller('StoresController', function ($scope, StoresFactory, getStoreById) {
    $scope.store = getStoreById;
    StoresFactory.loadAllStores()
        .then(function (stores){
            console.log('STORES!!!!', stores);
            $scope.stores = stores;
        })
        .catch(function (err){
            console.log('SHIT');
        });

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
        }
    };
});