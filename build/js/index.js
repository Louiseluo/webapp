'use strict';

angular.module('app',['ui.router','ngCookies']);

'use strict';

angular.module('app').controller('companyCtrl',['$state','$scope','$http',function ($state,$scope,$http) {
    $http.get('data/company.json?id='+$state.params.id).then(function (res) {
        $scope.company = res.data;
        // console.log(res.data)
    }).catch(function (error) {

    })

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


'use strict';

angular.module('app').controller('searchCtrl',['$http','$scope',function ($http,$scope) {
    $http.get('data/positionList.json').then(function (res) {
        $scope.positionList = res.data;
    }).catch(function (error) {
        console.log(error)
    })

}])

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
    }).state('search',{
        url:'/search',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    });

    $urlRouterProvider.otherwise('main')
}])

'use strict';

angular.module('app').directive('appCompany',[function () {
    return{
        restrict:'A',
        replace:true,
        scope:{
            com:'='
        },
        templateUrl:'view/template/company.html',
    }
}])

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

'use strict';

angular.module('app').directive('appSheet',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/sheet.html'
    }
}])

'use strict';

angular.module('app').directive('appTab',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tab.html',
    }
}])

'use strict';
angular.module('app')
    .factory('cache',['$cookies',function ($cookies) {
        return{
            put: function (key, value) {
              $cookies.put(key,value);
            },
            get: function (key) {
              return $cookies.get(key);
            },
            remove: function (key) {
              $cookies.remove(key);
            },
        }
    }]);
/*    .service('cache',['$cookies',function ($cookies) {
    this.put=function (key, value) {
        $cookies.put(key,value);
    };
    this.get = function (key) {
        return $cookies.get(key);
    };
    this.remove = function (key) {
        $cookies.remove(key);
    };
}])*/
