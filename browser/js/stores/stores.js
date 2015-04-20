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
    StoresFactory.loadStore()
        .then(function (store){
            console.log('STORE!!!!', store);
            $scope.store = store[0];
        })
        .catch(function (err){
            console.log('SHIT');
        })

});

app.factory('StoresFactory', function ($http) {

    return {
        loadStore: function () {

            return $http.get('/api/stores/getStores')
                .then(function(response){
                    return response.data;
                })
        }

    }
});