const express = require('express');
const request = require('request');
const quandl = require('../services/quandl/quandl.js')
const helper = require('../scripts/helper.js')

var router = express.Router();

// FRED DATASET
router.get('/FRED/codes/', function(req, res, next){
    helper.log('GET ALL CODES Request Received', '/api/quandl/FRED/codes/')
    res.status(200).send(quandl.codes());
});

router.get('/FRED/statistics/*', function(req, res,next){
    var code = req.url.split('/')[3]
    helper.log(`GET ${code} Request Received`, '/api/quandl/FRED/statistics/')
    url = quandl.getFredUrl(code);
    request(url, function(error, response, body){
        if(error){
            helper.log(error, '/api/quandl/FRED/statisitcs/')
            res.statust(404).end()
        }
        else{
            body_json = JSON.parse(body);
            response_json = {
                date: body_json.dataset_data.data[0][0],
                value: body_json.dataset_data.data[0][1]
            };
            helper.log(`GET ${code} Response Sent: {date, ${code}}: {${response_json.date}, ${response_json.value}}`, 
                        "/api/quandl/FRED/growth/");
            res.status(200).send(response_json);
        }
    })
})

// WIKI DATASET
router.get('/WIKI/closing-daily-price/*', function(req, res, next){
    var ticker = req.url.split('/')[3]
    helper.log(`GET ${ticker} Request Received`, '/api/quandl/WIKI/closing-daily-price/');
    url = quandl.getWikiUrl(ticker);
    url = quandl.column(url, quandl.columnValues().close);
    request(url, function(error, response, body){
        if(error){
            helper.log(error, '/api/quandl/WIKI/closing-daily-price/');
            res.status(404).end()
        }
        else{
            body_json = JSON.parse(body);
            response_json = {
                date: body_json.dataset_data.data[0][0],
                price: body_json.dataset_data.data[0][1]
            };
            helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.price}}`, 
                        "/api/quandl/WIKI/closing-daily-price/");
            res.status(200).send(response_json);
        }
        
    });
})

router.get('/WIKI/closing-weekly-price/*', function(req, res, next){
    var ticker = req.url.split('/')[3]
    helper.log(`GET ${ticker} Request Received`, '/api/quandl/WIKI/closing-weekly-price/');
    url = quandl.getWikiUrl(ticker);
    url = quandl.column(url, quandl.columnValues().close);
    url = quandl.frequency(url, quandl.frequencyValues().weekly);
    request(url, function(error, response, body){
        if(error){ 
            helper.log(error, '/api/quandl/WIKI/closing-weekly-price/') 
            res.status(404).end();
        }
        else{

            body_json = JSON.parse(body);
            response_json = {
                date: body_json.dataset_data.data[0][0],
                price: body_json.dataset_data.data[0][1]
            };
            helper.log(`GET ${ticker} Response Sent: {date, price}: {${response_json.date}, ${response_json.price}}`, 
                    "/api/quandl/WIKI/closing-weekly-price/");
            res.status(200).send(response_json);
        }
    });
})

module.exports = router;