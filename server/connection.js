const {PGUSER, PGHOST, PGPORT} = process.env
const pg = require('pg')

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGPORT}`)
  
module.exports = new pg.Pool()