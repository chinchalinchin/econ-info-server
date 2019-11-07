module.exports = {
    getDailyUrl: getDailyUrl,
    getWeeklyUrl: getWeeklyUrl,
}

var alpha_vantage = require('./alpha_vantage_config.json');

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
