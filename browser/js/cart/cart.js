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

app.controller('CartCtrl', function ($scope, $window, NavFactory, AuthService, $state, CartFactory, lineItemsInfo) {

    $scope.newQuantity = null;

    $scope.cart = {
        products: lineItemsInfo,
        user: null,
        total: 0,
        shippingAddress: {
            street: null,
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
            $window.location.reload()
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
            $state.go('orders', {id: data._id});
            NavFactory.loader=true;
        }).catch(function(err){
            console.log(err);
        });
   };

});