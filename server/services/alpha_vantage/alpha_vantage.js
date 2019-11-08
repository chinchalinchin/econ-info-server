module.exports = {
    getDailyUrl: getDailyUrl,
    getWeeklyUrl: getWeeklyUrl,
    getMonthlyUrl: getMonthlyUrl,
    formatResponseBody: formatResponseBody
}

var alpha_vantage = require('./alpha_vantage_config.json');
var helper = require('../../scripts/helper.js')

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

function formatResponseBody(body){
    format_body = JSON.parse(body);
    format_body = format_body['Time Series (Daily)'];
    format_date = Object.keys(format_body)[0];
    format_body = format_body[format_date];
    format_body = format_body['4. close'];
    response_json = {
        date: format_date,
        price: format_body
    }
    return response_json;
}
