'use strict';

angular.module('AJSWidgetsApp', ['ui.bootstrap', 'velocity.ui', 'ngAnimate', 'ngRoute', 'treasure-overlay-spinner', 'ui.filters']); //, 'colorpicker.module']);

angular.module('AJSWidgetsApp')
    .constant('BASEURL_CIONFIG', {
        baseUrl: 'http://localhost',
        SSOUrl: 'http://qc.opt-osfns.org/osss/resources'
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

angular.module('AJSWidgetsApp').directive('formsDirective', function () {
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

// coffeescript's for in loop
var __indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

angular.module('AJSWidgetsApp').directive('fieldsDirective', ['$http', '$compile', '$timeout', function ($http, $compile, $timeout) {
    var getTemplateUrl = function (field) {
        var type = field.obj_type;
        var templateUrl = './Views/inspection/directive-templates/field/';
        var supported_fields = ['text','checkbox','date','combo','option','label']
        if (__indexOf.call(supported_fields, type) >= 0) {
            return templateUrl += type + '.html';
        }
    }

    var linker = function (scope, element, attrs, ctrl) {
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
        //var templateUrl = './Views/FormBuilder/directive-templates/field/TEXT.html';
        $http.get(templateUrl).success(function (data) {
            element.html(data);
            $compile(element.contents())(scope);
        });

        scope.setValue = function(item){
            ctrl.$setViewValue(item); // this line will automatically eval your ng-change
        };

        scope.optionChangeItem = function (index, field, cascope) {
            alert('Test');
            alert(field.given_answer_id);
            $scope.calccAlist_item.ca_policy_text = "Test";

            alert(cascope[0].ca_statement_text);
            //if (field.given_answer_id === )



            angular.forEach(cascope, function (item) {
                alert(item.ca_answer_id);
                if (item.ca_answer_id === field.given_answer_id)
                {
                    alert('Selected answer is :' + field.given_answer_id);
                    item.ca_policy_text = 'Selected answer is :' + field.given_answer_id;
                }
                    

            });

            
        };

       // var context = element[0];
        //var availableFormElements = 'input,select, textarea';
        //var allFormElements = context.querySelectorAll(availableFormElements);
       // $timeout(function () {
            //allFormElements = context.querySelectorAll(availableFormElements);
            // Will include all elements, also from ng-repeat loop
            //console.log(allFormElements);
        //}, 500);
    }


    return {
        template: '<div ng-bind="field"></div>',
        //templateUrl: './Views/FormBuilder/directive-templates/field/TEXT.html',
        restrict: 'AE',
        scope: {
            field: '=',
            cascope: '='
        },
        link: linker
    };
}]);

angular.module('AJSWidgetsApp').config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode({
        enabled: true,
    });

    //$httpProvider.interceptors.push('responseObserver');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    ////initialize get if not there
    //if (!$httpProvider.defaults.headers.get) {
    //    $httpProvider.defaults.headers.get = {};
    //}

    //// Answer edited to include suggestions from comments
    //// because previous version of code introduced browser-related errors
    //// Enables Request.IsAjaxRequest() in ASP.NET MVC
    //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //// Disable IE ajax request caching
    //$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    ////disable IE ajax request caching
    //$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    //// extra
    //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    //$routeProvider.otherwise({ redirectTo: '/projectsinfo' });

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

//angularApp.config(function ($routeProvider) {

//    $routeProvider
//        .when('/', {
//            templateUrl: 'views/FormBuilder/main.html',
//            controller: 'MainCtrl'
//        })
//        .when('/forms/create', {
//            templateUrl: 'views/FormBuilder/create.html',
//            controller: 'CreateCtrl'
//        })
//        .when('/forms/:id/view', {
//            templateUrl: 'views/FormBuilder/view.html',
//            controller: 'ViewCtrl'
//        })
//        .otherwise({
//            redirectTo: '/'
//        });

//}).run(['$rootScope',  function() {}]);

//angular.module('AJSWidgetsApp').run(['security', function (security) {
//    // Get the current user when the application starts
//    // (in case they are still logged in from a previous session)
//    alert("Current Logged In user: " + security.requestCurrentUser());
    
//}]);

//angular.module('AJSWidgetsApp').config(['$httpProvider', function ($httpProvider) {
//    //initialize get if not there
//    if (!$httpProvider.defaults.headers.get) {
//        $httpProvider.defaults.headers.get = {};
//    }

//    // Answer edited to include suggestions from comments
//    // because previous version of code introduced browser-related errors
//    // Enables Request.IsAjaxRequest() in ASP.NET MVC
//    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
//    // Disable IE ajax request caching
//    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
//    //disable IE ajax request caching
//    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
//    // extra
//    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
//    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
//}]);
