'use strict';
app.directive('review', function() {

    return {
        restrict: 'E',
        scope: {
            review : '='
        },
        templateUrl: 'js/review/review.html'
    };

});

app.factory('ReviewFactory', function($http){
    return {
        getReviewByGroup: function(){
            
        },
        getReview: function(){

        }
    };
});