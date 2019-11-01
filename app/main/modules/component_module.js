var main_module = angular.module('finneas_stockholm')

main_module
    .component('stockTab', {
        templateUrl: 'stock-tab.html',
        bindings:{
            ticker:'=',
            price:'='
        }
    }
); 

