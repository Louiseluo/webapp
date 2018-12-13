'use strict';

angular.module('app').directive('appCompanyClass',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/companyClass.html',
    }
}])
