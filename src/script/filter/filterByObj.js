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
