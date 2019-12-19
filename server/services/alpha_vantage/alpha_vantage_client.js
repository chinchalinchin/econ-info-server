/*
 * The first function of this module is to format request URLs to the Alpha Vantage API. The API is pulled 
 * in through a JSON file in the same folder as this file, along with other parameters Alpha Vantage needs.
 * 
 * The second function of this module is to format response bodys from Alpha Vantage and boil them down
 * into the salient values that will be consumed by the end-user. 
 * 
 * Use the 'response_format' object to statically access formatting options for the Alpha Vantage response.
 * Any time a function in this module requires a parameterized value, it can be accessed through this field.
 * I.e., if a function is defined to have the arguments function(frequency), then the possible values of 
 * frequency can be found in 'response_format.frequency'. Please use this object to prevent the module 
 * from breaking. 
*/

var response_format = {
    frequency: {
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly'
    },
    columns: {
        close: '4. close'
    },
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

/* Parameters
 *    body: Response Body from Alpha Vantage to parse
 *    frequency: Frequency of Response to parse. Use 'response_format' to pass in correct value.
*/
function formatJSONResBody(body, frequency){
    format_body = JSON.parse(body);
    if(format_body['Error Message']){
        format_date = 'cannot find';
        format_body = 'cannot find';
    }
    else if(format_body['Note']){
        format_date = 'error'
        format_body = format_body['Note']
    }
    else{
        format_body = format_body[formatIndex(frequency)];
        format_date = Object.keys(format_body)[0]; // grab first date
        format_body = format_body[format_date]; // get prices on date
        format_body = format_body[response_format.columns.close]; // get closing price
    }
    response_json = {
        date: format_date,
        value: format_body
    }
    return response_json;
}

/* Parameters
 *    body: Response Body from Alpha Vantage to parse
 *    frequency: Frequency of Response to parse. Use 'response_format' to pass in correct value.
 *    length: number of dates to retrieve. Pass in null to get everything provided by Alpha Vantage.
 *    transform: takes the natural logarithm of each price in the 
*/
function formatJSONArrayResBody(body, frequency, length, transform){
    let format_body = JSON.parse(body)
    let format_date;

    let everything_flag = true; 
    if(!length){ everything_flag = false; }

    if(format_body['Error Message']){
        format_date = 'error';
        format_body = 'cannot find ticker';
        response_json = {
            date: format_date, 
            value: format_body
        }
    }
    else if(format_body['Note']) {
        format_date = 'error'
        format_body = format_body['Note']
        response_json = {
            date: format_date, 
            value: format_body
        }
    }
    else{
        format_body = format_body[formatIndex(frequency)];
        format_date = Object.keys(format_body);
        response_json = {}
        let i = 1
        for(let day of format_date){
            let buffer = format_body[day][response_format.columns.close]
            if(transform){ buffer = Math.log(buffer); }
            response_json[day] = buffer;
            i++;
            if(everything_flag && i.toString()===length){ break; }
        }
    }
    return response_json;
}

/* Description: Calculates the moving average of a stock price.
 *
 * Parameters
 *     body: Response Body from Alpha Vantage to parse
 *     period: Desired rolling period for the moving average
 *     transform: returns the average return, instead of average price
 *
*/
function formatJSONMAResBody(body, period, transform){
    response_json = formatJSONArrayResBody(body, response_format.frequency.daily, period, transform);
    var moving_average = 0;
    var dates = Object.keys(response_json);
    for(let date of dates){
        moving_average = moving_average + parseFloat(response_json[date])/dates.length
    }
    return new_response = {
        date: dates[0],
        value: moving_average.toFixed(2)
    }
}

// For some reason, Alpha Vantage formats the properties of their JSON response 
// differently for different frequencies. Go figure.
function formatIndex(frequency){
    if(frequency === response_format.frequency.daily){ index = `Time Series (${frequency})` }
    else{ index = `${frequency} Time Series` }
    return index;
}

module.exports = {
    getDailyUrl: getDailyUrl,
    getWeeklyUrl: getWeeklyUrl,
    getMonthlyUrl: getMonthlyUrl,
    formatJSONResBody: formatJSONResBody,
    formatJSONArrayResBody: formatJSONArrayResBody,
    formatJSONMAResBody: formatJSONMAResBody,
    response_format: response_format

}