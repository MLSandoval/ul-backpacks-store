const {PGUSER, PGHOST, PGPORT, PGDATABASE, PGPASSWORD} = process.env
const pg = require('pg')
const env = process.env.NODE_ENV || 'development'

let connectionConfig = {}

if(env !== 'development'){
  connectionConfig.connectionString = process.env.DATABASE_URL
  connectionConfig.ssl= { rejectUnauthorized: false }
}

module.exports = new pg.Pool(connectionConfig)