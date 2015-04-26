app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/',
        templateUrl: 'js/admin/admin.html',
        controller: "AdminController"
    });
});

app.controller('AdminController', function ($state, $scope, NavFactory, AdminFactory) {
	
	$scope.users = null;
	
	AdminFactory.getAllUsers()
		.then(function(users){
			$scope.users = users
		});

	$scope.deleteUser = function (user){
		NavFactory.loader=false;
		AdminFactory.deleteUser(user)
			.then(function(user){
				$state.go($state.current, {}, {reload:true});
				NavFactory.loader=true;
			});
	}

	$scope.promoteUser = function (user){
		NavFactory.loader=false;
		AdminFactory.promoteUser(user)
			.then(function(user){
				console.log('Promoted user ', user);
				NavFactory.loader=true;
			});
	}

});

app.factory('AdminFactory', function ($http, $state) {
	return {

		getAllUsers: function(){

			return $http.get("/api/admin/")
				.then(function(users) {
					return users.data;
				});
		},

		deleteUser: function(user){
			console.log('USER!', user)
			return $http.delete('/api/admin/' + user._id)
				.then(function(user){
					return user;
				})
		},

		promoteUser: function(user){
			return $http.put('/api/admin/', user)
				.then(function(user){
					return user;
				})
		}
	}
});