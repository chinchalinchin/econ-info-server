function app_factory(logger_factory, $http, $rootScope){
   
    logger_factory.log("Initializing", "app_factory")

    var debug = false;

    var getDebug = function(){ 
        return debug;
    }

    var setDebug = function(thisDebug){
        debug = thisDebug;
        logger_factory.log("Emitting 'app_update' Event", "app_factory.setDebug")
        $rootScope.$broadcast('app_update')
    }

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

    return {
        getTickers: getTickers,
        getCodes: getCodes,
        getDebug: getDebug,
        setDebug: setDebug
    }
}