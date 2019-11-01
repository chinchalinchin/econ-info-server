const endpoints = {
    host: 'http://localhost:8001/',
    tickers: 'api/tickers/',
    closing_price: 'api/closingPrice/'
}

var services_module = angular.module('factories', [])

services_module
    .factory('logger_factory', [function(){
        var logs = [];
        var log = function log(msg, route){
            const now = new Date().toLocaleTimeString();
            thisLog = `app: ${route}: ${now}: ${msg}`
            console.log(thisLog);      
            logs.push(thisLog)
        };
        var getLogs = function getLogs(){
            return logs;
        };
        return{
            log: log,
            logs: getLogs
        };
    }])

    .factory('price_factory', [ 'logger_factory','$http', function(logger_factory, $http){
        var getTickers = function(){
            logger_factory.log('Retrieving Tickers From Node Server', "price_factory.getTickers");
            var url = endpoints.host.concat(endpoints.tickers);
            return $http.get(url).then(function(response){
                new_response = response.data;
                return new_response;
            })
            .catch(function(err){
                logger_factory.log(err, 'price_factory.getTickers');
            })
        };
        var getClosingPrice = function(ticker){
            logger_factory.log(`Retrieving Closing Price For ${ticker} From Node Server`, 'price_factory.getClosingPirce');
            var url = endpoints.host.concat(endpoints.closing_price).concat(ticker);
            return $http.get(url).then(function(response){
                new_response = response.data;
                logger_factory.log(`Response: ${ticker} Date: ${new_response.date}`, "price_factory.getClosingPrice")
                logger_factory.log(`Response: ${ticker} Price: ${new_response.price}`, "price_factory.getClosingPrice")
                return new_response;
            })
            .catch(function(err){
                logger_factory.log(err, 'price_factory.getClosingPrice');
            })
        };
        var getPriceByDate = function (ticker, date){ };
        return{
            getTickers: getTickers,
            getClosingPrice: getClosingPrice,
            getPriceByDate: getPriceByDate
        };
    }])