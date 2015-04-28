app.config(function ($stateProvider) {

    $stateProvider
        .state('cart', {
            url: '/cart',
            templateUrl: 'js/cart/cart.html',
            controller: 'CartCtrl',
            resolve : {
                cartInfo : function(CartFactory){
                    return CartFactory.getCart();
                }
            }
        })
        .state('cart.cartView', {
            templateUrl: 'js/cart/cart-view.html'
        })
        .state('cart.userOrGuest', {
            templateUrl: 'js/cart/user-or-guest.html'
        })
        .state('cart.addressInfo', {
            templateUrl: 'js/cart/address-info.html'
        })
        .state('cart.finalizeOrder', {
            templateUrl: 'js/cart/finalize-order.html'
        })
        .state('cart.orderComplete', {
            templateUrl: 'js/cart/order-complete.html'
        })
});

app.controller('CartCtrl', function ($scope, localStorageService, $window, NavFactory, AuthService, $state, CartFactory, cartInfo) {

    $scope.newQuantity = null;

    $scope.cart = {
        id: localStorageService.get('order'),
        products: cartInfo,
        user: null,
        total: 0,
        shippingAddress: {
            firstName: null,
            lastName: null,
            street: null,
            street2: null,
            city: null,
            state: null,
            zip: null
        },
        billingAddress: {
            firstName: null,
            lastName: null,
            street: null,
            street2: null,
            city: null,
            state: null,
            zip: null
        }
    };

    AuthService.getLoggedInUser().then(function (user) {
        if(user) $scope.cart.user = user._id;
    });

    $scope.sameBilling = function(){
        if ($scope.billingIsSame) {
            $scope.billingIsSame = false;
            $scope.cart.billingAddress = $scope.cart.shippingAddress;
        } else {
            $scope.billingIsSame = true;
        }
    };

    $scope.showModifyOptions = function () {
        if ($scope.showModify) {
            $scope.showModify = false;
            $scope.showUpdate = false;
        } else {
            $scope.showModify = true;
        }
    };


    $scope.showUpdateField = function () {
        if ($scope.showUpdate) $scope.showUpdate = false;
        else $scope.showUpdate = true;
    };

    $scope.updateQuantity = function (id, quantity){
        CartFactory.updateQuantity(id, quantity).then( function(response){
            // $window.location.reload();
            $state.go($state.current, {}, {reload: true});
        });
    };

    $scope.removeFromCart = function(lineItemID){
        CartFactory.removeFromCart(lineItemID).then( function(){
            angular.element('#'+lineItemID).remove(); //remove elem from DOM
        });
    };

   $scope.submitOrder = function(newOrder){
    NavFactory.loader=false;
        CartFactory.submitOrder(newOrder).then(function(data){
            $window.location.reload();
            //$state.go('orders', {id: data._id});
            NavFactory.loader=true;
        }).catch(function(err){
            $state.go('error');
        });
   };

});