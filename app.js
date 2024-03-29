const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');
const helper = require('./server/scripts/helper.js');
const quandl_router = require('./server/routers/quandl-router.js')
const alpha_vantage_router = require('./server/routers/alpha-vantage-router.js')
const tickers = require('./server/resources/tickers.json')
const codes = require('./server/resources/codes.json')
const server_config = require('./server/resources/server-config.json')
const postgres = require('./server/services/postgres/postgres-client.js')

// Initialize node-express
helper.log('Initializing Server', "app");
const app = express();

// Setup middleware
app.use(cors());
app.use(bodyParser.json());  
app.use('/', helper.getDebugMiddleware(server_config.debug));


// Setup root directory 
helper.log('Setting Server Root Directories', "app");
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

helper.log('Registering Routes', "app")
// UI Service
app.use('/home/', function(req, res, next){
    helper.log('GET "home.html" Request Received', 'app @ /home/');
    res.sendFile(path.join(__dirname,'html', 'home.html'));
});

// Routing
    // Quandl Router
app.use('/api/quandl/', quandl_router);
    // Alpha Vantage Router
app.use('/api/alpha-vantage/', alpha_vantage_router)

// GET endpoints
    // GET tickers
app.get('/api/tickers/', function(req,res,next){
    helper.log('GET ALL TICKERS Request Received', 'app @ /api/tickers/')
    res.status(200).json(tickers)
});
    // GET codes
app.get('/api/codes/', function(req, res, next){
    helper.log('GET ALL CODES Request Received', 'app @ /api/codes/')
    res.status(200).json(codes);
});

// connect to and initialize postgres database
helper.log("Initializing 'postgres-client'", "app");
postgres.connect();
postgres.init()
    .then(async function(res){
        if(res){
            helper.log('Database Initialized, Populating Database', "app");
            await postgres.populate(tickers, codes);
            helper.log('Database Populated, Starting Server', "app");
            app.listen(8001, function(){
                helper.log("Listening On Port 8001", "app")
                helper.log("Please Navigate To 'http://localhost:8001/home/' for UI", "app");
            });
        }
    })
    .catch(err=>{
        helper.warn('Error Initializing Database! Correct Error Given Below And Restart Server:', "app")
        console.log(err);
    })