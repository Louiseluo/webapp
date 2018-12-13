'use strict';

angular.module('app').controller('positionCtrl',['$http','$state','$scope',function ($http,$state,$scope) {
    $scope.isLogin = false;
    $http.get('/data/position.json?id='+$state.params.id).then(function (res) {
        console.log(res)
        $scope.position = res.data
    })

}])

