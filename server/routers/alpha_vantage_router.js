const express = require('express');
const request = require('request');
const alpha_vantage = require('../services/alpha_vantage/alpha_vantage.js');
const helper = require('../scripts/helper.js');

var router = express.Router();

router.get('/closing-daily-price/*', function(req, res, next){
    var ticker = req.url.split('/')[2];
    helper.log(`GET ${ticker} Request Received`, '/api/alpha-vantage/closing-daily-price/')
    var url = alpha_vantage.getDailyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatResponseBody(body, helper.getCurrentDate());
        helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.price}}`, 
                        "Route: /api/alpha-vantage/closing-daily-price/");
        res.status(200).send(response_json);
    })

});

router.get('/closing-weekly-price/*', function(req, res, next){
    var ticker = req.url.split('/')[2];
    helper.log(`GET ${ticker} Request Received`, '/api/alpha-vantage/closing-weekly-price/')
    var url = alpha_vantage.getWeeklyUrl(ticker);
    request(url, function(error, response, body){
        response_json = alpha_vantage.formatResponseBody(body, helper.getCurrentDate());
        helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.price}}`, 
                        "Route: /api/alpha-vantage/closing-weekly-price/");
        res.status(200).send(response_json);
    })
});

module.exports = router;