var app = angular.module('Site', []);

app.factory('srvAuth', ['$rootScope', function($rootScope) {
  return {
    authResponseChange: function() {
      var _self = this;
      FB.Event.subscribe('auth.authResponseChange', function(response) {

        if (response.status === 'connected') {
          _self.getUserInfo();
          /*
           This is also the point where you should create a 
           session for the current user.
           For this purpose you can use the data inside the 
           response.authResponse object.
          */

        } 
        else 
        {
          alert('hello');
          /*
           The user is not logged to the app, or into Facebook:
           destroy the session on the server.
          */
        }
      });
      },

    getUserInfo: function() {

      var _self = this;

      FB.api('/me', function(response) {
        $rootScope.$apply(function() { 
          $rootScope.user = _self.user = response; 
        });
      });
    },

    logout: function() {

      var _self = this;

      FB.logout(function(response) {
        $rootScope.$apply(function() { 
          $rootScope.user = _self.user = {}; 
        }); 
      });
    }
  }
}]);

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
        url: 'http://localhost:32069/api/lists'
    }).success(function(data){
        $scope.lists = data;
    })
  }
);


app.run(['$rootScope', '$window', 'srvAuth', 
  
  function($rootScope, $window, sAuth) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {

    FB.init({ 
      appId: '463519200411932', 
      channelUrl: 'channel.html', 
      status: true, 
      cookie: true, 
      xfbml: true 
    });

    sAuth.authResponseChange();

  };


  (function(d){
    // load the Facebook javascript SDK

    var js, 
    id = 'facebook-jssdk', 
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "http//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));

}]);