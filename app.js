const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');
const helper = require('./server/scripts/helper.js');
const quandl_router = require('./server/routers/quandl_router.js')
const alpha_vantage_router = require('./server/routers/alpha_vantage_router.js')
const tickers = require('./server/resources/tickers.json')
const codes = require('./server/resources/codes.json')
const server_config = require('./server/resources/server_config.json')

// Initialize node-express
const app = express();

// Setup middleware
app.use(cors());
app.use(bodyParser.json());  
app.use('/', helper.getDebugMiddleware(server_config.debug));


// Setup root directory 
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "html", "components")));
app.use(express.static(path.join(__dirname, "html", "components", "items")));
app.use(express.static(path.join(__dirname, "html", "components", "tabs")));
app.use(express.static(path.join(__dirname, "html", "components", "utilities")));
app.use(express.static(path.join(__dirname, "app")))
app.use(express.static(path.join(__dirname, "app", "angularjs")));
app.use(express.static(path.join(__dirname, "app", "main")));
app.use(express.static(path.join(__dirname, "app", "main", "controllers")));
app.use(express.static(path.join(__dirname, "app", "main", "modules")));
app.use(express.static(path.join(__dirname, "app", "main", "factories")));

app.use('/home/', function(req, res, next){
    helper.log('GET "home.html" Request Received', 'Route: /home/');
    res.sendFile(path.join(__dirname,'html', 'home.html'));
});

app.use('/api/quandl/', quandl_router);

app.use('/api/alpha-vantage/', alpha_vantage_router)

app.get('/api/tickers/', function(req,res,next){
    helper.log('GET ALL TICKERS Request Received', 'Route: /api/tickers/')
    res.status(200).json(tickers)
});

app.get('/api/codes/', function(req, res, next){
    helper.log('GET ALL CODES Request Received', 'Route: /api/codes/')
    res.status(200).json(codes);
});


app.listen(8001, function(){
    helper.log("Listening On Port 8001", "Server")
    helper.log("Please navigate to http://localhost:8001/home/", "Server");
});