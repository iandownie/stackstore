app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/',
        templateUrl: 'js/admin/admin.html',
        controller: "AdminController"
    });
});

app.controller('AdminController', function ($scope, AdminFactory) {
	$scope.users = null;
	AdminFactory.getAllUsers().then(function(users){
		$scope.users = users
	});
});

app.factory('AdminFactory', function ($http) {
	return {
		getAllUsers: function(){
			return $http.get("/api/admin/")
			.then(function(users) {
				return users.data;
			});
		}
	}
});