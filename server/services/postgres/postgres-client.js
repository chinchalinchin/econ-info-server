// NOTE: node-postgres package parameterizes SQL queries with $INT format
// to avoid possible security issues with SQL injections in concatenated
// strings.

const { Client }  = require('pg');
const postgresConfig = require('./postgres-config.json');
const helper = require('../../scripts/helper.js');

const client = new Client({
    user: postgresConfig.connection.username,
    host: postgresConfig.connection.host,
    database: postgresConfig.connection.database,
    password: postgresConfig.connection.password,
    port: postgresConfig.connection.port
})

var initialize = function(){
    helper.log('Constructing Promise For Database Initialization...', 'postgres-client.initialize');
    return new Promise( (resolve, reject) => {        
        helper.log('Intializing Database Schema...', 'postgres-client.initialize');
        helper.log("Does 'tickers' Table Exist?", 'postgres-client.initialize');
        client.query(postgresConfig.queries.exists.tickerTable)
                .then(res=>{
                    if(res.rows[0]['?column?']){
                        helper.log("'tickers' Table Does Not Exist!", 'postgres-client.initialize');
                        helper.log("Creating 'tickers' Table...", 'postgres-client.initialize');
                        client.query(postgresConfig.queries.create.tickerTable)
                                .then(()=>{
                                    helper.log("'tickers' Table Created!", 'postgres-client.initialize');
                                })
                                .catch((err)=>{
                                    helper.warn("...Rejecting Promise! Processing Error...", 'postgres-client.initialize');
                                    reject(new Error(`Error Creating 'tickers' Table: ${err.message}`));
                                })
                    }
                    else{
                        helper.log("'tickers' Table Exists!", 'postgres-client.initialize');
                    }
                })
                .then(()=>{
                    helper.log("Does 'prices' Table Exist?", 'postgres-client.initialize');
                    client.query(postgresConfig.queries.exists.priceTable)
                            .then(res=>{
                                    if(res.rows[0]['?column?']){
                                        helper.log("'prices' Table Does Not Exist!", 'postgres-client.initialize');
                                        helper.log("Creating 'prices' Table...", 'postgres-client.initialize');
                                        client.query(postgresConfig.queries.create.priceTable)
                                                .then(()=>{
                                                    helper.log("'prices' Table Created!", 'postgres-client.initialize');
                                                    resolve(true);
                                                    
                                                })
                                                .catch((err)=>{
                                                    helper.warn('...Rejecting Promise! Processing Error...', 'postgres-client.initialize');
                                                    reject(new Error(`Error Creating 'prices' Table: ${err.message}`));
                                                })
                                    }
                                    else{
                                        helper.log("'prices' Table Exists!", 'postgres-client.initialize');
                                        resolve(true);
                                    }
                            })
                            //.then( () =>{
                                // TODO: check if stat and code table exist!
                            //})
                            .catch(err =>{
                                helper.warn("...Rejecting Promise! Processing Error..", "postgres-client.initialize");
                                reject(new Error(`Error Querying 'prices' Table: ${err.message}`));
                            })
                })
                .catch(err=>{
                    helper.warn("...Rejecting Promise! Processing Error...", 'postgres-client.initialize')
                    reject(new Error(`Error Querying 'tickers' Table: ${err.message}`));
                })
    });
}

var populate = async function(tickers, codes){
    for(let tick of tickers){
        tickerName = tick.code;
        tickerDesc = tick.name;
        try{
            const res = await client.query(postgresConfig.queries.select.tickerID, [tickerName]);
                // First check if ID already exists for a given ticker in the tickers table.
                // Query will return a null array if record does not exist.
                // If record does not exist, insert into tickers table.
                // NOTE: parameters for the query must be passed in as an array into the 
                //       the postgres-client.
            if(res.rows.length==0){
                try{
                    await client.query(postgresConfig.queries.insert.tickerTable, [tickerName, tickerDesc]);
                }
                catch(nextErr){
                    helper.warn(`Error Inserting ${tickerName} Into 'tickers' Table: ${nextErr.message}`,
                                    "postgres-client.populate")
                }
            }
        }
        catch (err) { 
            helper.warn(`Error Querying 'tickers' Table: ${err.message}`, "postgres-client.populate");
        }
    }
    for(let category of codes.categories){
        for(let entry of codes.codes[category]){
            console.log(category);
            console.log(entry.code);
            console.log(entry.description);
        }
    }
}

module.exports = {
    init: initialize,
    populate: populate,
    connect: () => { 
        helper.log('Connecting To Postgres Database...', 'postgres-client.connect')
        client.connect(); 
    }, 
    disconnect: () => { 
        helper.log('Disconnecting To Postgres Database...', 'postgres-client.disconnect')
        client.end(); 
    },
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
    queries: postgresConfig.queries
  }