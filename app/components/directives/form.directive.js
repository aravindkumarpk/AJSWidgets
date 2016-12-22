'use strict';

angular.module('AJSWidgets').directive('formsDirective', function () {
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
        templateUrl: function () { return './Views/FormBuilder/directive-templates/form/form.html' },
        restrict: 'E'
        ,
        scope: {
                forms: '='
        }
    };
});
