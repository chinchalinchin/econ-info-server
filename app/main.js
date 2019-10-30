var main_module = angular.module('finneas_stockholm', ['services'])

main_module
    .controller('market_controller', ['$scope', 'price_service', function($scope, price_service){
    
        $scope.getClosingPrice = function(ticker){
            var price
            price_service.getClosingPrice(ticker).then(data=>{
                price = data;
                return price;
            });
        };

        price_service.getTickers().then(data=>{
            $scope.tickers = data;
        })
        
    }])
