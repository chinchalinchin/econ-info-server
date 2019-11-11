const express = require('express');
const request = require('request');
const alpha_vantage = require('../services/alpha_vantage/alpha_vantage.js');
const helper = require('../scripts/helper.js');

var router = express.Router();

// DAILY PRICES

// return: JSON Body {date, price}
router.get('/closing-daily-price/*', function(req, res, next){
    var ticker = req.path.split('/')[2];
    helper.log(`GET ${ticker} Request Received`, '/api/alpha-vantage/closing-daily-price/')
    var url = alpha_vantage.getDailyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatJSONResBody(body, alpha_vantage.response_format.frequency.daily);
        helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.value}}`, 
                        "Route: /api/alpha-vantage/closing-daily-price/");
        res.status(200).send(response_json);
    })

});

// return: JSON Body {date, price}
router.get('/closing-daily-prices/*', function(req, res, next){
    var ticker = req.path.split('/')[2];
    var length = req.query.length; 
    helper.log(`GET ${ticker} Request Received`, '/api/alpha-vantage/closing-weekly-prices/rolling')
    var url = alpha_vantage.getDailyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatJSONArrayResBody(body, alpha_vantage.response_format.frequency.daily, length);
        helper.log(`GET ${ticker} Rolling Month Response Sent}`, 
                        "Route: /api/alpha-vantage/closing-weekly-price/");
        res.status(200).send(response_json);
    })
})

// return: JSON Body {date, price}
router.get('/closing-weekly-price/*', function(req, res, next){
    var ticker = req.path.split('/')[2];
    helper.log(`GET ${ticker} Request Received`, '/api/alpha-vantage/closing-weekly-price/')
    var url = alpha_vantage.getWeeklyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatJSONResBody(body, alpha_vantage.response_format.frequency.weekly);
        helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.value}}`, 
                        "Route: /api/alpha-vantage/closing-weekly-price/");
        res.status(200).send(response_json);
    })
});

module.exports = router;