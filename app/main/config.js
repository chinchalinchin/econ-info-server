const application_properties = {
    price_factory: 'alpha_vantage',
    resource_endpoints: {
        tickers: 'http://localhost:8001/api/tickers/'
    },
    quandl_endpoints: {
        host: 'http://localhost:8001/api/quandl/',
        data: {
            FRED: "FRED/",
            WIKI: "WIKI/"
        },
        daily_close: 'closing-daily-price/',
        weekly_close: 'closing-weekly-price/',
        codes: 'codes/',
        statistics: 'statistics/'
    },
    alpha_vantage_endpoints: {
        host: 'http://localhost:8001/api/alpha-vantage/',
        daily_close: 'closing-daily-price/',
        weekly_close: 'closing-weekly-price/',
        monthly_close: 'closing-monthly-price/'
    }
}