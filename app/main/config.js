const resource_endpoints = {
    tickers: 'http://localhost:8001/api/tickers/'
}

const quandl_endpoints = {
    host: 'http://localhost:8001/api/quandl/',
    data: {
        FRED: "FRED/",
        WIKI: "WIKI/"
    },
    daily_close: 'closing-daily-price/',
    weekly_close: 'closing-weekly-price/',
    codes: 'codes/',
    statistics: 'statistics/'
}

const alpha_vantage_endpoints = {
    host: 'http://localhost:8001/api/alpha-vantage/'
}