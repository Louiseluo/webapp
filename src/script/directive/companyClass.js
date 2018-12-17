'use strict';

angular.module('app').directive('appCompanyClass',[function () {
    return{
        restrict:'A',
        replace:true,
        scope:{
            com:'='
        },
        templateUrl:'view/template/companyClass.html',

        link:function ($scope) {
            $scope.showPositionList = function (idx) {
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            };
            $scope.$watch('com',function (newval) {
                if(newval)$scope.showPositionList(0);
            })
        }
    }
}])
