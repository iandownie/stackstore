app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve : {
            lineItemsInfo : function(CartFactory){
                return CartFactory.getCart();
            }
        }
    });

});

app.controller('CartCtrl', function ($scope, localStorageService, $window, NavFactory, AuthService, $state, CartFactory, lineItemsInfo) {

    $scope.newQuantity = null;

    $scope.cart = {
        id: localStorageService.get('order'),
        products: lineItemsInfo,
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
        if(user){
            $scope.cart.user = user._id;
        }
    });

    $scope.sameBilling = function(){
        if ($scope.billingIsSame) {
            $scope.billingIsSame = false;
            $scope.cart.billingAddress = $scope.cart.shippingAddress;
            console.log('BILLING ADDRESS:', $scope.cart.billingAddress)
        }
        else $scope.billingIsSame = true;
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
            console.log('UPDATED.', response)
            $window.location.reload();
            //$state.go($state.current, {}, {reload: true});
        });
    };

    $scope.removeLineItem = function(lineItemId){
        CartFactory.removeLineItem(lineItemId).then( function(){
            angular.element('#'+lineItemId).remove(); //remove elem from DOM
        });
    };

   $scope.submitOrder = function(newOrder){
    NavFactory.loader=false;
        CartFactory.submitOrder(newOrder).then(function(data){
            $window.location.reload();
            //$state.go('orders', {id: data._id});
            NavFactory.loader=true;
        }).catch(function(err){
            console.log(err);
        });
   };

});