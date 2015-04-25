'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('stores', {
        url: '/stores',
        controller: 'StoresController',
        templateUrl: 'js/stores/stores.html'
    });

    $stateProvider.state('storeFront', {
        url: '/stores/:id',
        controller: 'StoreFrontController',
        templateUrl: 'js/stores/store-front.html',
        resolve: {
            getStoreById: function($stateParams, $state, StoresFactory){
                console.log("Ran the resolve of state")
                return StoresFactory.loadStoreFront($stateParams.id).catch(function(err){
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
        $scope.goToStore = function(link){
            $state.go("storeFront", {id: link});
        };

});

//app.controller('StoreFrontController', function ($state, $scope, $http, AuthService, StoresFactory, getStoreById, categoryList, CategoryFactory) {
app.controller('StoreFrontController', function ($state, $scope, $http, AuthService, NavFactory, StoresFactory, getStoreById, categoryList, CategoryFactory, experimentalFactory) {
    $scope.currentStore = getStoreById;
    $scope.categoryList = categoryList;
    //proof of concept of adding categories
    $scope.categoryName = '';

    $scope.product = {
        name: "",
        price: null,
        quantity: null,
        description: "",
        store: null,
        categories: null,
        images : null
    };

    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    AuthService.getLoggedInUser().then(function (user) {
        $scope.currentUser = user;
        $scope.product.store = user.store;
    });

    $scope.newProduct =function(data){
        NavFactory.loader=false;

        StoresFactory.newProduct(data).then(function (response){
            $state.go('storeFront', {id: $scope.currentStore._id }, {reload: true});
           NavFactory.loader=true;
        });
    };

    $scope.loadStoreFront = function(storeID, categories){
        NavFactory.loader=false;
        StoresFactory.loadStoreFront(storeID, categories).then(function(data){
            $scope.currentStore = data;
           NavFactory.loader=true;
        });
    };

    $scope.addCategory = function(category){
        NavFactory.loader=false;
        CategoryFactory.addCategory(category).then(function(data){
            $state.go('storeFront', {id: $scope.currentStore._id }, {reload: true});
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
        loadStoreFront: function(storeID, categories){
            var config = {
                params : {categories: categories}
            };
            return $http.get('/api/stores/' + storeID, config)
                .then(function(response){
                    return response.data;
                });
        },
        newProduct: function(data){
            return $http.post('/api/products/', data)
                .then(function(response){
                    return response.data;
                });
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