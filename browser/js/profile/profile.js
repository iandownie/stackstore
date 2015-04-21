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

app.controller('ProfileController', function ($scope, AuthService) {

    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });

});

app.factory('ProfileFactory', function ($http) {

    return {

        getUser: function(){
            $http.get('/user', function (err, foundUser){
                console.log('found user in GetUser: ', foundUser)
                return foundUser;
            })
        }

    }

});