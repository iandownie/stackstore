'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, localStorageService) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {


            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Stores', state: 'stores' },
                { label: 'Products', state: 'productsList' },
                { label: 'Profile', state: 'profile', auth: true },
                { label: 'Cart', state: 'cart' }
            ];

            scope.user = null;
            scope.linkToAdmin = function(){
                $state.go("admin");
            };
            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                    //Once the user logsout they shoudl have the order key removed
                    localStorageService.remove('order');
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});