// NOTE: node-postgres package parameterizes SQL queries with $INT format
// to avoid possible security issues with SQL injections in concatenated
// strings.

const { Client }  = require('pg');
const postgresConfig = require('./postgres_config.json');
const helper = require('../../scripts/helper.js');

const client = new Client({
    user: postgresConfig.username,
    host: postgresConfig.host,
    database: postgresConfig.database,
    password: postgresConfig.password,
    port: postgresConfig.port
})

const queries = {
    exists:{
        priceTable: "SELECT to_regclass('public.prices') IS NULL;",
        tickerTable: "SELECT to_regclass('public.tickers') IS NULL;"
    },
    create:{
        priceTable: "CREATE TABLE prices (date DATE, tickerID INT REFERENCES tickers(tickerID), price DECIMAL);",
        tickerTable: "CREATE TABLE tickers (tickerID SERIAL PRIMARY KEY, ticker VARCHAR(6), description TEXT);"
    },
    insert: {
        priceTable:"INSERT INTO prices (date, tickerID, price) VALUE ($1, $2, $3);",
        tickerTable: "INSERT INTO tickers (ticker, description) VALUES ($1, $2);"
    },
    select:{
        tickerID: "SELECT tickerID FROM tickers WHERE ticker = $1;",
        tickerInfo: "SELECT tickerID, desc FROM tickers WHERE ticker = $1;",
        tickerPrice: "SELECT date, price FROM prices WHERE tickerID = $1;"
    }
}

var initialize = function(){
    return new Promise( (resolve, reject) => {
        helper.log('Connecting To Postgres Database...', 'postgres-client.initialize')
        client.connect();
        
        helper.log('Intializing Database Schema...', 'postgres-client.initialize');
        helper.log('Does Ticker Table Exist?', 'postgres-client.initialize');
        client.query(queries.exists.tickerTable)
                .then(res=>{
                    if(res.rows[0]['?column?']){
                        helper.log('Ticker Table Does Not Exist!', 'postgres-client.initialize');
                        helper.log('Creating Ticker Table...', 'postgres-client.initialize');
                        client.query(queries.create.tickerTable)
                                .then(()=>{
                                    helper.log('Ticker Table Created!', 'postgres-client.initialize');
                                })
                                .catch((err)=>{
                                    helper.warn('Error Creating Ticker Table', 'postgres-client.initialize');
                                    reject(err);
                                })
                    }
                    else{
                        helper.log('Ticker Table Exists.', 'postgres-client.initialize');
                    }
                })
                .then(()=>{
                    helper.log('Does Price Table Exist?', 'postgres-client.initialize');
                    client.query(queries.exists.priceTable)
                            .then(res=>{
                                    if(res.rows[0]['?column?']){
                                        helper.log('Price Table Does Not Exist!', 'postgres-client.initialize');
                                        helper.log('Creating Price Table...', 'postgres-client.initialize');
                                        client.query(queries.create.priceTable)
                                                .then(()=>{
                                                    helper.log('Price Table Created!', 'postgres-client.initialize');
                                                    client.end();
                                                    resolve(true);
                                                    
                                                })
                                                .catch((err)=>{
                                                    helper.warn('Error Creating Price Table!', 'postgres-client.initialize');
                                                    reject(err);
                                                })
                                    }
                                    else{
                                        helper.log('Price Table Exists!', 'postgres-client.initialize');
                                        client.end();
                                        resolve(true);
                                    }
                            })
                            //.then( () =>{
                                // TODO: check if stat and code table exist!
                            //})
                })
                .catch(err=>{
                    helper.log('Error Occured Querying Database!', 'postgres-client.initialize')
                    reject(err);
                })
    });
}

var populate = function(tickers, codes){

}

module.exports = {
    init: initialize,
    populate: populate,
    basic_query: (text) =>{ 
        client.connect();
        return client.query(text, (res)=>{
            helper.log(`Query: ${text}`, 'postgres-client.basic_query');
            helper.log(`Query Response: ${res}`, 'postgres-client.basic_query');
            client.end();
        })
    },
    // Use $INT to parameter parameterize.
    parameterized_query: (text, params) => {
      return client.query(text, params, (res)=>{
        client.connect();
        helper.log(`Query: ${text}`, 'postgres-client.basic_query');
        helper.log(`Query Params: ${params.toString()}`, 'postgres-client.parameterized_query');
        helper.log(`Query Response: ${res}`, 'postgres-client.basic_query');
        client.end();
      })
    },
    queries: queries
  }