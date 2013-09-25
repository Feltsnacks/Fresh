$routeProvider {
	.when('/', {
    	templateUrl: 'views/index.html',
    	//controller: 'IndexCtrl'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        //controller: 'LoginCtrl'
    })
    .otherwise({ redirectTo: '/' });;
}