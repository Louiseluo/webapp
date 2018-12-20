'use strict';

angular.module('app').controller('registerCtrl',['$interval','dict','$http','$scope',function ($interval,dict,$http,$scope) {
    $scope.submit = function () {
        console.log($scope.user);
    };
    $scope.send = function () {
        $http.get('data/code.json').then(function (res) {
            console.log(res);
            $scope.time = '60s';
            if(1===res.data.state){
                let count = 60;
                let interval = $interval(function () {
                    if(count<=0){
                        $interval.cancel(interval);
                        $scope.time = '';
                        return;
                    }
                    count--;
                    $scope.time = count + 's'
                },1000)
            }
        })
    }
}]);
