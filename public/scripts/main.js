var app = angular.module('Site', [])

app.config(function($routeProvider){
  $routeProvider
    .when('/login', 
    {
      templateUrl: "login.html"
    })
    .when('/listAll', 
    {
      templateUrl: "listAll.html"
    })
    .when('/add', 
    {
      templateUrl: "add.html"
    })

  
});
app.controller("getListCtrl", function ($scope, $http) {
    $http({
        method: 'GET',
        url: 'http://giftr.cloudapp.net:3000/api/lists'
    }).success(function(data){
        $scope.lists = data;
    })
  }
);