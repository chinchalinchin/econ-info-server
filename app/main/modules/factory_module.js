const endpoints = {
    host: 'http://localhost:8001/',
    tickers: 'api/tickers/',
    closing_price: 'api/closingPrice/'
}

var services_module = angular.module('factories', [])

services_module
    .factory('logger_factory', [logger_factory])

    .factory('price_factory', [ 'logger_factory','$http', price_factory])