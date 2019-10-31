const endpoints = {
    host: 'http://localhost:8001/',
    tickers: 'api/tickers/',
    closing_price: 'api/closingPrice/'
}

var services_module = angular.module('factories', [])

services_module
    .factory('price_factory', [ '$http', function($http){
            var getTickers = function(){
                var url = endpoints.host.concat(endpoints.tickers)
                return $http.get(url).then(function(response){
                    new_response = response.data;
                    return new_response;
                })
            };
            var getClosingPrice = function(ticker){
                var url = endpoints.host.concat(endpoints.closing_price).concat(ticker)
                return $http.get(url).then(function(response){
                    new_response = response.data;
                    return new_response;
                })
            };
            var getPriceByDate = function (ticker, date){ };
            return{
                getTickers: getTickers,
                getClosingPrice: getClosingPrice,
                getPriceByDate: getPriceByDate
            };
        }])