'use strict';

app.factory('SearchFactory', function ($http) {

	return{
		searchProductByStore : function(query, storeID){
			var config = {
				params : query
			};
			return $http.get('/api/search/' + storeID, config).then(function(response){
				console.log(response.data);
				return response.data;
			});
		},
		searchWildCard : function(query){
			var config = {
				params : query
			};
			return $http.get('/api/search', config).then(function(response){
				console.log(response.data);
				return response.data;
			});
		}
	};
});
