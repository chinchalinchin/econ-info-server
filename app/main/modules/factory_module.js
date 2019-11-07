var services_module = angular.module('factories', [])

console.log('Registering Factories...');
services_module
    .factory('logger_factory', 
                [logger_factory])
    .factory('app_factory', 
                ['logger_factory', '$http', '$rootScope', app_factory])
    .factory('quandl_factory', 
                ['logger_factory','$http', quandl_factory])