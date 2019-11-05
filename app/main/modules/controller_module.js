var main_module = angular.module('finneas_stockholm')

main_module
    .controller('logger_controller', 
                    ['logger_factory', 
                        logger_controller]
                )
    .controller('quandl_controller', 
                    ['quandl_factory', 'logger_factory',
                        market_controller]
                )