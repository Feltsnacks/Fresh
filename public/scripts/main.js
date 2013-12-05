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
        url: 'http://localhost:32069/api/lists'
    }).success(function(data){
        $scope.lists = data;
    })
  }
);

app.factory('srvAuth', function(){
return{
watchAuthenticationStatusChange: function() {
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
      /*
       The user is not logged to the app, or into Facebook:
       destroy the session on the server.
      */
    }
  });
  }

getUserInfo: function() {

  var _self = this;

  FB.api('/me', function(response) {

    $rootScope.$apply(function() { 

      $rootScope.user = _self.user = response; 

    });

  });

}

logout: function() {

  var _self = this;

  FB.logout(function(response) {

    $rootScope.$apply(function() { 

      $rootScope.user = _self.user = {}; 

    }); 

  });

}

}
});

app.run(['$rootScope', '$window', 'srvAuth', 
  function($rootScope, $window, sAuth) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({ 

      /* 
       The app id of the web app;
       To register a new app visit Facebook App Dashboard
       ( https://developers.facebook.com/apps/ ) 
      */

      appId: '463519200411932', 

      /* 
       Adding a Channel File improves the performance 
       of the javascript SDK, by addressing issues 
       with cross-domain communication in certain browsers. 
      */

      channelUrl: 'app/channel.html', 

      /* 
       Set if you want to check the authentication status
       at the start up of the app 
      */

      status: true, 

      /* 
       Enable cookies to allow the server to access 
       the session 
      */

      cookie: true, 

      /* Parse XFBML */

      xfbml: true 
    });

    sAuth.watchAuthenticationStatusChange();

  };

  // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

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
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));

}]);