myApp.controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory'
  , function ($scope, $rootScope, $window, $location, UserAuthFactory, AuthenticationFactory) {
        $scope.user = {
            username: 'arvind@myApp.com'
            , password: 'pass123'
        };

        $scope.login = function () {

            var username = $scope.user.username
                , password = $scope.user.password;

            if (username !== undefined && password !== undefined) {
                UserAuthFactory.login(username, password)
                    .then(function (data) {
                        console.log(data);
                        AuthenticationFactory.isLogged = true;
                        AuthenticationFactory.user = data.data.user.username;
                        AuthenticationFactory.userRole = data.data.user.role;

                        $window.sessionStorage.token = data.data.token;

                        $window.sessionStorage.user = data.data.user.username; // to fetch the user details on refresh
                        $window.sessionStorage.userRole = data.data.user.role; // to fetch the user details on refresh

                        $location.path("/");

                    })
                    , function (status) {
                        alert('Oops something went wrong!');
                    };
            } else {
                alert('Invalid credentials');
            }

        };

  }
]);