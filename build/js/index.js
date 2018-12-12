'use strict';

angular.module('app',['ui.router']);

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
angular.module('app').controller('mainCtrl',['$scope',function ($scope) {
    $scope.list = [
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

    ]
}]);

'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main',{
        url: '/main',
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    });
    $urlRouterProvider.otherwise('main')
}])
