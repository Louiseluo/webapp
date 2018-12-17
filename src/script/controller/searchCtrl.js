'use strict';

angular.module('app').controller('searchCtrl',['$http','$scope',function ($http,$scope) {
    $http.get('data/positionList.json').then(function (res) {
        $scope.positionList = res.data;
    }).catch(function (error) {
        console.log(error)
    })

}])
