// MARKET_CONTROLLER
//
// METHODS
// self.init: 
// self.getClosingPrice:
// self.getStoredPrice:
// self.getStoredDate:
// self.add: Verifies selected stock isn't already included in portfolio and then
//           retrieves price information from server. Uses 'add_clicks' to verify
//           server call has been made before displaying price data in template.
// self.clear:

// FIELDS
// self.selection:
// self.clearable: 
// self.stored: Signals to the HTML that prices have returned 
// self.add_clicks: Used to verify the length of the portfolio equals the number of times
//                  a user has successfully clicked the 'Add Stock' button. Need to do
//                  this so HTML template binding can wait on asynchronous operation
// self.portfolio: A JSON containing information about the user's portfolio.
// self.tickers: A list of all tickers that can be accessed through the backend API.
function market_controller(price_factory, logger_factory){
    logger_factory.log("Initializing Controller Variables", "market_controller")
    var self = this;
    self.selection = null;
    self.clearable= false;
    self.stored = false;
    self.add_clicks = 0;
    self.portfolio = { tickers: [], prices: [], dates: [] }
    logger_factory.log("Initializing Ticker Data", "market_controller")
    price_factory.getTickers().then(data=>{
        self.tickers = data;
    })
    
    self.getClosingPrice = function(ticker){
        logger_factory.log("Retrieving Prices From 'price_factory", 
                            "market_controller.getClosingPrice");
        return price_factory.getClosingPrice(ticker);
    };

    self.getStoredPrice = function(ticker){
        var index = self.portfolio.tickers.indexOf(ticker);
        if(index > 0 || index === 0){
            logger_factory.log(`Retrieving Stored Price For ${ticker}: ${self.portfolio.prices[index]}`, 
                                "market_controller.getStoredPrice");
            return self.portfolio.prices[index];
        }
        else{
            logger_factory.warn(`Error: Could Not Find Stored Price for ${ticker}`,
                                "market_controller.getStoredPrice")
            return null;
        }
    }

    self.getStoredDate = function(ticker){
        var index = self.portfolio.tickers.indexOf(ticker);
        if(index > 0 || index == 0){
            logger_factory.log(`Retrieving Stored Date For ${ticker}: ${self.portfolio.dates[index]}`,
                                "market_controller.getStoredDate")
            return self.portfolio.dates[index];
        }
        else{
            logger_factory.warn(`Error: Could Not Find Stored Date for ${ticker}`,
                                "market_controller.getStoredDate");
            return null;
        }
    }

    self.add = function(){
        if(!self.portfolio.tickers.includes(self.selection)){
            self.add_clicks++;
            logger_factory.log(`Adding ${self.selection} To Portfolio`, "market_controller.add")
            self.getClosingPrice(self.selection).then((date_and_price)=>{
                logger_factory.log(`Storing Returned ${self.selection} {date, price}: ` + 
                                   `{${date_and_price.date}, ${date_and_price.price}}`,
                                    "market_controller.add")
                self.portfolio.prices.push(date_and_price.price);
                self.portfolio.dates.push(date_and_price.date);
                self.portfolio.tickers.push(self.selection);
                self.stored = true;
                self.selection = null;
                if(!self.clearable){ self.clearable = true; }
            })
        }
        else{
            logger_factory.warn(`Error: Portfolio Already Contained ${self.selection}`, 
                                    "market_controller.add");
        }
        
    }

    self.clear = function(){
        logger_factory.log("Clearing Portfolio", "market_controller.clear")
        self.clearable = false;
        self.stored = false;
        self.selection = null; 
        self.add_clicks = 0;
        self.portfolio = { tickers: [], prices: [], dates: [] }
    }

}