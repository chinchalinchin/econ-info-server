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
    .controller('price_controller', 
                    ['price_factory', 'logger_factory', 'app_factory', '$scope',
                        price_controller]
                )
    .controller('stat_controller',
                    ['price_factory', 'logger_factory', 'app_factory', '$scope',
                        stat_controller])