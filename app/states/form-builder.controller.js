
angular.module('SFSiteVisitApp').controller('ngFormBuilderController', function ($scope, $rootScope, $timeout, $window, $http, $log, ngFormBuilderService) {

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $scope.previewMode = false;
    $scope.dvFormlistDetails = false;
    $scope.errMessage = false;
    $scope.succMessage = false;

    $scope.formlistdetails = null;
    $scope.formID = null;
    $scope.GroupID = null;

    $scope.dtl_id = null;      
    $scope.q_id = null;
    $scope.question_text = null;
    $scope.calc_typeid = null;
    $scope.SectionID = null;

    $scope.dvCALC_ADD = false;
    $scope.dvCALC_CASE = false;
    $scope.dvCALC_SUB = false;
    $scope.dvCALC_CA = false;

    $scope.formErrMsg = null;
    $scope.formsuccMsg = null;
    $scope.ipFldtype = "";

    //Filters
    $scope.QnFilter = function (Section_Id) {
        return function (item) {
            return ((item.form_id === $scope.formID) && (item.section_id === Section_Id)) || (item.q_id <= 0);
        }       
    };

    //ToolTip
    //var $e,
    //index,
    //optionHeight = 20,
    //isWindows = navigator.platform.toLowerCase().indexOf('win') > -1;

    //$("#selqndet").on('mouseleave', function (e) {
    //    $('#selqndet').popover('destroy');
    //});

    //$("#selqndet").on('mousemove', function (e) {
    //    if (!isWindows) {
    //        var $e = $(e.target);
    //    } else {
    //        var newIndex = Math.floor(e.clientY / optionHeight);
    //        if (newIndex === index) return;
    //        index = newIndex;
    //        $e = $(this).find('option:eq(' + index + ')');
    //    }
    //    if ($e.is('option')) {
    //        $('#selqndet').popover('destroy');
    //        $("#selqndet").popover({
    //            trigger: 'manual',
    //            placement: 'right',
    //            title: $e.attr("data-title"),
    //            content: $e.attr("data-content")
    //        }).popover('show');
    //    }
    //});
    $("[data-toggle=tooltip]").tooltip({
        placement: $(this).data("placement") || 'top'
    });

    $scope.radioChanged = function (item) {
        $scope.ipFldtype = item;
    };

    $scope.resetScope = function () {
        $scope.errMessage = false;
        $scope.succMessage = false;

        $scope.formErrMsg = null;
        $scope.formsuccMsg = null;

        //$scope.q_id = null;
        //$scope.calc_typeid = null;
        //$scope.SectionID = null;
        //$scope.grplist = {};
        //$scope.grplist.ACCESS = [];
        //$scope.CALCADDlist = {};
        //$scope.CALCADDlist.CALC_ADD = [];
        $scope.dvCALC_ADD = false;
        $scope.dvCALC_CASE = false;
        $scope.dvCALC_SUB = false;
        $scope.dvCALC_CA = false;

        $scope.caq_calcca_item_answer_id = null;
        $scope.caq_calcca_item_q_id = null;

        //$scope.caq_calcif_item.if_qn_id = null;
        //$scope.caq_calcif_item.answer_id = null;
        //$scope.questiondetailsCalcCase = null;
        //$scope.questiondetailsCalcCA = null;
        //$scope.questiondetails = null;

        //$scope.selFormlistsarr = [];
        //$scope.selFormfinallists = [];

        //$scope.form.forms.form_lists.splice(0, $scope.form.forms.form_lists.length);
    };

    $scope.clickLoadFormlist = function () {
        $('#fountainG').show();

        $scope.formlistdetails = null;

        ngFormBuilderService.GetForms('', '').then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    $scope.formlistdetails = result.data;
                }
                else {
                    $scope.outputdata = "No Forms available!";
                    $('#myModalfrmbldr').modal('show');
                }

            }, 0);
        },
        function () {
            $log.error('Error');
            $scope.outputdata = "Error Occured! - Loding form Details. Please contact Admin!";
            $('#myModalfrmbldr').modal('show');       
        }
          );

        $('#fountainG').hide();

    };

    $scope.clickLoadFormSeclist = function (mdlformlistdetails) {
        $('#fountainG').show();

        $scope.formID = mdlformlistdetails;
        $scope.forms.form.formsectiondetails = new Array();
        ngFormBuilderService.GetFormSectionDetails(mdlformlistdetails).then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    $scope.previewMode = false;
                    $scope.forms.form.formsectiondetails = result.data;
                }
                else {
                    $scope.previewMode = true;
                    $scope.outputdata = "No Sections available for the selected form. Please add!";
                    $('#myModalfrmbldr').modal('show');
                }

            }, 0);
        },
    function () {
        $log.error('Error');
        $scope.outputdata = "Error Occured! - Loding section Details. Please contact Admin!";
        $('#myModalfrmbldr').modal('show');
    }
      );

        $('#fountainG').hide();
    }

    $scope.clickLoadQuestionslist = function (searchCol, searchVal, formID, sectionID) {
        //if ((typeof searchCol == "undefined" && searchCol) || (typeof searchVal == "undefined" && searchVal)) {
        //    searchCol = "";
        //    searchVal = "";
        //}
        //$scope.questiondetails = null;

        ngFormBuilderService.GetQuestionsDetails(searchCol, searchVal, formID, sectionID).then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    //alert(searchCol);
                    if (searchCol === 'FORMID')
                        $scope.questiondetailsCalcCase = result.data;
                    else if (searchCol === 'CA')
                        $scope.questiondetailsCalcCA = result.data;
                    else if (searchCol === 'CALCIF')
                        $scope.questiondetailsCALCIF = result.data;
                    else
                        $scope.questiondetails = result.data;

                    //alert(result.data.length);
                }
                else {
                    //alert(searchCol);
                    if (searchCol === 'FORMID')
                        $scope.questiondetailsCalcCase = null;
                    else if (searchCol === 'CA')
                        $scope.questiondetailsCalcCA = null;
                    else if (searchCol === 'CALCIF')
                        $scope.questiondetailsCALCIF = null;
                    else
                        $scope.questiondetails = null;
                }
            }, 0);
        }, function () {
            $log.error('Error - loading Question Details');
            $scope.outputdata = "Error - loading Question Details";
            $('#myModalfrmbldr').modal('show');

            if (searchCol === 'FORMID')
                $scope.questiondetailsCalcCase = null;
            else if (searchCol === 'CA')
                $scope.questiondetailsCalcCA = null;
            else if (searchCol === 'CALCIF')
                $scope.questiondetailsCALCIF = null;
            else
                $scope.questiondetails = null;

        }
                    );

    };

    $scope.GetOperators = function (searchCol) {
        $scope.lstOperatordetails = null;

        ngFormBuilderService.GetOperators(searchCol).then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    $scope.lstOperatordetails = result.data;
                }
                else {
                    $scope.lstOperatordetails = null;
                }
            }, 0);
        }, function () {
            $log.error('Error - loading Operator Details');
            $scope.outputdata = "Error - loading Operator Details";
            $('#myModalfrmbldr').modal('show');
        }
                    );

    };
 
    $scope.clickLoadCalcTypes = function () {
        $scope.calctypdetails = null;

        ngFormBuilderService.GetCalcTypes("", "").then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    $scope.calctypdetails = result.data;
                }
                else {
                    $scope.calctypdetails = null;
                }
            }, 0);
        }, function () {
            $log.error('Error - loading Calc Type Details');
            $scope.outputdata = "Error - loading Calc Type Details";
            $('#myModalfrmbldr').modal('show');
        }
                    );

    };

    $scope.clickLoadformroles = function () {
        $scope.formroledetails = null;

        ngFormBuilderService.GetFormRoles().then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    $scope.formroledetails = result.data;
                }
                else {
                    $scope.formroledetails = null;
                }
            }, 0);
        }, function () {
            $log.error('Error - loading Form role Details');
            $scope.outputdata = "Error - Form role Details";
            $('#myModalfrmbldr').modal('show');
        }
                    );

    };

    $scope.clickLoadAnswers = function (qID) {
        $scope.CALCanswerdetails = null;
        //alert(qID);
        ngFormBuilderService.GetAnswers(qID).then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    $scope.CALCanswerdetails = result.data;
                }
                else {
                    $scope.CALCanswerdetails = null;
                }
            }, 0);
        }, function () {
            $log.error('Error - loading CA Answer Details');
            $scope.outputdata = "Error - loading CA Answer  Details";
            $('#myModalfrmbldr').modal('show');
        }
                    );

    };

    // previewForm - for preview purposes, form will be copied into this
    // otherwise, actual form might get manipulated in preview mode
    // new form
    $scope.forms = {};
    $scope.forms.form = {};
    $scope.forms.form.formsectiondetails = new Array();
    //var newForm = {
    //    "form_id": $scope.formID
    //};

    $('.progress-bar-fill').delay(1000).queue(function () {
        $(this).css('width', '100%')
    });

    $scope.forms.form.formsectiondetails.Questions = {};
    //$scope.form.push(newForm);
   
    $scope.formList = [];

    $scope.QuestionList = {};
    $scope.QuestionList.lastAdedID = 0;

    $scope.previewForm = {};
    $scope.previewQuestions = {};
    $scope.previewQuestions.question = [];
    //$scope.previewForm.pvform = [];
    $scope.clickLoadQuestionslist("","",0,0);
    
    $scope.clickLoadCalcTypes();
    $scope.clickLoadformroles();
    $scope.GetOperators('');
    // add new field drop-down:
    //$scope.addField = [];
    //$scope.addField.types = ngFormBuilderService.GetFieldDetails().fields;
    $scope.clickFormDetails = function (mdlformlistdetails) {
        $('#fountainG').show();

        $scope.formID = mdlformlistdetails;
        $scope.SectionID = "-1"; //section_id;

        //$scope.form.Questions.Question_List = new Array();
        $scope.forms = {};
        $scope.forms.form = {};
        $scope.forms.form.formsectiondetails = new Array();
        $scope.forms.form.formsectiondetails.Questions = {};

        ngFormBuilderService.GetFormLayout($scope.formID, $scope.SectionID).then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    $scope.previewMode = false;
                    $scope.forms = jQuery.parseJSON(result.data);
                    //angular.forEach(result.data, function (item) {                                                 
                    //        var newQList = {
                    //            "dtl_id": String(item.dtl_id),
                    //            "q_id": String(item.q_id),
                    //            "question_text": String(item.question_text),
                    //            "type_id": String(item.type_id),
                    //            //"link_q_id": String(item.link_q_id),
                    //            //"ca_answer_id": String(item.ca_answer_id),
                    //            "sequence": String(item.sequence),
                    //            "obj_id": String(item.obj_id)
                    //            //"section_id": String(item.section_id)
                    //            //"CA_Answers": {}
                    //        };                  
                    //});
                    
                    $scope.forms.form.formsectiondetails.push($scope.forms.form.formsectiondetails);

                    //$scope.form.Questions.Question_List = $scope.formsOp.form.Questions.list;
                     
                    //$scope.form.Questions.Question_List.push($scope.formsOp.Forms.form.list);

                    if (!$scope.$$phase) {
                        $scope.$apply();
                    };

                    //$scope.showJson = true;

                    //alert(angular.toJson($scope.form.Questions));
                    //for (var i = 0; i < $scope.form.Questions.Question_List.length; i++) {
                    //    if ($scope.form.Questions.Question_List[i].dtl_id == $scope.question.dtl_id) {
                    //        $scope.question.q_id = $scope.form.Questions.Question_List[i].q_id;
                    //        break;
                    //    }
                    //}

                }
                else {
                    //$scope.previewMode = true;
                    $scope.outputdata = "No Questions available for the selected section. Please add!";
                    $('#myModalfrmbldr').modal('show');
                }

            }, 0);
        },
    function () {
        $log.error('Error');
        $scope.outputdata = "Error Occured! - Loading section Details. Please contact Admin!";
        $('#myModalfrmbldr').modal('show');
    }
      );


        $('#fountainG').hide();
    }


    $scope.clickSection = function (section_id) {
        $scope.SectionID = section_id;
    }


     
    // create New Question 
    $scope.addquestions = function (index) {

        //if ($scope.form.Question_List.length === 0)
        //{
        //    $scope.QuestionList.lastAdedID = 0;
        //    $scope.QuestionList.lastAdedID++;
        //}
        //else
        
        //$('#prog-bar').show();

        $scope.QuestionList.lastAdedID++;

        var newQList = {
            "dtl_id": "000"+ String($scope.QuestionList.lastAdedID),
            "q_id": "000" + String($scope.QuestionList.lastAdedID),
            "question_text": null,
            "type_id": "-1",
            //"link_q_id": "0",
            //"ca_answer_id": "0",
            "sequence": null,
            "obj_id": null
            //"section_id": "0"
            //"CA_Answers": []
        };

        // put newField into fields array
        $scope.forms.form.formsectiondetails[index].Questions.Question_List.push(newQList);

        if (!$scope.$$phase) {
            $scope.$apply();
        };
        //$('#prog-bar').hide();
        //alert(angular.toJson($scope.form.Questions.Question_List));
    }

    // deletes particular Question on button click
    $scope.deleteField = function (index, question) {
       // alert(question.dtl_id);
        // alert($scope.form.Questions.Question_List.length);
        for (var i = 0; i < $scope.forms.form.formsectiondetails[index].Questions.Question_List.length; i++) {
            //alert($scope.formList.length);
            if ($scope.forms.form.formsectiondetails[index].Questions.Question_List[i].dtl_id === question.dtl_id) {
                $scope.forms.form.formsectiondetails[index].Questions.Question_List.splice(i, 1);
                break;
            }
        }
    }

    function findAndReplace(object, value, replacevalue) {
        for (var x in object) {
            if (typeof object[x] === typeof {}) {
                findAndReplace(object[x], value, replacevalue);
            }
            if (object[x] === value) {
                object["q_id"] = replacevalue;
                // break; // uncomment to stop after first replacement
            }
        }
    }

    $scope.setSecDetailquestionid = function (par_index,index, question) {
        for (var i = 0; i < $scope.forms.form.formsectiondetails[par_index].Questions.Question_List.length; i++) {
            if ($scope.forms.form.formsectiondetails[par_index].Questions.Question_List[i].dtl_id === question.dtl_id) {
                //var recentdtlID = $scope.form.Questions.Question_List[i].dtl_id;
                //findAndReplace($scope.form.Question_List, question.dtl_id, mdlquestiondetails[index]);
                //$scope.form.Question_List[i].q_id = mdlquestiondetails[index];
                $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[i].q_id = question.q_id;
                break;
            }
        }

        //Default CALC_HEADER for Dynamic SQL if Question ID is negative value
        if (question.q_id < 0)
        {            
            $('selcalctype').readonly = true;
            //$('[name=calctypeOptions]')($(this)).val(6);
            //$scope.SelectedCalcType = [{ "type_id": 0, "calc_type": "DEFAULT" }, { "type_id": 1, "calc_type": "CALC_ADD" }, { "type_id": 2, "calc_type": "CALC_CASE" }, { "type_id": 3, "calc_type": "CALC_SUB" }, { "type_id": 5, "calc_type": "CALC_IF" }, { "type_id": 6, "calc_type": "CALC_HEADER" }];
            //alert($scope.SelectedCalcType[6]);
            //alert($scope.SelectedCalcType[5].type_id);
            //question.type_id = $scope.SelectedCalcType[5].type_id;
            //alert(question.type_id);
            question.type_id = 6;
            //if (!$scope.$$phase) {

              //  $scope.$apply();
            //};
            //$scope.$apply(function () {
            //    $scope.question.type_id = 6;
            //});            
        }              
            
    
       // alert(angular.toJson($scope.form.Question_List));
    }

    $scope.setcalctypeid = function (question, mdlcalctypdetails, index) {
        for (var i = 0; i < $scope.forms.form.formsectiondetails[index].Questions.Question_List.length; i++) {
            if ($scope.forms.form.formsectiondetails[index].Questions.Question_List[i].dtl_id === question.dtl_id) {
                var recentdtlID = $scope.forms.form.formsectiondetails[index].Questions.Question_List[i].dtl_id;
                //findAndReplace($scope.form.Question_List, question.dtl_id, mdlcalctypdetails[index]);
                $scope.forms.form.formsectiondetails[index].Questions.Question_List[i].type_id = mdlcalctypdetails[index];
                break;
            }
        }
        //$scope.calc_typeid = mdlcalctypdetails;
       // alert(angular.toJson($scope.form.Question_List));
    }

    $scope.selcalcfieldtype = function (par_index,index) {
        //alert(index);
        //alert('selcalcfieldtype' + $scope.calc_typeid);


        //alert('selection' + $scope.selection);
        $scope.dtl_id = $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].dtl_id;
        $scope.q_id = $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].q_id;
        $scope.calc_typeid = parseInt($scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].type_id);
        $scope.question_text = $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].question_text;

        //alert($scope.dtl_id);
        //alert($scope.q_id);
        //alert($scope.calc_typeid);
        //alert($scope.SectionID);
        //if ($scope.calc_typeid === 1) {
        //    $scope.loadCALCADDlist(frmsec_item);
        //}
        //else if ($scope.calc_typeid === 2) {
        //    $scope.loadCALCCASElist(frmsec_item);
        //}
        //else if ($scope.calc_typeid === 3) {
        //    $scope.loadCALCADDlist(frmsec_item);
        //}
        //else if ($scope.calc_typeid === 4) {
        //    $scope.loadCALCCAlist(frmsec_item);
        //}
        //else if ($scope.calc_typeid === 5) {
        //    $scope.loadCALCIFlist(frmsec_item);
        //}

        switch ($scope.calc_typeid) {
            case 1: {
                //alert('dvCALC_ADD : ' + $scope.calc_typeid);
                $scope.selection = "dvCALC_ADD";
                $scope.loadCALCADDlist();
                break;
            }
            case 2: {
                //alert('dvCALC_CASE : ' + $scope.calc_typeid);
                $scope.selection = "dvCALC_CASE";
                $scope.loadCALCCASElist();
                break;
            }
            case 3: {
               // alert('dvCALC_ADD : ' + $scope.calc_typeid);
                $scope.selection = "dvCALC_ADD";
                $scope.loadCALCADDlist();
                break;
            }
            case 4: {
                //alert('dvCALC_CA : ' + $scope.calc_typeid);
                //$scope.selection = "dvCALC_CA";
                //$scope.loadCALCCAlist();
                /*Logic has been changed to display CA as link to Edit the Statement and add multiple Policy to one question*/
                break;
            }
            case 5: {
               // alert('dvCALC_IF : ' + $scope.calc_typeid);
                $scope.selection = "dvCALC_IF";
                $scope.loadCALCIFlist();
                break;
            }
            default: {
                //alert('default');
                $scope.outputdata = "Rules cannot be applied for Default / Header type questions!";
                $('#myModalfrmbldr').modal('show');
            }
        }
    };

    /* Calculated Add Details for the Form section question*/
    
    $scope.selCALCADDValue = function ($event, item) {

        if (!$scope.CALCADDlist.CALC_ADD)
            $scope.CALCADDlist.CALC_ADD = new Array();

        var Chkbox = $event.target;

        if (Chkbox.checked) {
            var newformlist = {
                "Q_id": String(item.q_id)
            };
            $scope.CALCADDlist.CALC_ADD.push(newformlist);
        }
        else {
            for (var i = 0; i < $scope.CALCADDlist.CALC_ADD.length; i++) {
                if ($scope.CALCADDlist.CALC_ADD[i].Q_id === item.q_id) {
                    $scope.CALCADDlist.CALC_ADD.splice(i, 1);
                    break;
                }
            }
        }

        $scope.selcalc_addlists = angular.toJson($scope.CALCADDlist);
        //alert($scope.selcalc_addlists);
    };

    $scope.loadCALCADDlist = function () {
        if (typeof $scope.SectionID !== "undefined" && !!$scope.SectionID) {
            //$scope.SectionID = frmsec_item.section_id;
            //alert(frmsec_item.section_id);
            //alert($scope.SectionID);
            $scope.clickCALCADDlist();
        }
        else {
            $scope.SectionID = null;
        }
    };

    $scope.clickCALCADDlist = function () {
        $scope.CALCADDlist = {};

        if ($scope.calc_typeid === 1) 
            $scope.CALCADDlist.CALC_ADD = [];
        else if ($scope.calc_typeid === 3)  
            $scope.CALCADDlist.CALC_SUB = [];

        //alert($scope.q_id);
        $scope.CALCADDlistdetails = null;
        $('#myModalCalcFields').modal('show');
              
        ngFormBuilderService.GetFormDetailCalc($scope.SectionID, $scope.q_id).then(function (result) {
            $timeout(function () {
                //alert(result.data.length);
                if (result.data.length > 0) {
                    $scope.CALCADDlistdetails = result.data;

                    
                    //$scope.selection = "dvCALC_ADD";
                   // $scope.dvCALC_ADD = true;

                    angular.forEach($scope.CALCADDlistdetails, function (item) {
                        //alert(item.roll_id + '' + item.group_id);
                        if (item.calc_q_id) {
                            var newformlist = {
                                "Q_id": String(item.q_id)
                            };

                            if ($scope.calc_typeid === 1)
                                $scope.CALCADDlist.CALC_ADD.push(newformlist);
                            else if ($scope.calc_typeid === 3)
                                $scope.CALCADDlist.CALC_SUB.push(newformlist);
                        }
                    });
                    $scope.selcalc_addlists = angular.toJson($scope.CALCADDlist);
                    //alert($scope.selcalc_addlists);
                   
                    
                }
                else {
                    
                    $scope.secErrMsg = "No questions available.!";
                    $scope.errMessage = true;
                    $scope.succMessage = false;
                }

            }, 0);
        },
        function () {
            $log.error('Error');
            $scope.secErrMsg = "Error Occured! - Loding questions Details. Please contact Admin!";
            $scope.errMessage = true;
            $scope.succMessage = false;
        }
          );

    };


    /* CASE Details for the Form section question*/

    $scope.selCALCCASEValue = function ($event, case_item) {

        if (!$scope.CALCCASElist.CALC_CASE)
            $scope.CALCCASElist.CALC_CASE = new Array();

        var Chkbox = $event.target;
        //alert(case_item.case_id + case_item.lhs_id + case_item.rhs_id + case_item.operator + case_item.result + case_item.Default);

        if (Chkbox.checked) {
            var newformlist = {
                "lhs_id": String(case_item.lhs_id),//(typeof case_item.lhs_q_id !== "undefined" && !!case_item.lhs_q_id) ? String(case_item.lhs_q_id) : String(mdlCalcCaseLHSquestionId),
                "rhs_id": String(case_item.rhs_id),//(typeof case_item.rhs_q_id !== "undefined" && !!case_item.rhs_q_id) ? String(case_item.rhs_q_id) : String(mdlCalcCaseRHSquestionId),
                "op_id": String(case_item.op_id),//(typeof case_item.op_field !== "undefined" && !!case_item.op_field) ? String(case_item.op_field) : String(mdlCalcCaseoperatorId),
                "result": String(case_item.result),
                "Default": String(case_item.Default),
                "case_id": String(case_item.case_id)
            };
            // $scope.CALCCASElist.CALC_CASE.push(newformlist);
            $scope.selcalc_caselists = angular.toJson($scope.CALCCASElist.CALC_CASE);
            //alert($scope.selcalc_caselists);
        }
        else {
            for (var i = 0; i < $scope.CALCCASElist.CALC_CASE.length; i++) {
                if ($scope.CALCCASElist.CALC_CASE[i].case_id === case_item.case_id) {
                    $scope.CALCCASElist.CALC_CASE.splice(i, 1);
                    break;
                }
            }
        }

        $scope.selcalc_caselists = angular.toJson($scope.CALCCASElist);

    };

    $scope.loadCALCCASElist = function () {
        if (typeof $scope.SectionID !== "undefined" && !!$scope.SectionID) {
            //$scope.SectionID = frmsec_item.section_id;           
            $scope.clickCALCCASElist();
        }
        else {
            $scope.SectionID = null;
        }
    };

    $scope.addNewCALCCASEField = function () {
        $scope.succMessage = false;
        $scope.errMessage = false;

        if (!$scope.CALCCASElist.CALC_CASE)
            $scope.CALCCASElist.CALC_CASE = new Array();

        //$scope.CALCCASElistdetails = [];
        var newformlist = {
            "lhs_id": 0,
            "rhs_id": 0,
            "op_id": 0,
            "result": "",            
            "Default": "",
            "case_id":0
        };
        $scope.CALCCASElist.CALC_CASE.push(newformlist);
        //alert($scope.CALCCASElist.CALC_CASE);
    };

    $scope.clickCALCCASElist = function () {
        $scope.clickLoadQuestionslist("FORMID", $scope.formID, 0, 0);
        $scope.GetOperators('');

        $scope.CALCCASElist = {};
        //$scope.CALCCASElist.CALC_CASE = [];
        if (!$scope.CALCCASElist.CALC_CASE)
            $scope.CALCCASElist.CALC_CASE = new Array();

       // $scope.CALCCASElistdetails = null;

        //alert('Selected Section & Question : '+ $scope.SectionID + '-' + $scope.q_id);
        $('#myModalCalcFields').modal('show');
        //$scope.dvCALC_CASE = true;

        //$scope.questiondetailsCASE = $scope.questiondetails;

        ngFormBuilderService.GetFormDetailCase($scope.SectionID, $scope.q_id).then(function (result) {
            $timeout(function () {
                //alert('Total Count of Form DETAIL CASE: ' + result.data.length);
                if (result.data.length > 0) {
                    //$scope.CALCCASElistdetails_DATA = result.data;

                    angular.forEach(result.data, function (item) {
                        //if ((item.lhs_q_id) && (item.rhs_q_id)) {
                            var newformlist = {
                                "lhs_id": String(item.lhs_q_id),
                                "rhs_id": String(item.rhs_q_id),
                                "op_id": String(item.op_id),
                                "result": String(item.result),
                                "Default": String(item.Default),
                                "case_id": String(item.case_id),
                            };
                            $scope.CALCCASElist.CALC_CASE.push(newformlist);
                        //}
                    });
                    $scope.selcalc_caselists = angular.toJson($scope.CALCCASElist.CALC_CASE);
                    //alert($scope.selcalc_caselists);

                }
                else {
                    $scope.secErrMsg = "No CASE questions available. Please add!";
                    $scope.errMessage = true;
                    $scope.succMessage = false;
                }

            }, 0);
        },
        function () {
            $log.error('Error');
            $scope.secErrMsg = "Error Occured! - Loding questions Details. Please contact Admin!";
            $scope.errMessage = true;
            $scope.succMessage = false;
        }
          );

    };

    /*Corrective Action for the Form Section question*/
    $scope.selcalcCALCCAlist = function (par_index,index) {        
        $scope.dtl_id = $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].dtl_id;
        $scope.q_id = $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].q_id;
        $scope.calc_typeid = parseInt($scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].type_id);
        $scope.question_text = $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].question_text;
        
        $scope.loadCALCCAlist(par_index, index);
    };    

    $scope.loadCALCCAlist = function (par_index, index) {
        if (typeof $scope.SectionID !== "undefined" && !!$scope.SectionID) {
            $scope.clickCALCCAlist(par_index, index);
        }
        else {
            $scope.SectionID = null;
        }
    };

    $scope.clickCALCCAlist = function (par_index, index) {
        //$scope.clickLoadQuestionslist("CA", $scope.formID, 0,0);
        //$scope.clickLoadAnswers($scope.q_id);

        // $scope.forms.form.CALCCAlist = {};
         $scope.forms.form.CA_Answers = []; //new Array();
        $('#myModalCA').modal('show');
        
        if ((typeof $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].CA_Answers !== "undefined") && (!!$scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].CA_Answers))// && ( $scope.forms.form.formsectiondetails.Questions.Question_List[index].CA_Answers.length >  0))
        {
            $scope.forms.form.CA_Answers =  $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].CA_Answers;
            // $scope.forms.form.CA_Answers.push(newformlist);
        }
        else
        {
            //if (! $scope.forms.form.CA_Answers)                   
            // $scope.dvCALC_CA = true;
            //$scope.questiondetailsCASE = $scope.questiondetails;
            ngFormBuilderService.GetFormDetailCA($scope.SectionID, $scope.q_id).then(function (result) {
                $timeout(function () {
                    if (result.data.length > 0) {

                        angular.forEach(result.data, function (item) {
                            //$scope.clickLoadAnswers(item.q_id);

                            var newformlist = {
                                //"link_q_id": String(item.link_q_id),
                                "parent_answer_id": String(item.parent_answer_id),
                                "parent_answer_text": String(item.parent_answer_text),
                                "ca_statement_text": String(item.ca_statement_text),
                                "ca_policy_text": String(item.ca_policy_text)
                            };

                             $scope.forms.form.CA_Answers.push(newformlist);
                        });
                        //for (var i = 0; i <  $scope.forms.form.Question_List.length; i++) {
                        //    if ( $scope.forms.form.Question_List[i].dtl_id == $scope.dtl_id) {
                        //         $scope.forms.form.Question_List[i].link_q_id = result.data[0].link_q_id;
                        //         $scope.forms.form.Question_List[i].ca_answer_id = result.data[0].ca_answer_id;
                        //        break;
                        //    }
                        //}
                    }
                    else {
                        $scope.secErrMsg = "No Corrective Actions available!";

                        var newformlist = {
                            //"link_q_id":0,
                            "parent_answer_id": "0",
                            "parent_answer_text": "",
                            "ca_statement_text": "",
                            "ca_policy_text": ""
                        };

                         $scope.forms.form.CA_Answers.push(newformlist);

                        $scope.errMessage = true;
                        $scope.succMessage = false;
                    }

                    //alert(angular.toJson( $scope.forms.form.CALCCAlist));
                }, 0);
            },
            function () {
                $log.error('Error');
                $scope.secErrMsg = "Error Occured! - Loading Corrective Action Details. Please contact Admin!";
                $scope.errMessage = true;
                $scope.succMessage = false;
            }
              );
        }

    };

    $scope.clickSaveCADetails = function () {
        //for (var i = 0; i <  $scope.forms.form.Questions.Question_List.length; i++) {
        //    if ( $scope.forms.form.Questions.Question_List[i].dtl_id == $scope.dtl_id) {
        //        //var recentdtlID =  $scope.forms.form.Questions.Question_List[i].dtl_id;
        //        //findAndReplace( $scope.forms.form.Question_List, question.dtl_id, mdlcalctypdetails[index]);
        //        // $scope.forms.form.Questions.Question_List[i] = {};

        //        //if (! $scope.forms.form.Questions.Question_List[i].CA_Answers)
        //             $scope.forms.form.Questions.Question_List[i].CA_Answers = [];// new Array();

        //         $scope.forms.form.Questions.Question_List[i].CA_Answers =  $scope.forms.form.CA_Answers;

        //        for (var j = 0; j <  $scope.forms.form.Questions.Question_List[i].CA_Answers.length; j++) {
        //             $scope.forms.form.Questions.Question_List[i].CA_Answers[j].ca_statement_text =  $scope.forms.form.CA_Answers[0].ca_statement_text;
        //        }                
        //        // $scope.forms.form.Questions.Question_List[i].push($scope.selcalc_calists);              
        //        break;
        //    }
        //}


        var ca_statement_text =  $scope.forms.form.CA_Answers[0].ca_statement_text;
        

        for (var j = 0; j <  $scope.forms.form.CA_Answers.length; j++) {
             $scope.forms.form.CA_Answers[j].ca_statement_text = ca_statement_text;

            //if ( $scope.forms.form.CA_Answers[j].ca_policy_text === '')
            //    delete $scope.form.CA_Answers[j];
        }

        $scope.selcalc_calists = angular.toJson( $scope.forms.form.CA_Answers);

        ngFormBuilderService.AddFormDetailCA($scope.SectionID, $scope.q_id, $scope.selcalc_calists, 'SFAPPQC').then(function (result) {
            $timeout(function () {
                $scope.secsuccMsg = "Data has been updated successfully!";
                $scope.succMessage = true;
                $scope.errMessage = false;               
            }, 250);
        },
                     function () {
                         $log.error('Error');
                         $scope.secErrMsg = "Error Occured! - Saving Corrective Action Details. Please contact Admin!";
                         $scope.errMessage = true;
                         $scope.succMessage = false;
                     }
                     );

       
    }

    /*CALC IF for the Form Section question*/
    $scope.loadCALCIFlist = function () {
        if (typeof $scope.SectionID !== "undefined" && !!$scope.SectionID) {
           // $scope.SectionID = frmsec_item.section_id;          
            $scope.clickCALCIFlist();
        }
        else {
            $scope.SectionID = null;
        }
    };

    $scope.loadanswersCalcIf = function (q_id) {
        $scope.clickLoadAnswers(q_id);
    }

    $scope.clickCALCIFlist = function () {
        $scope.clickLoadQuestionslist("CALCIF", $scope.formID,0,0);
        //$scope.clickLoadAnswers($scope.q_id);
        $scope.GetOperators('CALC_IF');

         $scope.forms.form.CALCIFlist = {};
        if (! $scope.forms.form.CALCIFlist.CALC_IF)
             $scope.forms.form.CALCIFlist.CALC_IF = new Array();

        $('#myModalCalcFields').modal('show');
       // $scope.dvCALC_IF = true;

        //$scope.questiondetailsCASE = $scope.questiondetails;
        ngFormBuilderService.GetFormDetailIf($scope.SectionID, $scope.q_id).then(function (result) {
            $timeout(function () {
                //alert(result.data.length);
                if (result.data.length > 0) {
                    

                    angular.forEach(result.data, function (item) {
                        $scope.clickLoadAnswers(item.q_id);

                        var newformlist = {
                            "q_id": String(item.q_id),
                            "op_id": String(item.op_id),
                            "answer_id": String(item.answer_id),
                            "result": String(item.result),
                            "Default": String(item.Default)
                        };
                         $scope.forms.form.CALCIFlist.CALC_IF.push(newformlist);
                    });
                   
                }
                else {
                    var newformlist = { "q_id": "0", "op_id": "0", "answer_id": "0", "result": "", "Default": "" };
                     $scope.forms.form.CALCIFlist.CALC_IF.push(newformlist);
                    $scope.selcalc_iflists = angular.toJson( $scope.forms.form.CALCIFlist);

                    
                    //$scope.secErrMsg = "No CASE questions available. Please add!";
                    //$scope.errMessage = true;
                    //$scope.succMessage = false;
                }

            }, 0);
        },
        function () {
            $log.error('Error');
            $scope.secErrMsg = "Error Occured! - Loding Calcualted Details. Please contact Admin!";
            $scope.errMessage = true;
            $scope.succMessage = false;
        }
          );

    };
 
    
    /*Save All Type of Calc Fields*/
    $scope.clickSaveCalcFieldsALL = function () {
        //alert($scope.calc_typeid);
        if (($scope.calc_typeid === 1) || ($scope.calc_typeid === 3)) {
            //alert($scope.selcalc_addlists);
            ngFormBuilderService.UpdateFormDetailCalc($scope.SectionID, $scope.q_id, $scope.selcalc_addlists, 'SFAPPQC').then(function (result) {
                $timeout(function () {
                    $scope.secsuccMsg = "Data has been updated successfully!";
                    $scope.succMessage = true;
                    $scope.errMessage = false;

                    $scope.clickCALCADDlist($scope.q_id);
                }, 0);
            },
                           function () {
                               $log.error('Error');
                               $scope.secErrMsg = "Error Occured! - Saving Caclulated Details. Please contact Admin!";
                               $scope.errMessage = true;
                               $scope.succMessage = false;
                           }
                           );
        }
        else if ($scope.calc_typeid === 2) {
            ngFormBuilderService.UpdateFormDetailCase($scope.SectionID, $scope.q_id, $scope.selcalc_caselists, 1, 'SFAPPQC').then(function (result) {
                $timeout(function () {
                    $scope.secsuccMsg = "Data has been updated successfully!";
                    $scope.succMessage = true;
                    $scope.errMessage = false;

                    $scope.clickCALCCASElist();
                }, 0);
            },
                           function () {
                               $log.error('Error');
                               $scope.secErrMsg = "Error Occured! - Saving Caclulated Details. Please contact Admin!";
                               $scope.errMessage = true;
                               $scope.succMessage = false;
                           }
                           );
        }
        else if ($scope.calc_typeid === 4) {

            //var newformlist = {
            //    "link_q_id": String(item.link_q_id),
            //    "ca_answer_id": String(item.ca_answer_id)
            //};

            //$scope.Question_List.CALC_CA.push(newformlist);

         
            //alert($scope.selcalc_calists);
            //$scope.link_q_id = (typeof $scope.caq_calcca_item !== "undefined" && !!$scope.caq_calcca_item) ? $scope.caq_calcca_item : "";
            //$scope.ca_answer_id = (typeof $scope.caq_calcca_item !== "undefined" && !!$scope.caq_calcca_item) ? $scope.caq_calcca_item : "";

            //var newformlist = {
            //    "q_id": String($scope.caq_calcif_item.q_id),
            //    "op_id": String($scope.caq_calcif_item.op_id),
            //    "answer_id": String($scope.caq_calcif_item.answer_id),
            //    "result": String($scope.caq_calcif_item.result),
            //    "Default": String($scope.caq_calcif_item.Default)
            //};
            //$scope.CALCIFlist.CALC_IF.push(newformlist);
            
            /*
            $scope.selcalc_calists = angular.toJson($scope.form.CALCCAlist);
            ngFormBuilderService.AddFormDetailCA($scope.SectionID, $scope.q_id, $scope.selcalc_calists, 'SFAPPQC').then(function (result) {
                $timeout(function () {
                    $scope.secsuccMsg = "Data has been updated successfully!";
                    $scope.succMessage = true;
                    $scope.errMessage = false;

                    $scope.clickCALCIFlist();
                }, 0);
            },
                                 function () {
                                     $log.error('Error');
                                     $scope.secErrMsg = "Error Occured! - Saving Group access Details. Please contact Admin!";
                                     $scope.errMessage = true;
                                     $scope.succMessage = false;
                                 }
                                 );*/

        }
        else if ($scope.calc_typeid === 5) {
            //alert(  "q_id"+  "op_id" + String($scope.caq_calcif_item.op_id)+"answer_id" + String($scope.caq_calcif_item.answer_id)+"result"+String($scope.caq_calcif_item.result)+"Default"+String($scope.caq_calcif_item.Default));
            //var newformlist = {
            //    "q_id": String($scope.caq_calcif_item.q_id),
            //    "op_id": String($scope.caq_calcif_item.op_id),
            //    "answer_id": String($scope.caq_calcif_item.answer_id),
            //    "result": String($scope.caq_calcif_item.result),
            //    "Default": String($scope.caq_calcif_item.Default)
            //};
            //$scope.CALCIFlist.CALC_IF.push(newformlist);
            $scope.selcalc_iflists = angular.toJson( $scope.forms.form.CALCIFlist);
            
            ngFormBuilderService.UpdateFormDetailIf($scope.SectionID, $scope.q_id, $scope.selcalc_iflists, 'SFAPPQC').then(function (result) {
                $timeout(function () {
                    $scope.secsuccMsg = "Data has been updated successfully!";
                    $scope.succMessage = true;
                    $scope.errMessage = false;

                    $scope.clickCALCIFlist();
                }, 0);
            },
                                function () {
                                    $log.error('Error');
                                    $scope.secErrMsg = "Error Occured! - Saving Group access Details. Please contact Admin!";
                                    $scope.errMessage = true;
                                    $scope.succMessage = false;
                                }
                                );

        }
        else 
        {
            alert('Parse Errror');
        }

    };
    
    /* Group & Role Details for the Form section question*/
    $scope.selACCESSValue = function (grp_item) {
        //alert(grp_item.group_id + ' ' + roleid);
        if (!$scope.grplist.ACCESS)
            $scope.grplist.ACCESS = new Array();

        for (var i = 0; i < $scope.grplist.ACCESS.length; i++) {
            if ($scope.grplist.ACCESS[i].group_id === grp_item.group_id) {
                //alert(grp_item.group_id);
                $scope.grplist.ACCESS.splice(i, 1);
                break;
            }
        }

        var newformlist = {
            "group_id": String(grp_item.group_id),
            "role_id": String(grp_item.role_id),
            "group_name": String(grp_item.group_name)
        };

        $scope.grplist.ACCESS.push(newformlist);

        $scope.selaccesslists = angular.toJson($scope.grplist);

    };

    $scope.loadGrouplist = function (par_index,index) {
        $scope.q_id = $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].q_id;
        $scope.calc_typeid = $scope.forms.form.formsectiondetails[par_index].Questions.Question_List[index].type_id;

        if (typeof $scope.SectionID !== "undefined" && !!$scope.SectionID) {
            //alert(frmsec_item.section_id);
            //$scope.SectionID = frmsec_item.section_id;
            $scope.clickLoadGrouplist();
        }
        else {
            $scope.GroupID = null;
        }
    };

    $scope.clickLoadGrouplist = function () {
        $scope.grplist = {};
        //$scope.grplist.ACCESS = [];
        if (!$scope.grplist.ACCESS)
            $scope.grplist.ACCESS = new Array();

        $scope.grprolelistdetails = null;
        $('#myModalGroupsRoles').modal('show');
        $scope.dvGrpAccessDetails = true;
        ngFormBuilderService.GetFormDetailAccess($scope.SectionID, $scope.q_id).then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    //alert(result.data.length);
                    //$scope.grprolelistdetails = result.data;

                    angular.forEach(result.data, function (item) {
                        //alert(item.roll_id + '' + item.group_id);
                        //if ((item.group_id) && (item.role_id !== 0)) {

                            var newformlist = {
                                "group_id": String(item.group_id),
                                "role_id": String(item.role_id),
                                "group_name": String(item.group_name)
                            };
                            $scope.grplist.ACCESS.push(newformlist);
                        //}
                    });
                    $scope.selaccesslists = angular.toJson($scope.grplist);
                    //alert($scope.selGrplistsarr);
                    
                }
                else {
                    $scope.dvGrpAccessDetails = false;
                    $scope.secErrMsg = "No groups available. Please add!";
                    $scope.errMessage = true;
                    $scope.succMessage = false;
                }

            }, 0);
        },
        function () {
            $log.error('Error');
            $scope.secErrMsg = "Error Occured! - Loding form Details. Please contact Admin!";
            $scope.errMessage = true;
            $scope.succMessage = false;
        }
          );

    };

    $scope.clickSavefrmlstGrp = function () {
        //alert($scope.selaccesslists);
        ngFormBuilderService.UpdateFormDetailAccess($scope.SectionID, $scope.q_id, $scope.selaccesslists, 'SFAPPQC').then(function (result) {
            $timeout(function () {
                $scope.secsuccMsg = "Data has been updated successfully!";
                $scope.succMessage = true;
                $scope.errMessage = false;

                $scope.clickLoadGrouplist($scope.q_id);
            }, 0);
        },
                       function () {
                           $log.error('Error');
                           $scope.secErrMsg = "Error Occured! - Saving Group access Details. Please contact Admin!";
                           $scope.errMessage = true;
                           $scope.succMessage = false;
                       }
                       );




    };

    //$scope.selACCESSValue = function ($event, grp_item, roleid) {
        
    //    alert(grp_item.group_id + ' ' + roleid);
    //    if (!$scope.grplist.ACCESS)
    //        $scope.grplist.ACCESS = new Array();

    //    var Chkbox = $event.target;

    //    if (Chkbox.checked) {
    //        var newformlist = {
    //            "group_id": grp_item.group_id,
    //            "role_id": roleid,
    //        };
    //        $scope.grplist.ACCESS.push(newformlist);
    //    }
    //    else {
    //        for (var i = 0; i < $scope.grplist.ACCESS.length; i++) {
    //            if ($scope.grplist.ACCESS[i].group_id == grp_item.group_id) {
    //                $scope.grplist.ACCESS.splice(i, 1);
    //                break;
    //            }
    //        }
    //    }

    //    $scope.selaccesslists = angular.toJson($scope.grplist);
    //    alert($scope.selaccesslists);

    //};

    // add new option to the field
    $scope.clickSaveSectDetails = function (forms) {
        $('#fountainG').show();
        //if (! $scope.forms.form.Question_List)
        //     $scope.forms.form.Question_List = new Array();

        //alert( $scope.forms.form.Question_List.length);

        //alert(question.q_id);
        //for (var i = 0; i <  $scope.forms.form.Question_List.length; i++) {
        //    //alert( $scope.forms.formList.length);
        //    if ( $scope.forms.form.Question_List[i].q_id == question.q_id) {
        //         $scope.forms.form.Question_List.splice(i, 1);
        //        break;
        //    }
        //}

        //for (var i = 0; i <  $scope.forms.form.Question_List.length; i++) {
            
        //     $scope.forms.form.Question_List.splice(i, 1);

        //    var newformlist = {
        //        "q_id": String($scope.q_id),
        //        "type_id": String($scope.calc_typeid),
        //        "link_q_id": String($scope.link_q_id),
        //        "ca_answer_id": String($scope.ca_answer_id)
        //    };

        //   break;
        //}

        // $scope.forms.form.Question_List.push(newformlist);
        
        //delete $scope.sel_formquestionlists.question_text;
      
        for (var i = 0; i < forms.form.formsectiondetails.Questions.Question_List.length; i++) {
            delete forms.form.formsectiondetails.Questions.Question_List[i].question_text;
        }

        $scope.sel_formquestionlists = angular.toJson(forms.form.Questions);
        //angular.forEach($scope.sel_formquestionlists.Question_List, function (item) {
        //    delete item.question_text;
               
        //});
        
        //$scope.showJson = true;
        //alert($scope.sel_formquestionlists);

        //alert($scope.sel_formquestionlists.length);

        var GetParamsFormDetail = new Object();
        GetParamsFormDetail.sectionID = $scope.SectionID;
        GetParamsFormDetail.sectionJSON = $scope.sel_formquestionlists;
        GetParamsFormDetail.user = 'SFAPPQC';


        ngFormBuilderService.AddFormDetail(GetParamsFormDetail).then(function (result) {
            $timeout(function () {
                $scope.outputdata = result.data[0].OutputData;
                $('#myModalfrmbldr').modal('show');
                //$scope.clickSection(GetParamsFormDetail.sectionID);
                //$scope.RefreshSectionlist();
                //$scope.previewMode = true;
            }, 250);
        },
                     function (result) {
                         $scope.outputdata = result.data[0].OutputData;
                         $('#myModalfrmbldr').modal('show');
                         //$scope.clickSection(GetParamsFormDetail.sectionID);
                     }
                     );
         
        $('#fountainG').hide();
    }

    $scope.RefreshSectionlist = function () {
         $scope.forms.form.formsectiondetails = new Array();
        ngFormBuilderService.GetFormSectionDetails($scope.formID).then(function (result) {
            $timeout(function () {
                if (result.data.length > 0) {
                    //$scope.previewMode = false;
                     $scope.forms.form.formsectiondetails = result.data;
                }
                else {
                    //$scope.previewMode = true;
                    $scope.outputdata = "No Sections available for the selected form. Please add!";
                    $('#myModalfrmbldr').modal('show');
                }

            }, 0);
        },
    function () {
        $log.error('Error');
        $scope.outputdata = "Error Occured! - Loding section Details. Please contact Admin!";
        $('#myModalfrmbldr').modal('show');
    }
      );
    }
    
    // preview form
    $scope.previewOn = function () {
        $scope.forms = {};
        $scope.forms.form = {};

        if (! $scope.forms.form.formdetails)
             $scope.forms.form.formdetails = new Array();

        ngFormBuilderService.GetDocLayout($scope.formID, 0, 0, 0, 0).then(function (result) {
            $timeout(function () {
                //$scope.form.formdetails.push(angular.toJson(result.data));
                 $scope.forms.form = result.data;
                $scope.previewMode = !$scope.previewMode;                
                 $scope.forms.form.submitted = false;
               // alert(angular.toJson($scope.previewForm));
                angular.copy( $scope.forms.form, $scope.previewForm);
                //angular.copy($scope.forms.questions, $scope.previewQuestions.question)
                //angular.copy($scope.forms.questions, $scope.previewQuestions.question)
                //alert(angular.toJson($scope.previewForm));
                }, 0);
            },
        function () {
            $log.error('Error');
            $scope.outputdata = "Error Occured! - Loding section Details. Please contact Admin!";
            $('#myModalfrmbldr').modal('show');
        });

      
        
    }

    // hide preview form, go back to create mode
    $scope.previewOff = function () {
        $scope.previewMode = !$scope.previewMode;
        $scope.forms.submitted = false;
    }

    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field) {
        if (field.field_type === "radio" || field.field_type === "dropdown")
            return true;
        else
            return false;
    }

    // deletes all the fields
    $scope.reset = function () {
        $scope.form.formsectiondetails.Questions.Question_List.splice(0, $scope.forms.form.formsectiondetails.Questions.Question_List.length);
        $scope.QuestionList.lastAdedID = 0;
    }
    
    $scope.setSelected = function (selectedRow) {
        $scope.selectedRow = selectedRow;
    };

    $('.fap-links').click(function () {
        //$(this).find('i').toggleClass('fa-plus fa-minus')

        if ($('#faicon').hasClass("fa fa-plus")) {
            $('#faicon').toggleClass('fa-plus fa-minus');
            $scope.dvGroupAddEdit = false;
        }
        else {
            $('#faicon').toggleClass('fa-minus fa-plus');
            $scope.dvGroupAddEdit = true;
        } 
    });

    // add the animation to the modal
    //$(".modal").each(function (index) {
    //    $(this).on('show.bs.modal', function (e) {
    //        var open = $(this).attr('data-easein');
    //        if (open == 'shake') {
    //            $('.modal-dialog').velocity('callout.' + open);
    //        } else if (open == 'pulse') {
    //            $('.modal-dialog').velocity('callout.' + open);
    //        } else if (open == 'tada') {
    //            $('.modal-dialog').velocity('callout.' + open);
    //        } else if (open == 'flash') {
    //            $('.modal-dialog').velocity('callout.' + open);
    //        } else if (open == 'bounce') {
    //            $('.modal-dialog').velocity('callout.' + open);
    //        } else if (open == 'swing') {
    //            $('.modal-dialog').velocity('callout.' + open);
    //        } else {
    //            $('.modal-dialog').velocity('transition.' + open);
    //        }

    //    });
    //});     
});
