function app_factory(logger_factory, $rootScope){
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

    return {
        getDebug: getDebug,
        setDebug: setDebug
    }
}