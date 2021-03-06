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
            templateUrl: 'js/cart/user-or-guest.html',
            controller: 'LoginCtrl'
        })
        .state('cart.addressInfo', {
            templateUrl: 'js/cart/address-info.html'
        })
        .state('cart.finalizeOrder', {
            templateUrl: 'js/cart/finalize-order.html'
        })
        .state('cart.orderComplete', {
            templateUrl: 'js/cart/order-complete.html'
        });
});

app.controller('CartCtrl', function ($scope, localStorageService, $window, NavFactory, AuthService, $state, CartFactory, cartInfo) {

    $scope.newQuantity = null;

    $scope.cart = {
        _id: localStorageService.get('order'),
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

    $scope.calcTotalPrice = function (){
        $scope.cart.total = 0;
        $scope.cart.products.forEach(function (item){
            $scope.cart.total +=  item.product.price * item.quantity;
        });
    };

    $scope.calcTotalPrice();

    AuthService.getLoggedInUser().then(function (user) {
        if(user) {
            $scope.user = user;
            $scope.cart.user = user._id;
        }
    });

    $scope.sameBilling = function(){
        if ($scope.billingIsSame) {
            $scope.cart.billingAddress = $scope.cart.shippingAddress;
            $scope.billingIsSame = false;
            $scope.setActive = true;
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
        CartFactory.updateQuantity(id, quantity).then( function(cart){
            $scope.cart.products = cart;
            $scope.showModifyOptions();
        });
    };

    $scope.removeFromCart = function(lineItemID){
        CartFactory.removeFromCart(lineItemID).then( function(newCart){
            $scope.cart.products = newCart;
            $scope.calcTotalPrice();
        });
    };

   $scope.submitOrder = function(newOrder){
        NavFactory.loader=false;
        //update order to processing
        newOrder.status = 'Processing';
        //alerts server to update order from Created to Processing
        CartFactory.submitOrder(newOrder).then(function(data){
            $scope.orderId = data._id;
            $state.go('cart.orderComplete');
            NavFactory.loader=true;
        }).catch(function(err){
            $state.go('error');
        });
    };

    $scope.checkout = function (user) {
        if (user) $state.go('cart.addressInfo');
        else $state.go('cart.userOrGuest');
    };
});