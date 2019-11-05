const express = require('express');
const request = require('request');
const quandl = require('../services/quandl/quandl.js')
const helper = require('../scripts/helper.js')
const tickers = require('../services/resources/tickers.json')

var router = express.Router();

// FRED DATASET
router.get('/FRED/codes', function(req, res, next){
    helper.log('GET ALL CODES Request Received', '/api/quandl/FRED/codes/')
    res.send(quandl.codes());
});

router.get('/FRED/growth/*', function(req, res,next){
    var code = req.url.split('/')[3]
    helper.log(`GET ${code} Request Received`, '/api/quandl/FRED/growth/')
    url = quandl.getFredUrl(code);
    request(url, function(error, response, body){
        body_json = JSON.parse(body);
        response_json = {
            date: body_json.dataset_data.data[0][0],
            value: body_json.dataset_data.data[0][1]
        };
        helper.log(`GET ${code} Response Sent: {date, ${code}}: {${response_json.date}, ${response_json.price}}`, 
                    "/api/quandl/FRED/growth/");
        res.send(response_json);
    })
})

// WIKI DATASET
router.get('/WIKI/tickers/', function(req,res,next){
    helper.log('GET ALL TICKERS Request Received', '/api/quandl/WIKI/tickers/')
    res.json(tickers)
});

router.get('/WIKI/closingPrice/*', function(req, res, next){
    var ticker = req.url.split('/')[3]
    helper.log(`GET ${ticker} Request Received`, '/api/quandl/WIKI/closingPrice/');
    url = quandl.getWikiUrl(ticker);
    url = quandl.limit(url, 1);
    url = quandl.column(url, quandl.columnValues().close);
    request(url, function(error, response, body){
        body_json = JSON.parse(body);
        response_json = {
            date: body_json.dataset_data.data[0][0],
            price: body_json.dataset_data.data[0][1]
        };
        helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.price}}`, 
                    "/api/quandl/WIKI/closingPrice/");
        res.send(response_json);
    });
})

module.exports = router;