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
        logger_factory.log('Retrieving Tickers From Node Server', "app_factory.getTickers");
        var url = application_properties.resource_endpoints.tickers;
        return $http.get(url).then(function(response){
            logger_factory.log("Response Received From Node Server", "app_factory.getTickers")
            new_response = response.data;
            return new_response;
        })
        .catch(function(err){
            logger_factory.warn(`Response Error: Status ${err.status}: ${err.statusText}`, 'app_factory.getTickers');
        });
    };

    var getCodes = function(){
        logger_factory.log('Retrieving Codes From Node Server', "quandl_factory.getCodes")
        var url = application_properties.quandl_endpoints.host
                                                            .concat(application_properties.quandl_endpoints.data.FRED)
                                                            .concat(application_properties.quandl_endpoints.codes);
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