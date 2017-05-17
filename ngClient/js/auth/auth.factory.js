myApp.factory('AuthenticationFactory', function ($window) {
    var auth = {
        isLogged: false
        , check: function () {
            if ($window.sessionStorage.token && $window.sessionStorage.user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    }

    return auth;
});


myApp.factory('UserAuthFactory', function ($window, $location, $http, AuthenticationFactory) {
    return {
        login: function (username, password) {
            return $http.post('http://localhost:3000/login', {
                username: username
                , password: password
            });


            // return $http({
            //     method: 'POST',
            //     url: 'http://localhost:3000/login',
            //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            //     transformRequest: function(obj) {
            //         var str = [];
            //         for(var p in obj)
            //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //         return str.join("&");
            //     },
            //     data: {username: username, password:password}
            // });

        }
        , logout: function () {

            if (AuthenticationFactory.isLogged) {

                AuthenticationFactory.isLogged = false;
                delete AuthenticationFactory.user;
                delete AuthenticationFactory.userRole;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;

                $location.path("/login");
            }

        }
    }
});

myApp.factory('MenuFactory', function ($window, $location, $http, AuthenticationFactory) {
    return {
        create: function (menu) {
            return $http.post('http://localhost:3000/api/v1/menu', JSON.stringify(menu));
        }
        , getAllmenu: function () {
            return $http.get('http://localhost:3000/api/v1/menu');
        }


    }
});

myApp.factory('TokenInterceptor', function ($q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-Key'] = $window.sessionStorage.user;
                config.headers['Content-Type'] = "application/json";
            }
            return config || $q.when(config);
        },

        response: function (response) {
            return response || $q.when(response);
        }
    };
});