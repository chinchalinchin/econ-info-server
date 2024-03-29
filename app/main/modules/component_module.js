var main_module = angular.module('finneas_stockholm')

console.log('Registering Components...')
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
    .component('economicItem', {
        templateUrl: 'economic-item.html',
        bindings:{
            code:'=',
            value:'=',
            desc:'=',
            date:'='
        }
    })
    .component('economicFormatter', {
        templateUrl: 'economic-formatter.html',
        bindings:{
            code:'=',
            value:'='
        }
    })
    .component('economicOptions', {
        templateUrl: 'economic-options.html',
        bindings:{
            codes:'='
        }
    })
    .component('userInfo', {
        templateUrl: 'user-info.html',
    })
    .component('logger',{
        templateUrl: 'logger.html'
    }); 

