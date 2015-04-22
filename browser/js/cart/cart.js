app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl'
    });

});

app.controller('CartCtrl', function ($scope, AuthService, $state, CartFactory) {

    $scope.cart = {
        products: [],
        user: null,
        shippingAddress: {
            street: null,
            city: null,
            state: null,
            zip: null
        },
        status: null
    };

   $scope.cart.products = CartFactory.getCart();

});