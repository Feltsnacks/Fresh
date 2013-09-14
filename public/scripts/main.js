var myapp = angular.module('myapp', []);
myapp.factory('Data', function() {
	return {message:"Im data from a service"}
});

function FirstCtrl($scope, Data)
{
	$scope.data = Data;
}

function SecondCtrl($scope, Data)
{
	$scope.data = Data;
}