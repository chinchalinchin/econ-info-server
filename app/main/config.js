const application_properties = {
    price_factory: 'alpha_vantage',
    price_factories:{
        alpha_vantage: 'alpha_vantage',
        quandl: 'quandl'
    },
    resource_endpoints: {
        tickers: 'http://localhost:8001/api/tickers/',
        codes: 'http://localhost:8001/api/codes/'
    },
    quandl_endpoints: {
        host: 'http://localhost:8001/api/quandl/',
        data: {
            FRED: "FRED/",
            WIKI: "WIKI/"
        },
        daily_close: 'closing-daily-price/',
        weekly_close: 'closing-weekly-price/',
        statistics: 'statistics/'
    },
    alpha_vantage_endpoints: {
        host: 'http://localhost:8001/api/alpha-vantage/',
        daily_close: 'closing-daily-price/',
        weekly_close: 'closing-weekly-price/',
        monthly_close: 'closing-monthly-price/',
        daily_closes: 'closing-daily-prices/',
        moving_average: 'moving-average/'
    }
}