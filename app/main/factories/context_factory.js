function context_factory(logger_factory){

    var getDailyCloseUrl = function(ticker){
        var url;
        logger_factory.log(`Retrieving Daily Close Url For '${application_properties.price_factory} price_factory'`, 
                            'context_factory.getDailyCloseUrl')
        switch(application_properties.price_factory){
            case 'quandl':
                url = application_properties
                        .quandl_endpoints.host
                            .concat(application_properties.quandl_endpoints.data.WIKI)
                            .concat(application_properties.quandl_endpoints.daily_close)
                            .concat(ticker);
                break;
            case 'alpha_vantage':
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

    return {
        transform: appendTransform,
        getDailyCloseUrl: getDailyCloseUrl,
    }

}