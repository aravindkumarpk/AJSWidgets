'use strict';
 
var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i;
        }
        return -1;
    };

angular.module('AJSWidgets').directive('fieldsDirective', function () {

    var getTemplateUrl = function (question) {
         
        var type = 'TEXT';
        var templateUrl = './Views/FormBuilder/directive-templates/field/';
        var supported_fields = [
            'textfield',
            'email',
            'TEXT',
            'CHECK',
            'DATE',
            'COMBO',
            'hidden',
            'password',
            'OPTION'
        ]

        if (__indexOf.call(supported_fields, type) >= 0) {
            return templateUrl += type + '.html';
        }

        //alert(templateUrl);
    }

    var linker = function (scope, element) {
        // GET template content from path
        //var templateUrl = getTemplateUrl(scope.question);
        var templateUrl = './Views/FormBuilder/directive-templates/field/TEXT.html';
        $http.get(templateUrl).success(function (data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    }

        return {
            templateUrl: './Views/FormBuilder/directive-templates/field/TEXT.html',
            restrict: 'E'        
        };
});
