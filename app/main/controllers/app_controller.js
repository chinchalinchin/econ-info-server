function app_controller(logger_factory, app_factory, $scope){
    logger_factory.log('Initializing', "app_controller")
    var self = this;
    self.debug = app_factory.getDebug();
    
    logger_factory.log("Registering app_controller to listen on 'app_update' event stream",
                        "app_controller")         
    $scope.$on('app_update', function(){
        buffer = self.debug;
        self.debug = app_factory.getDebug();
        logger_factory.log(`Updating Debug Control From ${buffer} to ${self.debug}`, 
                            'app_update event stream')
    })

    self.debugger = function(setter){
        logger_factory.log(`Setting Debug Control In 'app_factory' To ${setter}`, 
                            "app_controller.debugger")
        app_factory.setDebug(setter);
    } 

    self.navbarClick= function(){
        $scope.$broadcast('navbar_click')
    }
}