function quandl_factory(logger_factory, $http){
    
    logger_factory.log('Initializing', 'quandl_factory');

    var getPrice = function(ticker){
        logger_factory.log(`Retrieving Price For ${ticker} From Node Server`, 'quandl_factory.getPirce');
        var url = quandl_endpoints.host.concat(quandl_endpoints.data.WIKI)
                                        .concat(quandl_endpoints.daily_close)
                                        .concat(ticker);
        console.log(url);
        return $http.get(url).then(function(response){
            console.log(response.data);
            new_response = response.data;
            logger_factory.log(`Response: ${ticker} Date: ${new_response.date}`, "quandl_factory.getPrice");
            logger_factory.log(`Response: ${ticker} Price: ${new_response.value}`, "quandl_factory.getPrice");
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'quandl_factory.getPrice');
        });
    };

    var getStatistic = function (code) {
        logger_factory.log(`Retrieving Statistic For ${code} From Node Server`, 'quandl_factory.getStatistic');
        var url = quandl_endpoints.host.concat(quandl_endpoints.data.FRED)
                                        .concat(quandl_endpoints.statistics)
                                        .concat(code)
        console.log(url);
        return $http.get(url).then(function(response){
            console.log(response.data);
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
        getPrice: getPrice,
        getStatistic: getStatistic
    };
}