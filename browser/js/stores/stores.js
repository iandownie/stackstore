'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('stores', {
        url: '/stores',
        controller: 'StoresController',
        templateUrl: 'js/stores/stores.html'
    });

});

app.controller('StoresController', function ($scope, StoresFactory) {
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
        }

    };
});