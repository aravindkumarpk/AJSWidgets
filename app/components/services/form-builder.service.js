angular.module('SFSiteVisitApp').service('ngFormBuilderService', function ($http, BASEURL_CIONFIG) {
    var baseUrl = BASEURL_CIONFIG.baseUrl;

    this.GetForms = function (searchCol, searchVal) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetForms",
            params: {
                searchCol: searchCol,
                searchVal: searchVal,
            }
        });

        return response;
    };

    this.GetFormSectionDetails = function (formID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormSectionDetails",
            params: {
                formID: formID,
            }
        });

        return response;
    };

    this.GetQuestionsDetails = function (searchCol, searchVal, formID, sectionID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetQuestionsDetails",
            params: {
                searchCol: searchCol,
                searchVal: searchVal,
                formID: formID,
                sectionID: sectionID,
            }
        });

        return response;
    };

    this.GetCalcTypes = function () {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetCalcTypes",
            params: {
                
            }
        });

        return response;
    };

    this.GetFormRoles = function () {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormRoles",
            params: {

            }
        });

        return response;
    };
    /*******************Calculated Field Details********************************/
 
    /*Calculated Add*/
    this.UpdateFormDetailCalc = function (sectionId, qId, qIDs, user) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/UpdateFormDetailCalc",
            params: {
                sectionId: sectionId,
                qId: qId,
                qIDs: qIDs,
                user: user,
            }
        });
        return response;
    };

    this.GetFormDetailCalc = function (sectionID,qID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormDetailCalc",
            params: {
                sectionID: sectionID,
                qID: qID,
            }
        });
        return response;
    };

    /**CASE Calculated*/
    this.UpdateFormDetailCase = function (sectionID, qId, details, caseType, user) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/UpdateFormDetailCase",
            params: {
                sectionID: sectionID,
                qId: qId,
                details: details,
                caseType: caseType,
                user: user,
            }
        });
        return response;
    };

    this.GetFormDetailCase = function (sectionID, qID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormDetailCase",
            params: {
                sectionID: sectionID,
                qID: qID,
            }
        });
        return response;
    };

    this.GetOperators = function (searchCol, searchVal) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetOperators",
            params: {
                searchCol: searchCol,
                searchVal: searchVal,
            }
        });
        return response;
    };

    /**Repetion / SUB Calculated*/
    /**CALC IF Calculated*/
    this.UpdateFormDetailIf = function (sectionID, qId, details, user) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/UpdateFormDetailIf",
            params: {
                sectionID: sectionID,
                qId: qId,
                details: details,
                user: user,
            }
        });
        return response;
    };

    this.GetFormDetailIf = function (sectionID, qID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormDetailIf",
            params: {
                sectionID: sectionID,
                qID: qID,
            }
        });
        return response;
    };


    /*Corrective Action*/
    this.AddFormDetailCA = function (sectionID, parentID, cAData, user) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/AddFormDetailCA",
            params: {
                sectionID: sectionID,
                parentID: parentID,
                cAData: cAData,
                user: user,
            }
        });
        return response;
    };

    this.GetFormDetail = function (sectionID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormDetail",
            params: {
                sectionID: sectionID,
            }
        });
        return response;
    };

    /*Corrective Action*/
    this.AddFormDetail = function (GetParamsFormDetail) {
        delete $http.defaults.headers.common['X-Requested-With'];
        var response = null;

        //response = $http({
        //    method: "GET",
        //    url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/AddFormDetail",
        //    headers: { 'Content-Type': 'application/json' },
        //    params: {
        //        sectionID: sectionID,
        //        sectionJSON: sectionJSON,
        //        user: user,
        //    }
        //});
       
        //var data = {
        //    sectionID: sectionID,
        //    sectionJSON: sectionJSON,
        //    user: user,
        //};

        //$http.post(
        //        baseUrl + '/SFSiteVisitsAPI/api/formbuild/AddFormDetail',
        //        $httpParamSerializer(data),
        //        {
        //            headers: {
        //                'Content-Type': 'application/json'
        //            }
        //        }
        //    ).success(function (data) {
        //        response = data;
        //    });

        response = $http({
            url: baseUrl + '/SFSiteVisitsAPI/api/formbuild/AddFormDetail',
            dataType: 'json',
            method: 'POST',
            data: GetParamsFormDetail,
            //type: 'application/json',           
            //params: {
            //    sectionID: sectionID,
            //    sectionJSON: sectionJSON,
            //    user: user,
            //},
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        });
       
        return response;
    };

    this.GetFormDetailCA = function (sectionID, qID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormDetailCA",
            params: {
                sectionID: sectionID,
                qID: qID,
            }
        });
        return response;
    };

    this.GetAnswers = function (qID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetAnswers",
            params: {
                qID: qID,
            }
        });
        return response;
    };

    /*Group Form Access*/
    this.GetFormDetailAccess = function (sectionID, qID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormDetailAccess",
            params: {
                sectionID: sectionID,
                qID: qID,
            }
        });
        return response;
    };

    this.UpdateFormDetailAccess = function (sectionID, qID, accessDetail, user) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/UpdateFormDetailAccess",
            params: {
                sectionID: sectionID,
                qID: qID,
                accessDetail: accessDetail,
                user: user,
            }
        });
        return response;
    };

    /*Form LayOut*/
    this.GetFormLayout = function (formID, sectionID) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetFormLayout",
            params: {
                formID: formID,
                sectionID: sectionID,
            }
        });
        return response;
    };


    /*Document LayOut*/
    this.GetDocLayout = function (formID, docID, sectionID, groupID, showAnswers) {
        var response = $http({
            method: "GET",
            url: baseUrl + "/SFSiteVisitsAPI/api/formbuild/GetDocLayoutData",
            params: {
                formID: formID,
                docID: docID,
                sectionID: sectionID,
                groupID: groupID,
                showAnswers: showAnswers
            }
        });
        return response;
    };

    var formsJsonPath = './static-data/sample_forms.json';
    this.GetFieldDetails = function () {
        return {
            fields: [
                {
                    name: 'textfield',
                    value: 'Textfield'
                },
                {
                    name: 'radio',
                    value: 'Radio Buttons'
                },
                {
                    name: 'dropdown',
                    value: 'Dropdown List'
                },
                {
                    name: 'date',
                    value: 'Date'
                },
                {
                    name: 'checkbox',
                    value: 'Checkbox'
                }
            ],
            form: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                return $http.get(formsJsonPath).then(function (response) {
                    var requestedForm = {};
                    //alert(response.data);
                    angular.forEach(response.data, function (form) {
                        if (form.form_id == id) requestedForm = form;
                    });
                    return requestedForm;
                });
            },
            forms: function () {
                return $http.get(formsJsonPath).then(function (response) {
                    return response.data;
                });
            }
        };
    };



});