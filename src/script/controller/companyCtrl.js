'use strict';

angular.module('app').controller('companyCtrl',['$state','$scope','$http',function ($state,$scope,$http) {
    $http.get('data/company.json?id='+$state.params.id).then(function (res) {
        $scope.company = res.data;
        // console.log(res.data)
    }).catch(function (error) {

    })

}])
