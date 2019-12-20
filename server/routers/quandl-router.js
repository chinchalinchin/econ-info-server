const express = require('express');
const request = require('request');
const quandl = require('../services/quandl/quandl-client.js')
const helper = require('../scripts/helper.js')

var router = express.Router();

// FRED DATASET
router.get('/FRED/statistics/*', function(req, res,next){
    var code = req.url.split('/')[3]
    helper.log(`GET ${code} Request Received`, 'Route: /api/quandl/FRED/statistics/')
    url = quandl.getFredUrl(code);
    request(url, function(error, response, body){
        if(error){
            helper.log(error, 'Route: /api/quandl/FRED/statisitcs/')
            res.status(404).end()
        }
        else{
            response_json = quandl.formatResponseBody(body)
            helper.log(`GET ${code} Response Sent: {date, ${code}}: {${response_json.date}, ${response_json.value}}`, 
                        "Route: /api/quandl/FRED/statistics/");
            res.status(200).send(response_json);
        }
    })
})

// WIKI DATASET
router.get('/WIKI/closing-daily-price/*', function(req, res, next){
    var ticker = req.url.split('/')[3]
    helper.log(`GET ${ticker} Request Received`, 'Route: /api/quandl/WIKI/closing-daily-price/');
    url = quandl.getWikiUrl(ticker);
    url = quandl.column(url, quandl.columnValues().close);
    request(url, function(error, response, body){
        if(error){
            helper.log(error, 'Route: /api/quandl/WIKI/closing-daily-price/');
            res.status(404).end()
        }
        else{
            response_json = quandl.formatResponseBody(body)
            helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.value}}`, 
                        "Route: /api/quandl/WIKI/closing-daily-price/");
            res.status(200).send(response_json);
        }
        
    });
})

router.get('/WIKI/closing-weekly-price/*', function(req, res, next){
    var ticker = req.url.split('/')[3]
    helper.log(`GET ${ticker} Request Received`, 'Route: /api/quandl/WIKI/closing-weekly-price/');
    url = quandl.getWikiUrl(ticker);
    url = quandl.column(url, quandl.columnValues().close);
    url = quandl.frequency(url, quandl.frequencyValues().weekly);
    request(url, function(error, response, body){
        if(error){ 
            helper.log(error, 'Route: /api/quandl/WIKI/closing-weekly-price/') 
            res.status(404).end();
        }
        else{
            response_json = quandl.formatResponseBody(body)
            helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.value}}`, 
                    "Route: /api/quandl/WIKI/closing-weekly-price/");
            res.status(200).send(response_json);
        }
    });
})

module.exports = router;