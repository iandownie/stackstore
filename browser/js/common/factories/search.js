'use strict';

app.factory('SearchFactory', function ($http) {

	return{
		searchProductByStore : function(query, storeID){
			var config = {
				params : {term : query}
			};
			console.log(query,storeID);
			return $http.get('/api/search/' + storeID, config).then(function(response){
				console.log('this is search', response.data);
				return response.data;
			});
		},
		searchWildCard : function(query){
			var config = {
				params : {term : query}
			};
			return $http.get('/api/search', config).then(function(response){
				return response.data;
			});
		}
	};
});
