'use strict';
// The following functions are Proof of Concepts
app.config(function ($stateProvider) {

    $stateProvider.state('search', {
        url: '/search',
        templateUrl: 'js/search/search.html',
        controller: 'SearchCtrl'
    });

});

app.controller('SearchCtrl', function ($state, $scope, SearchFactory) {
    // Holds all the available categories so that you can filter
    $scope.results = null;

    $scope.searchWildCard = function(query){
        SearchFactory.searchWildCard(query).then(function(data){
            $scope.results = data;
        });
    };

    $scope.searchProductByStore = function(query, storeID){
        SearchFactory.searchProductByStore(query, storeID).then(function(data){
            $scope.results = data;
        });
    };
});
