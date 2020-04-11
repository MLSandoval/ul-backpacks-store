//load environmental variables from env file

// console.log('process.env in connection.js: ', dotenv)
const {PGUSER, PGHOST, PGPORT} = process.env
const pg = require('pg')

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGHOST}`)
  
// ^^ only for showing debug connection vars

// pg automatically uses PG* env variables
module.exports = new pg.Pool()