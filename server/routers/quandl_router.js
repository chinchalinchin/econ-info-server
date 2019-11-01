const express = require('express');
const request = require('request');
const quandl = require('../services/quandl.js')
const helper = require('../scripts/helper.js')

var router = express.Router();

router.get('/tickers/', function(req, res, next){
    helper.log('GET "tickers" Received', '/api/tickers/');
    var tickers = quandl.tickers();
    helper.log(`GET "tickers" Response Sent: ${tickers.length} tickers sent`, "/api/tickers/")
    res.send(tickers);
})

router.get('/closingPrice/*', function(req, res, next){
    var ticker = req.url.split('/')[2]
    helper.log(`GET ${ticker} Request Received`, '/api/closingPrice/');
    url = quandl.getEODUrl(ticker);
    url = quandl.limit(url, 1);
    url = quandl.column(url, quandl.columnValues().close);
    request(url, function(error, response, body){
        body_json = JSON.parse(body);
        response_json = {
            date: body_json.dataset_data.data[0][0],
            price: body_json.dataset_data.data[0][1]
        };
        helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.price}}`, 
                    "/api/closingPrice/");
        res.send(response_json);
    });
})

module.exports = router