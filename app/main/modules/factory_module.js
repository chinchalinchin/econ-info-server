var services_module = angular.module('factories', [])

console.log('Registering Factories...');
services_module
    .factory('logger_factory', 
                [logger_factory])
    .factory('context_factory',
                ['logger_factory', context_factory])
    .factory('app_factory', 
                ['logger_factory', '$http', '$rootScope', app_factory])
    .factory('price_factory', 
                ['logger_factory','context_factory','$http', price_factory])