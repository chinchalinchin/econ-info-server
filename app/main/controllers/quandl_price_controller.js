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
// self.selection: Binded to drop-down menu input. Used when the user clicks the 
//                  'add' button to pass user input to controller.
// self.clearable: 
// self.stored: Signals to the HTML that prices have returned 
// self.add_clicks: Used to verify the length of the portfolio equals the number of times
//                  a user has successfully clicked the 'Add Stock' button. Need to do
//                  this so HTML template binding can wait on asynchronous operation
// self.portfolio: A JSON containing information about the user's portfolio.
// self.tickers: A list of all tickers that can be accessed through the backend API.
function quandl_price_controller(quandl_factory, logger_factory){
    logger_factory.log("Initializing Controller Variables", "quandl_price_controller")
    var self = this;
    self.selection = null;
    self.clearable= false;
    self.stored = false;
    self.portfolio_add_clicks = 0;
    self.portfolio = { tickers: [], prices: [], dates: [] }
    
    logger_factory.log("Initializing Ticker Data", "market_controller")
    quandl_factory.getTickers().then(data=>{
        logger_factory.log("Tickers Received From 'quandl_factory'", "quandl_price_controller.getTickers");
        self.tickers = data;
    })
    .catch(function(err){
        logger_factory.warn(err, "quandl_controller.getTickers");
    });
    
    self.getPrice = function(ticker){
        logger_factory.log(`Retrieving ${ticker} Price From 'quandl_factory'`, "quandl_price_controller.getPrice");
        return quandl_factory.getPrice(ticker);
    };

    self.getPriceDescription = function(ticker){
        logger_factory.log(`Retrieving Description For ${ticker}`, "quandl_price_controller.getPriceDescription");
        for(let tick of self.tickers){
            if(tick.code === ticker){
                return tick.name;
            }
        }
        logger_factory.log(`No Description For ${ticker}`, "quandl_price_controller.getPriceDescription");
        return "No Description Found";
    }

    self.getStoredPrice = function(ticker){
        var index = self.portfolio.tickers.indexOf(ticker);
        if(index > 0 || index === 0){
            logger_factory.log(`Retrieving Stored Price For ${ticker}: ${self.portfolio.prices[index]}`, 
                                "quandl_price_controller.getStoredPrice");
            return self.portfolio.prices[index];
        }
        else{
            logger_factory.warn(`Error: Could Not Find Stored Price for ${ticker}`,
                                "quandl_price_controller.getStoredPrice")
            return null;
        }
    }

    self.getStoredDate = function(ticker){
        var index = self.portfolio.tickers.indexOf(ticker);
        if(index > 0 || index == 0){
            logger_factory.log(`Retrieving Stored Date For ${ticker}: ${self.portfolio.dates[index]}`,
                                "quandl_price_controller.getStoredDate")
            return self.portfolio.dates[index];
        }
        else{
            logger_factory.warn(`Error: Could Not Find Stored Date for ${ticker}`,
                                "quandl_price_controller.getStoredDate");
            return null;
        }
    }

    self.addToPortfolio = function(){
        if(!self.portfolio.tickers.includes(self.selection)){
            self.portfolio_add_clicks++;
            logger_factory.log(`Adding ${self.selection} To Portfolio`, "quandl_price_controller.addToPortfolio")
            self.getPrice(self.selection).then((date_and_price)=>{
                logger_factory.log(`Storing Returned ${self.selection} {date, price}: ` + 
                                   `{${date_and_price.date}, ${date_and_price.price}}`,
                                    "quandl_price_controller.addToPortfolio")
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
                                    "quandl_price_controller.addToPortfolio");
        }
        
    }

    self.clearPortfolio = function(){
        logger_factory.log("Clearing Portfolio", "quandl_price_controller.clearPortfolio")
        self.clearable = false;
        self.stored = false;
        self.selection = null; 
        self.portfolio_add_clicks = 0;
        self.portfolio = { tickers: [], prices: [], dates: [] }
    }

}