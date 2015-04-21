app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'SignUpController',
        templateUrl: 'js/sign-up/sign-up.html'
    });
});

app.controller('SignUpController', function ($scope, SignUpFactory) {

    $scope.newUser = {
        firstName: null,
        lastName: null,
        email: null,
        password: null
    };

    $scope.signUp = function (user) {
        SignUpFactory.registerNewUser(user).then(function(data){
            console.log('User created', data);
        })
    }

});

app.factory('SignUpFactory', function ($http) {

    return {

        registerNewUser: function (user){
            return $http.post('/api/users/user', user).then(function(response){
                console.log('made it to the signUpFactory', response)
                return response;
            });
        }

    }

});