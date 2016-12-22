'use strict';

angular.module('AJSWidgets', ['ui.bootstrap', 'velocity.ui', 'ngAnimate', 'ngRoute', 'treasure-overlay-spinner', 'ui.filters']); //, 'colorpicker.module']);


angular.module('SFSiteVisitApp')
    .constant('BASEURL_CIONFIG', {
        baseUrl: 'http://localhost',
        SSOUrl: 'http://qc.opt-osfns.org/osss/resources'
    });

angular.module('SFSiteVisitApp').run(run);

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

angular.module('SFSiteVisitApp').directive('formsDirective', function () {
    return {
        controller: function ($scope) {
            $scope.submit = function () {
                alert('Form submitted..');
                $scope.forms.submitted = true;
            }

            $scope.cancel = function () {
                alert('Form canceled..');
            }
        },
        templateUrl: './Views/inspection/directive-templates/form/form.html',
        restrict: 'E'
        //,
        //scope: {
        //        forms: '='
        //}
    };
});


angular.module('SFSiteVisitApp').config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode({
        enabled: true,
    });

    $httpProvider.interceptors.push('responseObserver');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  

    //$routeProvider
    //   .when('/', {
    //       templateUrl: 'views/FormBuilder/main.html',
    //       controller: 'MainCtrl'
    //   })
    //   .when('/forms/create', {
    //       templateUrl: 'views/FormBuilder/create.html',
    //       controller: 'CreateCtrl'
    //   })
    //   .when('/forms/:id/view', {
    //       templateUrl: 'views/FormBuilder/view.html',
    //       controller: 'ViewCtrl'
    //   })
    //   .otherwise({
    //       redirectTo: '/'
    //   });
}]);



