const express = require('express');
const request = require('request');
const alpha_vantage = require('../services/alpha-vantage/alpha-vantage-client.js');
const helper = require('../scripts/helper.js');

var router = express.Router();

// PRICES

// path params:
//      ticker: desired equity ticker
// return: 
//      JSON: {date, price}
router.get('/closing-daily-price/*', function(req, res, next){
    var ticker = req.path.split('/')[2];
    helper.log(`GET ${ticker} Request Received`, 'alpha-vantage-router @ /api/alpha-vantage/closing-daily-price/')
    var url = alpha_vantage.getDailyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatJSONResBody(body, alpha_vantage.response_format.frequency.daily);
        helper.log(`GET ${ticker} Response Sent`, 
                        "alpha-vantage-router @ /api/alpha-vantage/closing-daily-price/");
        res.status(200).send(response_json);
    })

});

// path params:
//      ticker: desired equity ticker
// return: 
//      JSON: {date, price}
router.get('/closing-daily-prices/*', function(req, res, next){
    var ticker = req.path.split('/')[2];
    var length = req.query.length; 
    helper.log(`GET ${ticker} Request Received`, 'alpha-vantage-router @ /api/alpha-vantage/closing-weekly-prices/rolling')
    var url = alpha_vantage.getDailyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatJSONArrayResBody(body, alpha_vantage.response_format.frequency.daily, 
                                                             length, false);
        helper.log(`GET ${ticker} Response Sent`, 
                        "alpha-vantage-router @ /api/alpha-vantage/closing-weekly-price/");
        res.status(200).send(response_json);
    })
})

// path params:
//      ticker: desired equity ticker
// return: 
//      JSON: {date, price}
router.get('/closing-weekly-price/*', function(req, res, next){
    var ticker = req.path.split('/')[2];
    helper.log(`GET ${ticker} Request Received`, 'alpha-vantage-router @ /api/alpha-vantage/closing-weekly-price/')
    var url = alpha_vantage.getWeeklyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatJSONResBody(body, alpha_vantage.response_format.frequency.weekly);
        helper.log(`GET ${ticker} Response Sent`, 
                        "alpha-vantage-router @ /api/alpha-vantage/closing-weekly-price/");
        res.status(200).send(response_json);
    })
});

// STATISTICS

// params: 
//      period: # of days to include in moving average
//      log: if false, calculate average price.
//           if true, calculate average return.
// return: 
//      JSON: {date, average}
router.get('/moving-average/*', function(req, res, next){
    var ticker = req.path.split('/')[2];
    var period = req.query.period;
    var log = req.query.return === 'true' ? true : false;
    helper.log(`GET ${ticker} MA(${period}) Request Received`, 'alpha-vantage-router @ /api/alpha-vantage/moving-average/')
    var url = alpha_vantage.getDailyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatJSONMAResBody(body, period, log);
        helper.log(`Get ${ticker} Response Sent`,
                    'alpha-vantage-router @ /api/alpha-vantage/moving-average');
        res.status(200).send(response_json);
    })
});

module.exports = router;