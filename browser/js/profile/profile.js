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

app.controller('ProfileController', function ($scope, $state, AuthService, ProfileFactory, StoresFactory) {
    $scope.store = {
        name: null,
        logo: null
    };


    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
        if(user.store){
        console.log(user);
            // if the user has a store, put it scope.
            StoresFactory.loadStoreFront(user.store).then(function (store){
            //this loads the users entire object, including hashed passwords salts etc.
            //not ideal -- check store schema and populate user at line 35
                $scope.store = store;
            });
        
        } else {
            // if not, prepare store creation to contain this users id
            $scope.store.user = $scope.user._id;
        }

    });

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