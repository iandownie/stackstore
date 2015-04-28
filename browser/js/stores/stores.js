'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('stores', {
        url: '/stores',
        controller: 'StoresController',
        templateUrl: 'js/stores/stores.html',
    });

    $stateProvider.state('storeFront', {
        url: '/stores/:url',
        controller: 'StoreFrontController',
        templateUrl: 'js/stores/store-front.html',
        resolve: {
            getStoreByUrl: function($stateParams, $state, StoresFactory){
                console.log($stateParams.url);
                return StoresFactory.loadStoreFrontByUrl($stateParams.url).catch(function(err){
                    $state.go('error');
                });
            },
            categoryList: function(CategoryFactory){
                return CategoryFactory.getCategoryList();
            }
        }
    });

});

app.controller('StoresController', function ($state, $scope, StoresFactory) {
    StoresFactory.loadAllStores()
        .then(function (stores){
            $scope.stores = stores;
        })
        .catch(function (err){
        });
});

//app.controller('StoreFrontController', function ($state, $scope, $http, AuthService, StoresFactory, getStoreById, categoryList, CategoryFactory) {

app.controller('StoreFrontController', function ($state, $scope, $http, AuthService, NavFactory, StoresFactory, getStoreByUrl, categoryList, CategoryFactory, experimentalFactory, ProductFactory) {
    $scope.currentStore = getStoreByUrl;

    $scope.categoryList = categoryList;
    //proof of concept of adding categories
    $scope.categoryName = '';
    $scope.currentUser = null;

    $scope.product = {
        name: undefined,
        price: undefined,
        quantity: undefined,
        description: undefined,
        store: undefined,
        categories: undefined,
        images : undefined
    };

    $scope.selectedProduct=$scope.currentStore.products[0];
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    AuthService.getLoggedInUser().then(function (user) {
        $scope.currentUser = user;
        $scope.product.store = user.store;

    });

    $scope.isOwner = function(){
        return StoresFactory.isOwner($scope.currentUser._id, $scope.currentStore.user._id);
    };

    $scope.editProduct=function(data){
        NavFactory.loader=false;
        ProductFactory.editProduct(data).then(function (respeonse){
            $state.go('storeFront', {url: $scope.currentStore.url }, {reload: true});
            NavFactory.loader=true;
        })
    };

    $scope.deleteProduct=function(data){
        NavFactory.loader=false;
        ProductFactory.deleteProduct(data).then(function (response){
            $state.go('storeFront', {url: $scope.currentStore.url }, {reload: true});
           NavFactory.loader=true;
        });
    };

    $scope.newProduct =function(data){
        NavFactory.loader=false;
        StoresFactory.newProduct(data).then(function (response){
            $state.go('storeFront', {url: $scope.currentStore.url }, {reload: true});
           NavFactory.loader=true;
        });
    };

    $scope.loadStoreFront = function(storeUrl, categories){
        NavFactory.loader=false;
        StoresFactory.loadStoreFrontByUrl(storeUrl, categories).then(function(data){
            $scope.currentStore = data;
           NavFactory.loader=true;
        });
    };

    $scope.addCategory = function(category){
        NavFactory.loader=false;
        CategoryFactory.addCategory(category).then(function(data){
            $state.go('storeFront', {url: $scope.currentStore.url }, {reload: true});
           NavFactory.loader=true;
        });
    };
    $scope.customizeStore =function(properties){
        NavFactory.loader=false;
        experimentalFactory.writeAFile(properties).then(function(){
            $state.go('storeFront', {id:$scope.currentStore._id},{reload:true});
        NavFactory.loader=true;
        });
    };
});

app.factory('StoresFactory', function ($http) {
    return {
        loadAllStores: function () {
            return $http.get('/api/stores/')
                .then(function(response){
                    return response.data;
                });
        },
        loadStoreFrontById: function(storeID){
            var config = {
                params : {id : storeID}
            };
            return $http.get('/api/stores', config)
                .then(function(response){
                    return response.data;
                });
        },
        loadStoreFrontByUrl: function(storeUrl, categories){
            console.log("storeUrl: ", storeUrl)
            console.log("categories: ", categories)
            var config = {
                params : {categories: categories}
            };
            return $http.get('/api/stores/' + storeUrl, config)
                .then(function(response){
                    console.log("data: ", response.data)
                    return response.data;
                });
        },
        newProduct: function(data){
            return $http.post('/api/products/', data)
                .then(function(response){
                    return response.data;
                });
        },
        isOwner : function(userID, ownerID){
            return userID === ownerID;
        }
    };
});

app.factory('experimentalFactory', function($http){
    return {
        writeAFile: function(properties){
            return $http.post("/api/experiment/", properties)
            .then(function(response){
                return response.data;
            });
        }
    };
});