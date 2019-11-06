var main_module = angular.module('finneas_stockholm')

main_module
    .component('equityItem', {
        templateUrl: 'equity-item.html',
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

