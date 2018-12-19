'use strict';

angular.module('app',['ui.router','ngCookies']);

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
    }).state('login',{
        url:'/login',
        templateUrl:'view/login.html',
        controller:'loginCtrl'
    }).state('register',{
        url:'/register',
        templateUrl:'view/register.html',
        controller:'registerCtrl'
    }).state('me',{
        url:'/me',
        templateUrl:'view/me.html',
        controller:'meCtrl'
    }).state('favorite',{
        url:'/favorite',
        templateUrl:'view/favorite.html',
        controller:'favoriteCtrl'
    }).state('post',{
        url:'/post',
        templateUrl:'view/post.html',
        controller:'postCtrl'
    })

    $urlRouterProvider.otherwise('main')
}])

'use strict';

angular.module('app').controller('companyCtrl',['$state','$scope','$http',function ($state,$scope,$http) {
    $http.get('data/company.json?id='+$state.params.id).then(function (res) {
        $scope.company = res.data;
        // console.log(res.data)
    }).catch(function (error) {

    })

}])

'use strict';

angular.module('app').controller('favoriteCtrl',['dict','$http','$scope',function (dict,$http,$scope) {

}]);

'use strict';

angular.module('app').controller('loginCtrl',['dict','$http','$scope',function (dict,$http,$scope) {

}]);

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

angular.module('app').controller('meCtrl',['dict','$http','$scope',function (dict,$http,$scope) {

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

angular.module('app').controller('postCtrl',['dict','$http','$scope',function (dict,$http,$scope) {

}]);

'use strict';

angular.module('app').controller('meCtrl',['dict','$http','$scope',function (dict,$http,$scope) {

}]);

'use strict';

angular.module('app').controller('searchCtrl',['dict','$http','$scope',function (dict,$http,$scope) {
    $scope.name = '';
    $scope.search = function (name) {
        $http.get('data/positionList.json?name='+$scope.name).then(function (res) {
            $scope.positionList = res.data;
        }).catch(function (error) {
            console.log(error)
        });
    };
    $scope.search();
    $scope.sheet = {};
    $scope.tabList = [
        {
            id:'city',
            name:'城市'
        },
        {
            id:'salary',
            name:'薪资'
        },
        {
            id:'scale',
            name:'公司规模'
        },
    ];
    let tabId = '';
    $scope.tClick = function (id,name) {
        tabId = id;
        $scope.sheet.list = dict[id];
        $scope.sheet.visible = true;
    };
    $scope.filterObj = {};
    $scope.sClick = function (id, name) {
        if(id){
            angular.forEach($scope.tabList,function (item) {
                if(item.id === tabId){
                    item.name = name;
                }
            });
            $scope.filterObj[tabId+'Id']=id;
        } else {
            delete $scope.filterObj[tabId+'Id'];
            angular.forEach($scope.tabList,function (item) {
                if(item.id === tabId){
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪资';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                    }
                }
            })
        }

    }

}]);

'use strict';

angular.module('app').filter('filterByObj',[function () {
    return function (list, obj) {
        let result = [];
        angular.forEach(list,function (item) {
            let isEqual = true;
            for(let e in obj){
                if(item[e]!==obj[e]){
                    isEqual = false;
                }
            }
            if(isEqual){
                result.push(item);
            }
        });
        return result;
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
            data:'=',
            filterObj:'='
        }
    }
}])

'use strict';

angular.module('app').directive('appSheet',[function () {
    return{
        restrict:'A',
        replace:true,
        scope:{
            list:'=',
            visible:'=',
            select:'&'
        },
        templateUrl:'view/template/sheet.html'
    }
}])

'use strict';

angular.module('app').directive('appTab',[function () {
    return{
        restrict:'A',
        replace:true,
        scope:{
            list:'=',
            tabClick:'&'
        },
        templateUrl:'view/template/tab.html',
        link:function ($scope) {
            $scope.click = function (tab) {
                $scope.selectId = tab.id;
                $scope.tabClick(tab);
            }
            // $scope.click("city");
        }

    }
}])
