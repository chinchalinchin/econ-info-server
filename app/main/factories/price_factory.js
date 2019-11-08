function price_factory(logger_factory, context_factory, $http){
    
    logger_factory.log('Initializing', 'price_factory');

    var getName = function() { return `${application_properties.price_factory} price_factory`};

    var getPrice = function(ticker){
        logger_factory.log(`Retrieving Price For ${ticker} From Node Server`, 'price_factory.getPirce');
        var url = context_factory.getDailyCloseUrl(ticker);
        logger_factory.log(`Using context_factory url: ${url}`, 'price_factory.getPrice');
        return $http.get(url).then(function(response){
            new_response = response.data;
            logger_factory.log(`Response: ${ticker} Date: ${new_response.date}`, "price_factory.getPrice");
            logger_factory.log(`Response: ${ticker} Price: ${new_response.value}`, "price_factory.getPrice");
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'price_factory.getPrice');
        });
    };

    var getStatistic = function (code) {
        logger_factory.log(`Retrieving Statistic For ${code} From Node Server`, 'price_factory.getStatistic');
        var url = application_properties.quandl_endpoints.host
                                            .concat(application_properties.quandl_endpoints.data.FRED)
                                            .concat(application_properties.quandl_endpoints.statistics)
                                            .concat(code)
        return $http.get(url).then(function(response){
            new_response = response.data;
            logger_factory.log(`Response: ${code} Date: ${new_response.date}`, "price_factory.getStatistic");
            logger_factory.log(`Response: ${code} Value: ${new_response.value}`, "price_factory.getStatistic");
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'price_factory.getStatistic')
        });
     };

    return{
        getName: getName,
        getPrice: getPrice,
        getStatistic: getStatistic
    };
}