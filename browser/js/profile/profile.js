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
                        console.log(user);
                    return user;
                });
            }
        }
    });

});

app.controller('ProfileController', function ($scope, $state, NavFactory, AuthService, ProfileFactory, StoresFactory, getUserInfo) {
    $scope.user = getUserInfo;

    $scope.store =  getUserInfo.store || {
        name: undefined,
        url: undefined,
        logo: undefined,
        user: $scope.user._id
    };

    $scope.createStore = function (store){
        NavFactory.loader=false;
        ProfileFactory.createStore(store).then(function(store){
            // $state.go('storeFront', {url : store.url});//I'd like to make this go directly to the store just made //
            NavFactory.loader=true;
        });
    };

    $scope.editStore = function (store, storeID){
        console.log(' i am here');
        NavFactory.loader=false;
        ProfileFactory.editStore(store, storeID).then(function(store){
            $state.go('storeFront', {url : store.url});
            NavFactory.loader=true;
        });
    };

    $scope.deleteStore = function(storeID){
        ProfileFactory.deleteStore(storeID).then(function(store){
            $state.go('profile', undefined ,{reload : true});
        });
    };
});

app.factory('ProfileFactory', function ($http) {

    return {
        createStore: function (store) {
            return $http.post('/api/stores', store).then(function(response){
                    return response.data;
            });
        },
        editStore: function(store, storeID){
            return $http.put('api/stores/' + storeID, store).then(function(response){
                return response.data;
            });
        },
        deleteStore: function(storeID){
            return $http.delete('api/stores/' + storeID).then(function(response){
                return response.data;
            });
        }
    };

});