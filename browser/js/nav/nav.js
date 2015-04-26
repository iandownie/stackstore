app.controller('NavController', function($scope, NavFactory){
	$scope.loader= NavFactory;
})

app.factory("NavFactory",function(){
	
	return {
        loader: true
    };
});