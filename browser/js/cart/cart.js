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
        }
    };

    AuthService.getLoggedInUser().then(function (user) {
        $scope.cart.user = user._id;
    });

   $scope.cart.products = CartFactory.getCart();

   $scope.submitOrder = function(newOrder){
        CartFactory.submitOrder(newOrder).then(function(data){
            console.log(data);
        }).catch(function(err){
            console.log(err);
        });
   };

});