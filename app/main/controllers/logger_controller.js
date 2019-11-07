function logger_controller(logger_factory){
    
    logger_factory.log('Initializing', "logger.controller");

    var self = this;

    self.logs = logger_factory.logs()

    self.log = function(msg){
        logger_factory.log(msg);
    };

    self.warn = function(msg){
        logger_factory.warn(msg);
    }

}