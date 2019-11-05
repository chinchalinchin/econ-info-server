var main_module = angular.module('finneas_stockholm')

main_module
    .component('stockItem', {
        templateUrl: 'stock-item.html',
        bindings:{
            ticker:'=',
            price:'=',
            desc:'=',
            date: '='
        }
    })
    .component('logger',{
        templateUrl: 'logger.html'
    }); 

