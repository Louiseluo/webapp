'use strict';
//创建全局变量
angular.module('app').value('dict',{}).run(['dict','$http',function (dict,$http) {
    $http.get('data/city.json').then(function (res) {
        dict.city = res.data;
    }).catch(function (error) {
        console.log(error)
    });

    $http.get('data/salary.json').then(function (res) {
        dict.salary = res.data;
    }).catch(function (error) {
        console.log(error)
    });

    $http.get('data/scale.json').then(function (res) {
        dict.scale = res.data;
    }).catch(function (error) {
        console.log(error)
    });
}])
