let app = angular.module("myApp", ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.ejs',
      controller: 'homeController'
    })
    .when('/login', {
      templateUrl: 'pages/login.ejs',
      controller: 'loginController'
    })
    .when('/register', {
      templateUrl: 'pages/register.ejs',
      controller: 'registerController'
    })
    .when('/news', {
      templateUrl: 'pages/news.ejs',
      controller: 'newsController'
    })
    .when('/forum', {
      templateUrl: 'pages/forum.ejs',
      controller: 'forumController'
    })
    .when('/forum/:channel', {
      templateUrl: 'pages/channel.ejs',
      controller: 'channelController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.run(function ($rootScope, $location, $http) {
  // keep user logged in after page refresh
  $rootScope.globals = JSON.parse(localStorage.getItem('globals')) || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token;
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in and trying to access a restricted page
    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
    var loggedIn = $rootScope.globals.currentUser;
    
    // set default redirect to home if not logged in
    if (restrictedPage && !loggedIn) {
        $location.path('/login');
    }
  });
});