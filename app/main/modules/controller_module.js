var main_module = angular.module('finneas_stockholm')

console.log('Registering Controllers...')
main_module
    .controller('logger_controller', 
                    ['logger_factory', 
                        logger_controller]
                )
    .controller('app_controller', 
                    ['logger_factory', 'app_factory', '$scope',
                        app_controller])
    .controller('quandl_price_controller', 
                    ['quandl_factory', 'logger_factory', 'app_factory',
                        quandl_price_controller]
                )
    .controller('quandl_stat_controller',
                    ['quandl_factory', 'logger_factory', 'app_factory',
                        quandl_stat_controller])