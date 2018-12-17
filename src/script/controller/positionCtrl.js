'use strict';

angular.module('app').controller('positionCtrl',['$q','$http','$state','$scope','cache',function ($q,$http,$state,$scope,cache) {
    $scope.isLogin = false;
    cache.put('mine','select')
    function getPosition(){
        var def = $q.defer();
        $http.get('/data/position.json?id='+$state.params.id).then(function (res) {
            $scope.position = res.data
            def.resolve(res.data);
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    }
    function getCompany(id){
        $http.get('data/company.json?id='+id).then(function (res) {
            $scope.company = res.data;
        })
    }
    getPosition().then(function (obj) {
        getCompany(obj.companyId)
    });


}])

