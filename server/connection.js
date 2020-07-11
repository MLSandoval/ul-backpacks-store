const {PGUSER, PGHOST, PGPORT, PGDATABASE} = process.env
const pg = require('pg')
const env = process.env.NODE_ENV || 'development'

let connectionString = {
  user: PGUSER,
  database: PGDATABASE,
  host: PGHOST
}

if(env !== 'development'){
  connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
}

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGPORT}`)
  
module.exports = new pg.Pool(connectionString)