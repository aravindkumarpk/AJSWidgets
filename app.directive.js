'use strict';

angular.module('AJSWidgetsApp', ['ui.bootstrap', 'velocity.ui', 'ngAnimate', 'ngRoute', 'treasure-overlay-spinner', 'ui.filters']); //, 'colorpicker.module']);

angular.module('AJSWidgetsApp')
    .constant('BASEURL_CIONFIG', {
        baseUrl: 'http://localhost',
        SSOUrl: 'http://localhost/resources'
    });

angular.module('AJSWidgetsApp').run(run);

run.$inject = ['$rootScope'];
function run($rootScope) {
    $rootScope.spinner = {
        active: false,
        on: function () {
            this.active = true;
        },
        off: function () {
            this.active = false;
        }
    };

    $rootScope.globals = {
        currentUser: { username: 'Aravind Kumar', userid: null, rolename: null }
    };
}   

angular.module('AJSWidgetsApp').config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode({
        enabled: true,
    });

    $httpProvider.interceptors.push('responseObserver');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    ////initialize get if not there
    //if (!$httpProvider.defaults.headers.get) {
    //    $httpProvider.defaults.headers.get = {};
    //}

    //// Answer edited to include suggestions from comments
    //// because previous version of code introduced browser-related errors
    //// Enables Request.IsAjaxRequest() in ASP.NET MVC
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //// Disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    ////disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    //// extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';    
}]);


