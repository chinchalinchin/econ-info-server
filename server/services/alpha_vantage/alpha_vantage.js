module.exports = {
    getDailyUrl: getDailyUrl,
    getWeeklyUrl: getWeeklyUrl,
    getMonthlyUrl: getMonthlyUrl,
    formatResponseBody: formatResponseBody
}

var alpha_vantage = require('./alpha_vantage_config.json');
var h

function getSecureUrl(){
    return `${alpha_vantage.baseURL}&apikey=${alpha_vantage.APIKey}&outputsize=compact&datatype=json`
}

function getDailyUrl(ticker){
    return `${getSecureUrl()}&function=${alpha_vantage.functions.daily}&symbol=${ticker}`
}

function getWeeklyUrl(ticker){
    return `${getSecureUrl()}&function=${alpha_vantage.functions.weekly}&symbol=${ticker}`
}

function getMonthlyUrl(ticker){
    return `${getSecureUrl()}&function=${alpha_vantage.functions.monthly}&symbol=${ticker}`
}

function formatResponseBody(body, thisDate){
    format_body = JSON.parse(body);
    format_body = format_body['Time Series (Daily)'];
    format_body = format_body[`${thisDate}`];
    format_body = format_body['4. close'];
    response_json = {
        date: thisDate,
        price: format_body
    }
    return response_json;
}
