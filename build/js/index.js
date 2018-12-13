'use strict';

angular.module('app',['ui.router']);

'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main',{
        url: '/main',
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    }).state('position',{
        url:'/position/:id',
        templateUrl:'view/template/position.html',
        controller:'positionCtrl'
    }).state('company',{
        url:'/company/:id',
        templateUrl:'view/company.html',
        controller:'companyCtrl'
    });
    
    $urlRouterProvider.otherwise('main')
}])

'use strict';

angular.module('app').controller('companyCtrl',['$scope',function ($scope) {

}])

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

'use strict';

angular.module('app').controller('positionCtrl',['$http','$state','$scope',function ($http,$state,$scope) {
    $scope.isLogin = false;
    $http.get('/data/position.json?id='+$state.params.id).then(function (res) {
        console.log(res)
        $scope.position = res.data
    })

}])


'use strict';

angular.module('app').directive('appCompany',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/company.html',
    }
}])

'use strict';

angular.module('app').directive('appCompanyClass',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/companyClass.html',
    }
}])

'use strict';

angular.module('app').directive('appFoot',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    }
}])

'use strict';

angular.module('app').directive('appHead',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html'
    }
}])

'use strict';
 angular.module('app').directive('appHeadBar',[function () {
     return{
         restrict:'A',
         replace:true,
         templateUrl:'view/template/headBar.html',
         scope:{
             text:'@'
         },
         link:function (scope, element, attr) {
             scope.back = function () {
                 window.history.back();
             }
         }
     }
 }])

'use strict';

angular.module('app').directive('appPositionInfo',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isActive:'=',
            isLogin:'=',
            pos:'='
        },
        link:function ($scope) {
            $scope.imagePath = $scope.isActive?'image/star-active.png':'image/star.png';
        },
    }
}])

'use strict';

angular.module('app').directive('appPositionList',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'='
        }
    }
}])
