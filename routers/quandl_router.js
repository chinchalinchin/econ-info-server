const express = require('express');
const request = require('request');
const quandl = require('../services/quandl.js')
const helper = require('../scripts/helper.js')

var router = express.Router();

router.get('/tickers/', function(req, res, next){
    helper.log('Routing', '/api/tickers/');
    var tickers = quandl.tickers();
    res.send(tickers);
})

router.get('/closingPrice/*', function(req, res, next){
    helper.log(`Routing ${req.url.split('/')[2]}`, '/api/closingPrice');
    url = quandl.getEODUrl(req.url.split('/')[2]);
    url = quandl.limit(url, 1);
    url = quandl.column(url, quandl.columnValues().close);
    request(url, function(error, response, body){
        body_json = JSON.parse(body);
        response_json = {
            date: body_json.dataset_data.data[0][0],
            price: body_json.dataset_data.data[0][1]
        };
        res.send(response_json);
    });
})

module.exports = router