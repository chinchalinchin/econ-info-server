var services_module = angular.module('factories', [])

services_module
    .factory('logger_factory', [logger_factory])

    .factory('quandl_factory', [ 'logger_factory','$http', quandl_factory])