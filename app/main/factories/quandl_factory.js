function quandl_factory(logger_factory, $http){
    
    logger_factory.log('Initializing', 'quandl_factory');

    var getTickers = function(){
        logger_factory.log('Retrieving Tickers From Node Server', "quandl_factory.getTickers");
        var url = resource_endpoints.tickers;
        return $http.get(url).then(function(response){
            logger_factory.log("Response Received From Node Server", "quandl_factory.getTickers")
            new_response = response.data;
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'quandl_factory.getTickers');
        });
    };

    var getCodes = function(){
        logger_factory.log('Retrieving Codes From Node Server', "quandl_factory.getCodes")
        var url = quandl_endpoints.host.concat(quandl_endpoints.data.FRED)
                                        .concat(quandl_endpoints.codes);
        return $http.get(url).then(function(response){
            logger_factory.log("Response Received From Node Server", "quandl_factory.getCodes")
            new_response = response.data;
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'quandl_factory.getCodes');
        });
    }

    var getPrice = function(ticker){
        logger_factory.log(`Retrieving Price For ${ticker} From Node Server`, 'quandl_factory.getPirce');
        var url = quandl_endpoints.host.concat(quandl_endpoints.data.WIKI)
                                        .concat(quandl_endpoints.daily_close)
                                        .concat(ticker);
        return $http.get(url).then(function(response){
            new_response = response.data;
            logger_factory.log(`Response: ${ticker} Date: ${new_response.date}`, "quandl_factory.getPrice");
            logger_factory.log(`Response: ${ticker} Price: ${new_response.price}`, "quandl_factory.getPrice");
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'quandl_factory.getPrice');
        });
    };

    var getStatistic = function (code) {
        logger_factory.log(`Retrieving Statistic For ${code} From Node Server`, 'quandl_factory.getStatistics');
        var url = quandl_endpoints.host.concat(quandl_endpoints.data.FRED)
                                        .concat(quandl_endpoints.statistics)
                                        .concat(code)
        return $http.get(url).then(function(response){
            new_response = response.data;
            logger_factory.log(`Response: ${code} Date: ${new_response.date}`, "quandl_factory.getStatistic");
            logger_factory.log(`Response: ${code} Value: ${new_response.value}`, "quandl_factory.getStatistic");
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'quandl_factory.getStatistic')
        });
     };

    return{
        getCodes: getCodes,
        getTickers: getTickers,
        getPrice: getPrice,
        getStatistic: getStatistic
    };
}