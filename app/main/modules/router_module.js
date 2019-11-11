var main_module = angular.module('finneas_stockholm')

console.log("Registering Routes...")
main_module.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/portfolio', {
            templateUrl: 'portfolio-tab.html'
        })
        .when('/economic', {
            templateUrl: 'economic-tab.html'
        })
        .when('/welcome',{
            templateUrl:'splash-tab.html'
        })
        .otherwise({redirectTo: '/welcome'})
}])