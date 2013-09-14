var Site = angular.module('Site', []);

function bodyController ($scope) {

}
//Inte komplett, vet inte om det funkar heller
Site.config(function ($routeProvider){
	$routeProvider
		.when('/page/:slug', {templateUrl: 'views/LoginView.html', controller:
			'RouteController'})
		.otherwise({redirectTo:'public/index.html'})
});