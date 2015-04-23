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

app.controller('ProfileController', function ($scope, $state, AuthService, ProfileFactory, StoresFactory, getUserInfo) {
    $scope.store =  getUserInfo.store || {
        name: null,
        logo: null
    };
    console.log(getUserInfo);
    $scope.user = getUserInfo
    
    if($scope.user.store){
        StoresFactory.loadStoreFront($scope.user.store).then(function (store){
            $scope.store = store
        });
    }


    $scope.createStore = function (store){
        ProfileFactory.makeStore(store).then(function(store){
            $scope.store = store;
            $state.go('stores') ;//I'd like to make this go directly to the store just made //
        });
    },
    $scope.editStore = function (store, storeID){
        ProfileFactory.changeStore(store, storeID).then(function(store){
            $scope.store = store;
            $state.go('stores') ;
        })
    }
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
            console.log(store)
            console.log(storeID)
            return $http.put('api/stores/' + storeID, store).then(function(response){
                return response.data;
            });
        }
    };

});