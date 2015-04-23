'use strict';

app.factory('CategoryFactory', function ($http) {

	return{
		getCategoryList : function(){
			// Gets all the available category names
			return $http.get('api/category').then(function(response){
				return response.data;
			});
		},
		addCategory : function(category){
			// Takes in a string and makes a object ready to create a new category
			return $http.post('api/category', {name : category}).then(function(response){
				return response.data;
			});
		},
		deleteCategory : function(categoryID){
			// Deletes category by Id
			return $http.delete('api/category/' + categoryID).then(function(response){
				return response.data;
			});
		},
		editCategory : function(category){
			// Accepts entire category object with 2 keys.
			return $http.put('api/category/' + category._id, category).then(function(response){
				return response.data;
			});
		}
	};
});
