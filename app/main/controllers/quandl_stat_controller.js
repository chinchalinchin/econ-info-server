function quandl_stat_controller(quandl_factory, logger_factory){
    logger_factory.log("Initializing Controller Variables", "quandl_stat_controller")
    var self = this;
    self.selection = null;
    self.clearable = false;
    self.stored = false;
    self.stat_add_clicks = 0;
    self.statistics = { stat: [], value: [] };

    logger_factory.log("Initializing Code Data", "quandl_stat_controller")
    quandl_factory.getCodes().then(data=>{
        logger_factory.log("Code Date Received From 'quandl_stat_factory'", "quandl_stat_controller.getCodes");
        self.codes = data;
    })
    .catch(function(err){
        logger_factory.warn(err, "quandl_stat_controller.getCodes");
    })

    self.getDescription = function(stat){
        for(let entry of self.codes.growth){
            if(entry.code === stat){ return entry.description}; 
        }
        for(let entry of self.codes.prices_and_inflaction){
            if(entry.code === stat) { return entry.description}
        }
        for(let entry of self.codes.money_supply){
            if(entry.code === stat) { return entry.description}
        }
        for(let entry of self.codes.interest_rates){
            if(entry.code === stat){ return entry.description }
        }
        for(let entry of self.codes.employment){
            if(entry.code === stat) { return entry.description }
        }
        for(let entry of self.codes.income_and_expenditure){
            if(entry.code === stat) { return entry.description }
        }
        for(let entry of self.codes.debt){
            if(entry.code === stat) { return entry.description }
        }
        for(let entry of self.codes.other_indicators){
            if(entry.code === stat) { return entry.description }
        }
        return "Not Found";
    }
}