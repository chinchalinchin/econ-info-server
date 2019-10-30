var main_module = angular.module('finneas_stockholm', ['factories'])

main_module
    .controller('market_controller', ['$scope','price_factory', function($scope, price_factory){
        price_factory.getTickers().then(data=>{
            $scope.tickers = data;
        })
        
        $scope.selection = 'FB';

        $scope.getClosingPrice = function(ticker){
            price_factory.getClosingPrice(ticker).then(data=>{
                return data;
            });
        };

    }])
    .component('stockTab', {
        templateUrl: 'stock-tab.html',
        bindings:{
            ticker:'='
        },
        controller: 'market_controller'
    });
