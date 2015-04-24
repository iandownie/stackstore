app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, NavFactory, AuthService, $state) {

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

});