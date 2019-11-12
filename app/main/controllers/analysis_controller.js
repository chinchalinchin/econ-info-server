// Note: self.ticker is initialized in ng-init in HTML template

function analysis_controller(logger_factory, price_factory){
    var self = this;
    self.analyzed = false;

    self.getMA20 = function(transform){
        self.MA20 = price_factory.getMovingAverage(self.ticker, 20, transform);
    };
    
    self.getMA50 = function(transform){
        self.MA50 = price_factory.getMovingAverage(self.ticker, 50, transform);
    }

    self.analyze = function(){
        console.log('analyzed'); 
        self.analyzed = true; 
        self.getMA20(false);
        self.getMA50(false);
    }
    
    self.unanalyze = function(){
        self.analyzed = false;
        MA20 = null;
        MA50 = null;
    }
}