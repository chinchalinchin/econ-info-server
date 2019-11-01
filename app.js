const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');
const helper = require('./server/scripts/helper.js');
const quandl_router = require('./server/routers/quandl_router.js')

// Initialize node-express
const app = express();

// Setup middleware
app.use(cors());
app.use(bodyParser.json());  

// Setup root directory 
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "html", "components")));
app.use(express.static(path.join(__dirname, "app")))
app.use(express.static(path.join(__dirname, "app", "angularjs")));
app.use(express.static(path.join(__dirname, "app", "main")));
app.use(express.static(path.join(__dirname, "app", "main","controllers")));
app.use(express.static(path.join(__dirname, "app", "main", "modules")));
app.use(express.static(path.join(__dirname, "app", "main", "services")));

app.use('/home', function(req, res, next){
    helper.log('GET "home.html" Request Received', '/home/');
    res.sendFile(path.join(__dirname,'html', 'home.html'));
});

app.use('/api/', quandl_router);

app.listen(8001, function(){
    helper.log("Listening On Port 8001", "/")
});