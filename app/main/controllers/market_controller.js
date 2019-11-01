function market_controller(price_factory, logger_factory){
    var self = this;
    self.initialized = false;
    
    var init = function(){
        if(!self.initialized){
            logger_factory.log("Initializing Market Controller", "market_controller.init")
            price_factory.getTickers().then(data=>{
                self.tickers = data;
                self.selection = null;
                self.clearable= false;
                self.stored = false;
                self.portfolio = {
                    tickers: [],
                    prices: [],
                    dates: [],
                    shares: []
                }
                self.initialized = true;
            })
        }
    };
    
    self.getClosingPrice = function(ticker){
        logger_factory.log("Retrieving Prices From price_factory", 
                            "market_controller.getClosingPrice")
        return price_factory.getClosingPrice(ticker)
    };

    self.getStoredPrice = function(ticker){
        var index = self.portfolio.tickers.indexOf(ticker);
        logger_factory.log(`Retrieving Stored Price For ${ticker}: ${self.portfolio.prices[index]}`, 
                            "market_controller.getStoredPrice")
        return self.portfolio.prices[index];
    }

    self.add = function(){
        logger_factory.log(`Adding ${self.selection} To Portfolio`, "market_controller.add")
        self.getClosingPrice(self.selection).then((date_and_price)=>{
            self.portfolio.prices.push(date_and_price.price);
            self.portfolio.dates.push(date_and_price.date);
            self.portfolio.tickers.push(self.selection);
            self.stored = true;
            self.selection = null;
            if(!self.clearable){ self.clearable = true; }
        })
        
    }

    self.clear = function(){
        logger_factory.log("Clearing Portfolio", "market_controller.clear")
        self.clearable = false;
        self.stored = false;
        self.selection = null; 
        self.portfolio = {
            tickers: [],
            prices: [],
            dates: [],
            shares: []
        }
    }

    init();
}