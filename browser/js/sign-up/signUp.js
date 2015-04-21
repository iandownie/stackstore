app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'SignUpController',
        templateUrl: 'js/sign-up/sign-up.html'
    });
});

app.controller('SignUpController', function ($state, $scope, SignUpFactory, AuthService) {

    $scope.newUser = {
        firstName: null,
        lastName: null,
        email: null,
        password: null
    };

    $scope.signUp = function (user) {
        SignUpFactory.registerNewUser(user).then(function(data){
            AuthService.login({email: user.email, password: user.password})
                .then(function(){
                    $state.go('home');
                })
        })
    }

});

app.factory('SignUpFactory', function ($http) {

    return {

        registerNewUser: function (user){
            return $http.post('/api/users/user', user).then(function(response){
                return response;
            });
        }

    }

});