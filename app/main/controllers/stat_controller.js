function stat_controller(stat_factory, logger_factory, app_factory){
    logger_factory.log("Initializing Controller Variables", "stat_controller")
    var self = this;
    self.clearable = false;
    self.stored = false;
    self.stat_add_clicks = 0;
    self.statistics = { stats: [], values: [], dates: []};
    self.codes = null;

    logger_factory.log("Initializing Code Data", "quandl_stat_controller")
    app_factory.getCodes().then(data=>{
        logger_factory.log("Codes Received From 'app_factory'", "stat_controller.getCodes");
        self.codes = data.codes;
    })
    .catch(function(err){
        logger_factory.warn(err, "stat_controller.getCodes");
    })

    self.getStoredValue = function(stat){
        var index = self.statistics.stats.indexOf(stat);
        if(index>0|| index == 0){
            logger_factory.log(`Retrieving Stored Value For ${stat}`, "stat_controller.getStoredValue")
            return self.statistics.values[index]
        }
        else{
            logger_factory.log(`Error: Could Not Find Stored Value For ${stat}`, "stat_controller.getStoredValue")
        }
    }

    self.getStoredDate = function(stat){
        var index = self.statistics.stats.indexOf(stat);
        if(index>0 ||index ==0){
            logger_factory.log(`Retrieving Stored Date For ${stat}`, "stat_controller.getStoredDate");
            return self.statistics.dates[index];
        }
        else{
            logger_factory.log(`Error: Coulf Not Find Stored Date For ${stat}`, "stat_controller.getStoredDate")
        }
    }

    self.getStatistic = function(stat){
        logger_factory.log(`Retrieving ${stat} Statistic From ${stat_factory.getName()}`, 
                            "stat_controller.getStatistic");
        return stat_factory.getStatistic(stat)
    }

    self.getDescription = function(stat){
        for(let entry of self.codes.growth){
            if(entry.code === stat){ return entry.description}; 
        }
        for(let entry of self.codes.prices_and_inflation){
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

    self.addStatistic = function(){
        if(!self.statistics.stats.includes(self.selection)){
            self.stat_add_clicks++;
            logger_factory.log(`Ading ${self.selection} To Statistics`, 
                                "stat_controller.addStatistic");
            self.getStatistic(self.selection).then(date_and_value =>{
                logger_factory.log(`Storing Returned ${self.selection} {date, value}: `+
                                    `{${date_and_value.date}, ${date_and_value.value}}`,
                                    "stat_controller.addStatistic")
                self.statistics.stats.push(self.selection);
                self.statistics.values.push(date_and_value.value);
                self.statistics.dates.push(date_and_value.date);
                self.stored = true;
                self.selection = null;
                if(!self.clearable) { self.clearable = true; }
            })
        }
        else{
            logger_factory.warn(`Error: Statistics Already Contains ${self.selection}`,
                                "stat_controller.addStatistic")
        }
    }

    self.clearStatistics = function(){
        logger_factory.log("Clearing Statistics", "stat_controller.clearStatistics")
        self.clearable = false;
        self.stored = false;
        self.selection = null; 
        self.stat_add_clicks = 0;
        self.statistics = { stats: [], values: [], dates: [] }
    }
}