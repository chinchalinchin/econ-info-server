var main_module = angular.module('finneas_stockholm')

main_module
    .controller('market_controller', ['price_factory', function(price_factory){
        var self = this;
        self.selection;
        self.clearable= false;
        self.portfolio = [];
        
        price_factory.getTickers().then(data=>{
            self.tickers = data;
        })

        self.getClosingPrice = function(ticker){
            price_factory.getClosingPrice(ticker).then(data=>{
                return data;
            });
        };

        self.add = function(){
            self.portfolio.push(self.selection);
            self.selection = null;
            if(!self.clearable){ self.clearable = true; }
        }

        self.clear = function(){
            self.clearable = false;
            self.portfolio = []
            self.selection = null; 
        }
    }
])