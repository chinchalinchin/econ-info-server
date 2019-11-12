function context_factory(logger_factory){

    var getDailyCloseUrl = function(ticker){
        var url;
        logger_factory.log(`Retrieving Daily Close Url For '${application_properties.price_factory} price_factory'`, 
                            'context_factory.getDailyCloseUrl')
        switch(application_properties.price_factory){
            case application_properties.price_factories.quandl:
                url = application_properties
                        .quandl_endpoints.host
                            .concat(application_properties.quandl_endpoints.data.WIKI)
                            .concat(application_properties.quandl_endpoints.daily_close)
                            .concat(ticker);
                break;
            case application_properties.price_factories.alpha_vantage:
                url = application_properties
                        .alpha_vantage_endpoints.host
                            .concat(application_properties.alpha_vantage_endpoints.daily_close)
                            .concat(ticker);
                break;
            default:
                url = application_properties
                        .quandl_endpoints.host
                            .concat(application_properties.quandl_endpoints.data.WIKI)
                            .concat(application_properties.quandl_endpoints.daily_close)
                            .concat(ticker);
                    break;
        }
        return url;
    }

    var getMovingAverageUrl = function(ticker, period, log){
        var url;
        logger_factory.log(`Retriving Moving Average Url for '${application_properties.price_factory} price factory`,
                            "context_factory.getMovingAverageUrl");
        switch(application_properties.price_factory){
            case application_properties.price_factories.alpha_vantage:
                url = application_properties
                        .alpha_vantage_endpoints.host   
                            .concat(application_properties.alpha_vantage_endpoints.moving_average)
                            .concat(ticker)
                            .concat(`?period=${period}`)
                            .concat(`&return=${log}`);
                break;
            default:
                url = application_properties
                        .alpha_vantage_endpoints.host   
                            .concat(application_properties.alpha_vantage_endpoints.moving_average)
                            .concat(ticker)
                            .concat(`?period=${period}`)
                            .concat(`&return=${log}`);
                break;
        }
        return url;
    }

    var getStatisticsUrl = function(code){
        return url = application_properties.quandl_endpoints.host
                            .concat(application_properties.quandl_endpoints.data.FRED)
                            .concat(application_properties.quandl_endpoints.statistics)
                            .concat(code)
    }

    return {
        getStatisticsUrl: getStatisticsUrl,
        getDailyCloseUrl: getDailyCloseUrl,
        getMovingAverageUrl: getMovingAverageUrl
    }

}