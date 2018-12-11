'use strict';
angular.module('app').directive('appHead',[function () {
    return{
        restrict:'A',//A:属性，E：元素，M：样式，C：注释（已属性的方式调用指令）
        replace:true,//指令只能有一个根元素
        templateUrl:'view/template/head.html'
    }
}])
