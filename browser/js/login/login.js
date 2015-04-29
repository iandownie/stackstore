app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });
    $stateProvider.state('fb', {
        url: '/auth/facebook',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, NavFactory, AuthService, $state, SignUpFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        NavFactory.loader=false;

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
            NavFactory.loader=true;
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
            NavFactory.loader=true;
        });
    };

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