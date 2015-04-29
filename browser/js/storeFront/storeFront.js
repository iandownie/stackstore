app.config(function ($stateProvider) {
    $stateProvider.state('storeFront', {
        url: '/stores/:url',
        controller: 'StoreFrontController',
        templateUrl: 'js/storeFront/store-front.html',
        resolve: {
            getStoreByUrl: function($stateParams, $state, StoresFactory){
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

app.controller('StoreFrontController', function ($state, $scope, $http, AuthService, NavFactory, StoresFactory, getStoreByUrl, categoryList, CategoryFactory, experimentalFactory, ProductFactory, SearchFactory) {
    $scope.currentStore = getStoreByUrl;

    $scope.categoryList = categoryList;
    //proof of concept of adding categories
    $scope.categoryName = '';
    $scope.currentUser = null;
    console.log($scope.categoryList);
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
        if(user){
            $scope.currentUser = user;
            $scope.product.store = user.store;
        }
    });

    $scope.isOwner = function(){
        return StoresFactory.isOwner($scope.currentUser._id, $scope.currentStore.user._id);
    };
    $scope.editProduct=function(data){
        NavFactory.loader=false;
        ProductFactory.editProduct(data).then(function (response){
            $state.go('storeFront', {url: $scope.currentStore.url }, {reload: true});
            NavFactory.loader=true;
        });
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
    $scope.searchStore=function(storeUrl, result){
        NavFactory.loader=false;
        StoresFactory.loadStoreFrontByResult(storeUrl, result).then(function(data){
            console.log("data: ",data);
            $scope.currentStore=data;
            NavFactory.loader=true;
        })

    }
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
    $scope.searchProductByStore = function(query, storeID){
        SearchFactory.searchProductByStore(query, storeID).then(function(data){
            $scope.currentStore.products = data;
        });
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