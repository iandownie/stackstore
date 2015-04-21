app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'SignUpController',
        templateUrl: 'js/sign-up/sign-up.html'
    });
});

app.controller('SignUpController', function ($scope) {

});