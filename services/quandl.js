module.export={
    getEODUrl: getEODUrl,
    from: appendFrom,
    to: appendTo,
    limit: appendLimit,
    frequency: appendFrequency,
    order: appendOrder,
    column: appendColumn
}

const quandl = require('./json/quandl_config.json')

function getEODUrl(ticker){
    return `${quandl.WikiURL}/${ticker}/${quandl.JSON}?${quandl.APIKey}`;
}

// Format: yyyy-mm-dd
function appendFrom(url, start){
    return `${url}&start_date=${start}`;
}

// Format: yyyy-mm-dd
function appendTo(url, end){
    return `${url}&end_date=${end}`;
}

// Format: Integer
function appendLimit(url, limit){
    return `${url}&limit=${limit}`
}

// Format: Integer
function appendFrequency(url, freq){
    return `${url}&collapse=${freq}`
}

// Format: String
function appendOrder(url, order){
    return `${url}&order=${order}`
}

// Format: String
function appendColumn(url, column){
    return `${url}&column_index=${column}`
}