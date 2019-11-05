function quandl_factory(logger_factory, $http){
    
    var getTickers = function(){
        logger_factory.log('Retrieving Tickers From Node Server', "quandl_ price_factory.getTickers");
        var url = quandl_endpoints.host.concat(quandl_endpoints.data.WIKI)
                                        .concat(quandl_endpoints.tickers);
        return $http.get(url).then(function(response){
            logger_factory.log("Response Received From Node Server", "quandl_price_factory.getTickers")
            new_response = response.data;
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'price_factory.getTickers');
        })
    };

    var getClosingPrice = function(ticker){
        logger_factory.log(`Retrieving Closing Price For ${ticker} From Node Server`, 'quandl_price_factory.getClosingPirce');
        var url = quandl_endpoints.host.concat(quandl_endpoints.data.WIKI)
                                        .concat(quandl_endpoints.closing_price)
                                        .concat(ticker);
        return $http.get(url).then(function(response){
            new_response = response.data;
            logger_factory.log(`Response: ${ticker} Date: ${new_response.date}`, "price_factory.getClosingPrice")
            logger_factory.log(`Response: ${ticker} Price: ${new_response.price}`, "price_factory.getClosingPrice")
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'price_factory.getClosingPrice');
        })
    };

    var getPriceByDate = function (ticker, date){ };

    return{
        getTickers: getTickers,
        getClosingPrice: getClosingPrice,
        getPriceByDate: getPriceByDate
    };
}