var myApp = angular.module('ngclient', ['ngRoute','ngFileUpload','ngAnimate', 'ngSanitize', 'ui.bootstrap','angular-toasty']);

myApp.config(function($routeProvider, $httpProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/question-get', {
      templateUrl: 'partials/question.html',
      controller: 'QuestionCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/exams', {
      templateUrl: 'partials/exams.html',
      controller: 'ExamCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/exam-list', {
      templateUrl: 'partials/examList.html',
      controller: 'ExamListCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/subject-get', {
      templateUrl: 'partials/subjects_category.html',
      controller: 'subjectCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/page2', {
      templateUrl: 'partials/page2.html',
      controller: 'Page2Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/page3', {
      templateUrl: 'partials/page3.html',
      controller: 'Page3Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/create-menu',
     {templateUrl: 'partials/create-menu.html',
      controller: 'MenuCtrl'
    }).when('/orders',
     {templateUrl: 'partials/orders.html',
      controller: 'MenuCtrl'
    }).when('/genpdf',
     {templateUrl: 'partials/invoice.html',
      controller: 'MenuCtrl'
    }).otherwise({
      redirectTo: '/login'
    });
});

myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
      if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.role = AuthenticationFactory.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});
