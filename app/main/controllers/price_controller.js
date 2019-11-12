// PRICE_CONTROLLER
//
// METHODS
// self.init:
// self.getTickers: 
// self.getPrice:
// self.getPriceDescription: 
// self.getStoredPrice:
// self.getStoredDate:
// self.addToPortfolio: 
//           Verifies selected stock isn't already included in portfolio and then
//           retrieves price information from server. Uses 'add_clicks' to verify
//           server call has been made before displaying price data in template.
// self.clearPortfolio:
// self.savePortfolio: 

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
function price_controller(price_factory, logger_factory, app_factory, $scope){
    var self = this;

    // EVENT LISTENERS
    $scope.$on('navbar_click', function(){

    });

    // CONTROLLER METHODS
    self.getTickers = function(){
        app_factory.getTickers().then(data=>{
            logger_factory.log(`Tickers Received From '${price_factory.getName()}'`, "price_controller.getTickers");
            self.tickers = data
        })
        .catch(function(err){
            logger_factory.warn(err, "price_controller.getTickers");
        });
    }
    
    self.getPrice = function(ticker){
        logger_factory.log(`Retrieving ${ticker} Price From '${price_factory.getName()}'`, "price_controller.getPrice");
        return price_factory.getPrice(ticker);
    };

    self.getPriceDescription = function(ticker){
        logger_factory.log(`Retrieving Description For ${ticker}`, "price_controller.getPriceDescription");
        for(let tick of self.tickers){
            if(tick.code === ticker){
                return tick.name;
            }
        }
        logger_factory.log(`No Description For ${ticker}`, "price_controller.getPriceDescription");
        return "No Description Found";
    }

    self.getStoredPrice = function(ticker){
        var index = self.portfolio.tickers.indexOf(ticker);
        if(index > 0 || index === 0){
            logger_factory.log(`Retrieving Stored Price For ${ticker}: ${self.portfolio.prices[index]}`, 
                                "price_controller.getStoredPrice");
            return self.portfolio.prices[index];
        }
        else{
            logger_factory.warn(`Error: Could Not Find Stored Price for ${ticker}`,
                                "price_controller.getStoredPrice")
            return null;
        }
    }

    self.getStoredDate = function(ticker){
        var index = self.portfolio.tickers.indexOf(ticker);
        if(index > 0 || index == 0){
            logger_factory.log(`Retrieving Stored Date For ${ticker}: ${self.portfolio.dates[index]}`,
                                "price_controller.getStoredDate")
            return self.portfolio.dates[index];
        }
        else{
            logger_factory.warn(`Error: Could Not Find Stored Date for ${ticker}`,
                                "price_controller.getStoredDate");
            return null;
        }
    }

    self.addToPortfolio = function(){
        if(!self.portfolio.tickers.includes(self.selection)){
            self.portfolio_add_clicks++;
            logger_factory.log(`Adding ${self.selection.code} To Portfolio`, "price_controller.addToPortfolio")
            self.getPrice(self.selection.code).then((date_and_price)=>{
                logger_factory.log(`Storing Returned ${self.selection.code} {date, price}: ` + 
                                   `{${date_and_price.date}, ${date_and_price.value}}`,
                                    "price_controller.addToPortfolio")
                self.portfolio.prices.push(date_and_price.value);
                self.portfolio.dates.push(date_and_price.date);
                self.portfolio.tickers.push(self.selection.code);
                self.stored = true;
                self.saved = false;
                self.selection = null;
                if(!self.clearable){ self.clearable = true; }
            })
        }
        else{
            logger_factory.warn(`Error: Portfolio Already Contained ${self.selection}`, 
                                    "price_controller.addToPortfolio");
        }
        
    }

    self.clearPortfolio = function(){
        logger_factory.log("Clearing Portfolio", "price_controller.clearPortfolio")
        self.clearable = false;
        self.stored = false;
        self.saved = false;
        self.selection = null; 
        self.portfolio_add_clicks = 0;
        self.portfolio = { tickers: [], prices: [], dates: [] }
    }

    self.savePortfolio = function(){
        logger_factory.log("Storing Portfolio In 'price_factory'", "price_controller.savePortfolio");
        price_factory.setPortfolio(self.portfolio);
        self.saved = true;
    };

    // CONSTRUCTOR
    self.init = function(){
        logger_factory.log("Initializing Ticker Data", "price_controller.init")
        self.tickers = null;
        self.getTickers();
        logger_factory.log("Initializing Portfolio", "price_controller.init")
        portfolio_store = price_factory.getPortfolio()
        logger_factory.log("Initializing Controller Variables", "price_controller.init");
        self.selection = null; 
        if(portfolio_store){ 
            self.portfolio = portfolio_store; 
            self.portfolio_add_clicks = self.portfolio.tickers.length;
            self.clearable= true;
            self.stored = true;
            self.saved = true;
        }
        else{ 
            self.portfolio = { tickers: [], prices: [], dates: [] };
            self.portfolio_add_clicks = 0;
            self.clearable= false;
            self.stored = false; 
            self.saved = false;
        };
    
    };

    self.init();

}