var main_module = angular.module('finneas_stockholm')

main_module.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/portfolio', {
            templateUrl: 'portfolio-tab.html'
        })
    }])