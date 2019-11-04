var main_module = angular.module('finneas_stockholm')

main_module
    .controller('logger_controller', 
                    ['logger_factory', 
                        logger_controller]
                )
    .controller('market_controller', 
                    ['price_factory', 'logger_factory',
                        market_controller]
                )