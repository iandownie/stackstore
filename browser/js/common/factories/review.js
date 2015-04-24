'use strict';

app.factory('ReviewFactory', function ($http) {

	return{
		getReview: function(){
			// Gets all the available category names
			return $http.get('api/reviews').then(function(response){
				return response.data;
			});
		},
		addReview : function(review){
			// Takes in a string and makes a object ready to create a new category
			return $http.post('api/reviews', review).then(function(response){
				return response.data;
			});
		},
		deleteReview : function(reviewID){
			// Deletes category by Id
			return $http.delete('api/reviews/' + reviewID).then(function(response){
				return response.data;
			});
		},
		editReview: function(review){
			// Accepts entire category object with 2 keys.
			return $http.put('api/reviews/' + review._id, review).then(function(response){
				return response.data;
			});
		}
	};
});