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
            $scope.store = store;
        })
        .catch()

});

app.factory('StoresFactory', function ($scope) {

    return {
        loadStore: function () {
            return $http.get('/stores')
                .then(function(response){
                    return response.data;
                })
        }

    }
});