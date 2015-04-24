'use strict';
// The following functions are Proof of Concepts
app.config(function ($stateProvider) {

    $stateProvider.state('reviewList', {
        url: '/review',
        templateUrl: 'js/review/reviewListTest.html',
        controller: 'reviewListTestCtrl',
        resolve: {
            reviewList:function(ReviewFactory){
                return ReviewFactory.getReviewList();
            }
        }

    });

});

app.controller('reviewListTestCtrl', function ($state, $scope, reviewList, ReviewFactory) {
    // Holds all the available categories so that you can filter
    $scope.reviewList = reviewList;
    $scope.getUser = function(userID){
        ReviewFactory.getReviewList({user : userID}).then(function(data){
            $scope.reviewList = data;
        });
    };

    $scope.getProduct = function(productID){
        ReviewFactory.getReviewList({product : productID}).then(function(data){
            $scope.reviewList = data;
        });
    };
});

app.config(function ($stateProvider) {

    $stateProvider.state('review', {
        url: '/review/:id',
        templateUrl: 'js/review/oneReviewTest.html',
        controller: 'reviewCtrl',
        resolve: {
            review:function(ReviewFactory, $stateParams, $state){
                return ReviewFactory.getReview($stateParams.id).catch(function(err){
                    $state.go('error');
                });
            }
        }

    });

});

app.controller('reviewCtrl', function ($state, $scope, review, ReviewFactory) {
    // Holds all the available categories so that you can filter
    $scope.review = review;
});
