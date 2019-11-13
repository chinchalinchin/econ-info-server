// Note: self.ticker is initialized in ng-init in HTML template

function analysis_controller(logger_factory, price_factory){
    var self = this;
    self.analyzed = false;

    self.getMA20 = function(transform){
        price_factory.getMovingAverage(self.ticker, 20, transform).then((data)=>{
            self.MA20 = data;
        })
    };
    
    self.getMA50 = function(transform){
        price_factory.getMovingAverage(self.ticker, 50, transform).then((data)=>{
            self.MA50 = data;
        })
    }

    self.getMA100 = function(transform){
        price_factory.getMovingAverage(self.ticker, 100, transform).then((data)=>{
            self.MA100 = data;
        })
    }

    self.analyze = function(){
        self.getMA20(false);
        self.getMA50(false);
        self.getMA100(false);
        self.analyzed = true; 
    }
    
    self.unanalyze = function(){
        self.analyzed = false;
        self.MA20 = null;
        self.MA50 = null;
        self.MA100 = null;
    }
}