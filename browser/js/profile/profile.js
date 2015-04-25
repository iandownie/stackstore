app.config(function ($stateProvider) {

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileController',
        data: {
            authenticate: true
        },
        resolve: {
            getUserInfo: function(AuthService){
                return AuthService.getLoggedInUser()
                    .then(function (user) {
                    return user;
                });
            }
        }
    });

});

app.controller('ProfileController', function ($scope, $state, NavFactory, AuthService, ProfileFactory, StoresFactory, getUserInfo) {
    $scope.user = getUserInfo;
    $scope.store =  getUserInfo.store || {
        name: null,
        logo: null,
        user: $scope.user._id
    };
    
    if($scope.user.store){
        StoresFactory.loadStoreFrontById($scope.user.store).then(function (store){
            $scope.store = store;
        });
    }
    $scope.createStore = function (store){
        NavFactory.loader=false;
        ProfileFactory.makeStore(store).then(function(store){
            $scope.store = store;
            $state.go('stores') ;//I'd like to make this go directly to the store just made //
            NavFactory.loader=true;
        });
    },
    $scope.editStore = function (store, storeID){
        NavFactory.loader=false;
        ProfileFactory.changeStore(store, storeID).then(function(store){
            $scope.store = store;
            $state.go('stores');
            NavFactory.loader=true;
        });
    };
});

app.factory('ProfileFactory', function ($http) {

    return {
        makeStore: function (store) {
            return $http.post('/api/stores/', store)
                .then(function(response){
                    return response;
            });
        },
        changeStore: function(store, storeID){
            return $http.put('api/stores/' + storeID, store).then(function(response){
                return response.data;
            });
        }
    };

});