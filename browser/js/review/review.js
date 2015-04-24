'use strict';
app.directive('review', function(ReviewFactory, $state) {

    return {
        restrict: 'E',
        scope: {
            review : '='
        },
        controller: function(ReviewFactory){

        },
        templateUrl: 'js/review/review.html',
        link: function(scope, directive, attribute){
            scope.deleteReview = function(){
                ReviewFactory.deleteReview(scope.review._id).then(function(data){
                    $state.go('profile');
                });
            };
        }
    };

});

app.factory('ReviewFactory', function($http){
    return {
        getReviewList: function(query){
            var config = {
                params : query
            };
            return $http.get('/api/reviews', config).then(function(response){
                return response.data;
            });
        },
        getReview: function(reviewID){
            return $http.get('/api/reviews/' + reviewID).then(function(response){
                return response.data;
            });
        },
        createReview: function(review){
            return $http.post('/api/reviews/', review).then(function(response){
                return response.data;
            });
        },
        editReview: function(review){
            return $http.put('/api/reviews/' + review._id, review).then(function(response){
                return response.data;
            });
        },
        deleteReview: function(reviewID){
            return $http.delete('/api/reviews/' + reviewID).then(function(response){
                return response.data;
            });
        }

    };
});