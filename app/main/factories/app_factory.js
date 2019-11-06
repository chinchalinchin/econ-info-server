function app_factory(logger_factory, $rootScope){
    logger_factory.log("Initializing", "app_factory")
    var self = this;
    var debug = false;

    var getDebug = function(){ 
        return self.debug;
    }

    var setDebug = function(thisDebug){
        self.debug = thisDebug;
        logger_factory.log("Emitting 'app_update' Event", "app_factory.setDebug")
        $rootScope.$broadcast('app_update')
    }

    return {
        getDebug: getDebug,
        setDebug: setDebug
    }
}