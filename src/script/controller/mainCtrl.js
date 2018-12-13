'use strict';
angular.module('app').controller('mainCtrl',['$http','$scope',function ($http,$scope) {
    $http.get('/data/positionList.json').then(function (res) {
        $scope.list = res.data
    }).catch(function (error) {
        console.log(error)
    })
    /*$scope.list = [
        {
            id:'1',
            imgSrc:'image/company-3.png',
            name:'销售',
            companyName:'千度',
            city:'上海',
            industry:'互联网',
            time:'2016-06-01 11：05',
        },
        {
            id:'2',
            imgSrc:'image/company-1.png',
            name:'web前端',
            companyName:'慕课网',
            city:'北京',
            industry:'互联网',
            time:'2016-06-01 11：05',
        },

    ]*/
}]);
