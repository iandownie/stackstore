'use strict';

app.factory('SearchFactory', function ($http) {

	return{
		searchProductByStore : function(query, storeID){
			var config = {
				params : {term : query}
			};
			return $http.get('/api/search/' + storeID, config).then(function(response){
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
