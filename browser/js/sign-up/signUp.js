app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'SignUpController',
        templateUrl: 'js/sign-up/sign-up.html'
    });
});

app.controller('SignUpController', function ($state, $scope, NavFactory, SignUpFactory, AuthService, $timeout) {

    $scope.newUser = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined
    };

    $scope.signUp = function (user) {
        NavFactory.loader=false;
        SignUpFactory.registerNewUser(user).then(function(data){
            AuthService.login({email: user.email, password: user.password})
                .then(function(){
                    $state.go('home');
                    NavFactory.loader=false;
                });
        });
    };

});

app.factory('SignUpFactory', function ($http) {

    return {
        registerNewUser: function (user){
            return $http.post('/api/users/user', user).then(function(response){
                return response;
            });
        }

    };

});