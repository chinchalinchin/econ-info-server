module.exports={
    getWikiUrl: getWikiUrl,
    getFredUrl: getFredUrl,
    formatResponseBody: formatResponseBody,
    from: appendFrom,
    to: appendTo,
    limit: appendLimit,
    frequency: appendFrequency,
    order: appendOrder,
    column: appendColumn,
    columnValues: getColumnValues,
    orderValues: getOrderValues,
    frequencyValues: getCollapseValues,
    transformValues: getTransformValues,
    codes: getCodes,
}

var quandl = require('./quandl_config.json')

function getColumnValues(){ 
    return quandl.columnValues; 
}

function getCollapseValues(){
    return quandl.collapseValues;
}

function getOrderValues(){
    return quandl.orderValues;
}

function getTransformValues(){
    return quandl.transformValues;
}

function getCodes(){
    return quandl.codes;
}

function getWikiUrl(ticker){
    return `${quandl.baseURL}/${quandl.WikiURL}/${ticker}/${quandl.JSON}?${quandl.APIKey}`;
}

function getFredUrl(code){
    return `${quandl.baseURL}/${quandl.FredURL}/${code}/${quandl.JSON}?${quandl.APIKey}`
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

function formatResponseBody(body){
    body_json = JSON.parse(body);
    response_json = {
        date: body_json.dataset_data.data[0][0],
        value: body_json.dataset_data.data[0][1]
    };
    return response_json;
}