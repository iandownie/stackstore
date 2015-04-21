app.config(function ($stateProvider) {

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileController',
        data: {
            authenticate: true
        }
    });

});

app.controller('ProfileController', function ($scope, AuthService, ProfileFactory) {

    $scope.store = {
        storeName: null,
        logo: null
    };

    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
        $scope.store.userId = $scope.user._id;
    });

    $scope.createStore = function (store){
        ProfileFactory.makeStore(store).then(function(store){
            $scope.store = store;
        })
    }


});

app.factory('ProfileFactory', function ($http) {

    return {

        makeStore: function (store) {
            return $http.post('/api/stores/store', store)
                .then(function(response){
                    return response;
            })
        }

    }

});