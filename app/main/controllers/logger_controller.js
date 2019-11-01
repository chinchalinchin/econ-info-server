function logger_controller(logger_factory){
    var self = this;

    self.log = function(msg){
        logger_factory.log(msg);
    };

    self.logs = function(){
        return logger_factory.logs();
    }

}