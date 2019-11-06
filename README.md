<h1>Introduction</h1>

Finneas-Stockholm is a simple UI built from the AngularJS framework and served up through Node Express. The app makes calls to a free API provided by Quandl, retrieving financial data for the user to view. Currently, the app displays stock price data by date, but in the future, it will also display relevant economic data from other datasets on Quandl, such as interest rates on US treasuries and implied volatility term structures on the S&P 500. In other words, Quandl is a great resource and everyone should use it. <a href = "http://www.quandl.com">QUANDL!</a>. 

However, there are limitations to Quandl. Most of the data is historical. The free data stops at the date 3/27/2018 and will remain there until Quandl dumps another set of prices into their WIKI database. Another free API this app uses as a backend is Alpha Vantage. Alpha Vantage provides up-to-date quotes on the stock exchange. Alpha Vantage is used to retrieve the latest price information in lieu of Quandl, where appropriate. Alpha Vantage lacks economic infromation, such as interest rates and GDP estimates, however. So, both Alpha Vantagae and Quandl are necessary to get all the information required for this app. 

The app simulates a portfolio manager where you can add stocks to your portfolio. Currently only price information is displayed, but I am working on allowing the user to set the number of shares and purchase date, which will then translate into a net profit/loss binding in the UI. What follows is a full schedule of features I have imagined for this app:

UPCOMING FEATURES:
1. Ability to set number of shares and purchase date.<br>
a. Automatic calculation of profit/loss according to current date and purchase date.<br>
b. Calculation of breakeven point
2. Routing to Portfolio, Economic Data, Black-Scholes Analysis, Grafana Data tabs.<br>
a. <b>Portfolio Tab</b>
* Purchase Date
* Number of Days Held (=date - purchase_date)<br>
* Price<br>
* Purchase Price<br>
* Shares<br>
* Liquidity (=current_price*shares)<br>
* Trade Price (=purchase_price*shares)<br>
* Profit/Loss (=shares*(current_price-purchase_price))<br>
b. <b>Economic Data Tab</b><br>
* US Treasury 3 Month, Continuous<br>
* US Treasury 1 Year, Continuous<br>
* US Treasury 10 Year, Continuous<br>
* VIX Spot<br>
* VIX 1 Month Future<br>
* VIX 2 Month Future<br>
* VIX 3 Month Future<br>
c. <b>Black-Scholes Analysis Tab</b><br>
* Input<br>
- Observed: Spot, Interest, Dividend, Volatility (VIX)<br>
- User: Strike, Expiration, Call/Put<br>
* Output<br>
- Black-Scholes Price Call/Put<br>
- Greeks<br>
- Breakeven Underlying Price<br><br>
d. <b>Grafana Tab</b><br>
- Notes: Will connect with DB<br>
	
3. OAuth2 Authentication/Authorization Flow And Features<br>
	a. Storage of Users in Database<br>
	b. Storage of User's Portfolios in Database<br>
	c. Retrieval of Portfolio Upon Login<br><br>

<h1>Adding To The Code</h1>

1. Adding New Components

HTML components can either be added as AngularJS components by adding them to the main module in the file <i>/app/main/modules/main_module.js</i>. The following code snippet instantiates a new component within the app, 

	var main_module = angular.module('finneas_stockholm');
	main_module.component('newComponentName', {config_json});

Then, the HTML component 

	<new-component-name></new-component-name>

can be inserted in file <i>/html/home.html</i> where appropriate.

A component's HTML can also registered through the routing-module to be included in the ng-view outlet, if the user navigates to the route through an in-app hashbang URL link. A component's HTML template is registered in <i>/app/main/modules/router_module.js</i>. The following code snippet registers a component's HTML template with a given route,

	var main_module = angular.module('finneas_stockholm');
	main_module.config(['$routeProvider', function($routeProvider) {
    	$routeProvider
        	.when('/new-component-route', {
            	templateUrl: 'new-component-template.html'
        	})}])

Note $routeProvider must be injected into the config in order to expose the angular routing functionality. Once a component's route is registered, then a link element can be inserted into <i>/html/home.html</i> to tell the ng-view component also within the same file to render the new component. The following link will tell the ng-view component to route to our new component,

	<a href = "#!/new-component-route">New Component Link</a>

Note the use of the hashbang URL (i.e., the "!#" prefix). This prevents the browser from making a new HTTP request to the server. Instead, the AngularJS app handles all hashbang URL navigation client-side through its router module functionality. 

<h1>Usage</h1>

To start the server, navigate to the project's root folder and run,

	npm start

This will set the server to listen on Port 8001. The app UI can be accessed through the url,

	http://localhost:8001/home

The backend Quandl API can be accessed through

	http://localhost:8001/api/quandl/PATH_PARAMETERS

With the appropriate path parameters passed in. There are two datasets on Quandl the app interacts with: WIKI and FRED. WIKI provides equity price information and FRED provides economic data and statistics. For instance, to access the latest closing price of Facebook (Ticker: FB), navigate to (GET request),

	http://localhost:8001/api/quandl/WIKI/prices/FB

This will return a JSON file {date, price} containing the date and the last closing price the WIKI dataset has access to. The FRED dataset can similarly be accessed. For example, to see the latest US GDP Estimate, navigate to (GET request),

	http://localhost:8001/api/quandl/FRED/statistics/GDP

This will return a JSON file {date, value} containing the date and the latest value of US GDP, as estimated by the Saint Louis Federal Reserve. 

To see a list of all stock tickers and their descriptions,

	http://localhost:8001/api/quandl/WIKI/tickers

To see a list of all economic statistics and their descriptions,

	http://localhost:8001/api/quandl/FRED/codes

<h1>Thoughts</h1>

1. Architecture

Currently: 
Front-end AngularJS app accesses Quandl. Quandl API essentially acts as a back-end for front-end app. Technically, all calls to Quandl are pointed back to Node Server which also serves up AngularJS app, hitting endpoints designated for redirects. These endpoints in turn send out requests to Quandl and return the response to the user. In other words, the user never directly accesses Quandl; Node essentially acts as a proxy (specifically, a request is received at a designated Node Express endpoint, a new request is formed via the npm package 'request' and then its response received, and that response is returned as the response to the original request).

This flow is set up to prevent the Quandl API key from being exposed to the user. The API key is stored on the Node Server and appended to the redirect in order to authenticate without the user's knowledge. There is, however, nothing to stop a user from endlessly accessing the API, even though they have no access to the API key, since the routes in the Node Server to the backend are not protected. 

Future:
Create proper backend that interfaces with database (MySQL?). Populate database with responses from Quandl. Set trigger for automatic update every morning. Have frontend talk to database through backend. Have user authenticate with backend before access to resources is granted (i.e., OAuth2)

Essentially, figure out how to implement this flow:

	Flow 1: USER- > FRONT END SERVER -> BACKEND SERVER -> DATABASE -> BACKEND SERVER -> FRONTEND SERVER-> USER
		
In particular, the second data pipe between the frontend and backend, 

	Flow 1B: FRONT END SERVER -> BACKEND SERVER
	
Should this be an OAuth2 flow? I.e., Facebook/Google Authentication?

Also, there needs to be a way to feed data from Quandl and Alpha Vantage into a database. There needs to be a trigger mechanism that makes http calls to the Quandl/Alpha Vantage servers and populates a database with new values every so often. Look into triggering mechanisms.

	Flow 2: TRIGGER MECHANISM (SERVER?) -> QUANDL SERVER-> TRIGGER MECHANISM (SERVER?) -> DATABASE

2. Grafana Service

Once the backend is differentiated and the database is separated out from the frontend, Grafana will be able to interface with the database and provide visualizations of the equity and security data provided by Quandl. These visualizations can be embedded within iframes in the AngularJS HTML component templates. The Grafana tab will need to receive the user's portfolio and figure out a way of providing input to Grafana's api to retrieve the correct dataset from the database.