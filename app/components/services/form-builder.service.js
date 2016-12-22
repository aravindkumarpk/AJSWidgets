angular.module('AJSWidgets').service('ngFormBuilderService', function ($http, BASEURL_CIONFIG) {
    var baseUrl = BASEURL_CIONFIG.baseUrl;

    this.GetForms = function (searchCol, searchVal) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/API/api/formbuild/GetForms",
            params: {
                searchCol: searchCol,
                searchVal: searchVal,
            }
        });

        return response;
    };   

});
