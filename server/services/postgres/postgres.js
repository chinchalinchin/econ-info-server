const postgresClient = require('pq');
const postgresConfig = require('./postgres_config.json');

const client = new postgresClient({
    user: postgresConfig.username,
    host: postgresConfig.host,
    database: postgresConfig.database,
    password: postgresConfig.password,
    port: postgresConfig.port
})

module.exports = {
    query: (text, params, callback) => {
      return client.query(text, params, callback)
    },
  }