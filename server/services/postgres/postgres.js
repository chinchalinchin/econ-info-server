const postgresClient = require('pq');
const postgresConfig = require('./postgres_config.json');

const client = new postgresClient({
    user: postgresConfig.username,
    host: postgresConfig.host,
    database: postgresConfig.database,
    password: postgresConfig.password,
    port: postgresConfig.port
})

const default_queries = {
    exists:{
        priceTable: "SELECT to_regclass('public.prices') IS NULL",
        tickerTable: "SELECT to_regclass('public.tickers') IS NULL"
    },
    create:{
        priceTable: "",
        tickerTable: ""
    }
}

module.exports = {
    query: (text, params, callback) => {
      return client.query(text, params, callback)
    },
    default_queries: default_queries
  }