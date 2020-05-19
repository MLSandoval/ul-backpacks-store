//load environmental variables from env file
require('dotenv').config({path: 'backpack_shopping_cart/.env'})

// console.log('process.env: ', process.env)

const express = require('express')
const app = express()

const path = require('path')
const pubDirectory = path.join(__dirname, '/public')
app.use(express.static(pubDirectory))
app.use(express.json())

const bodyParser = require('body-parser')
//parse application/json
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

//this db is an instance of Pool clas from PG
const db = require('./connection.js')

db.connect( (err, client, release) => {
  console.log('pool connect err: ', err)
  // console.log('pool connect client: ', client)
  // console.log('pool connect release: ', release)
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

// * to allow refresh of page on child path, works with webpack dev running, not when served from the actual node server
app.get('/*', (req, res, next) => {
  // console.log('pubDirectory: ', pubDirectory)
  // console.log('req.url: ', req.url)
  res.sendFile(pubDirectory)
})

app.get('/api/get-products', (req, res, next)=>{
  // console.log('this is hitting real fetch-products enpoint')
  const query = 'SELECT * FROM products;'

  db.query(query)
    .then(data=> {
      // console.log('query data RETURNED: ', data.rows)
      res.send(data.rows)
    })
    .catch(e=> console.error(e.stack))
  // res.send({message:'this is hitting real fethc products endpoing'})
})

app.get('/api/get-user', (req, res, next)=>{
  console.log('get-user endpoint hit, req.headers: ', req.headers)
  const {user_uuid} = req.headers
  console.log('get user endpoint, req.headers.user_uuid: ', req.headers.user_uuid)
  const queryObj = {
    text: `SELECT users.user_uuid, users.email, users.first_name, users.last_name, cart.cart_uuid, cart.cart_items::json
      FROM users, cart 
      WHERE users.user_uuid = $1
        AND cart.user_uuid = $1
      `,
    values: [user_uuid]
  }

  db.query(queryObj)
    .then(data=>{
      console.log('get user query successful, data: ', data)
      const [arrToObjRes] = data.rows
      res.send(arrToObjRes)
    })
    .catch(err=>console.error('Get User Query Error: ', err))
})

app.put('/api/create-user', (req, res, next)=>{
  console.log('create-user endpoint hit!!! req.body: ', req.body)
  const {email, first_name, last_name} = req.body

  const queryObj = {
    text: 
      `WITH new_user AS (
        INSERT INTO users VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING user_uuid
      )
      INSERT INTO cart 
        VALUES (uuid_generate_v4(), (SELECT user_uuid FROM new_user), hstore(''))
          RETURNING (SELECT user_uuid FROM new_user), cart.cart_uuid, hstore_to_json(cart.cart_items)`,
    values: [email || null, first_name || null, last_name || null,]
  }

  db.query(queryObj)
    .then(data=>{
      console.log('create user query successful, data.rows: ', data.rows)
      const [arrToObjRes] = data.rows
      res.send(arrToObjRes)
    })
    .catch(err=>console.error('Create User Query Error: ', err))
})

app.patch('/api/add-item-to-cart', (req, res, next)=>{
  const {cart, product} = req.body

  const uuidArray = []

  if(uuidArray.includes(product.product_uuid)){
    const query = {
      text: `fake query

      `,
      values: []
    }
    res.send('this is the quantity up')
  }else{

    console.log('product right before add new item query: ', product)
    const query = {
      text: `
      UPDATE cart SET 
        cart_items = cart_items || hstore($1, $2)::hstore
        WHERE cart_uuid = $3
        RETURNING hstore_to_json(cart_items)
      `,
      values: [product.product_uuid, product.quantity, cart.cart_uuid]
    }
    
    db.query(query)
    .then(data=>{
      console.log('add new item to cart, data.rows', data.rows[0].hstore_to_json)
      res.send(data.rows[0].hstore_to_json)
    })
    .catch(err=>console.error('Add New Item To Cart Error: ', err))
  }
})

app.patch('/api/inc-dec-quantity', (req, res, next)=>{
  console.log('increase-quantity endpoint hit, req.body: ', req.body)
  const {cart_uuid, product_uuid, incDec} = req.body
  let query
  if(incDec === 'increment'){
    query = {
      text: `
      WITH quantity AS (
        SELECT cart_items -> $1 AS quantity 
        FROM cart WHERE cart_uuid = $2
        )
      UPDATE cart
        SET cart_items = cart_items || hstore($1::text, (SELECT quantity.quantity::int + 1 FROM quantity)::text)
        WHERE cart_uuid = $2
        RETURNING hstore_to_json(cart_items)
      `,
      values: [product_uuid, cart_uuid]
    }
  }else if(incDec === 'decrement'){
    query = {
      text: `
    WITH quantity AS (
      SELECT cart_items -> $1 AS quantity 
      FROM cart WHERE cart_uuid = $2
      )

    UPDATE cart
      SET cart_items = cart_items || hstore($1, (SELECT nonegative((SELECT quantity::int - 1 FROM quantity)))::text)
      WHERE cart_uuid = $2
      RETURNING hstore_to_json(cart_items)
      `,
      values: [product_uuid, cart_uuid]
    }
  }

  db.query(query)
  .then(data=>{
    console.log('inside db query success, data.rows: ', data.rows[0])
    res.send(data.rows[0])
  })
  .catch(err=>console.error('Increase Quantity Error: ', err))
})

// fixes client side routing 'cannot get xxxxxxx' on refresh issue except when there is a 
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, pubDirectory), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(3003, () => {
  console.log('Node server listening on port 3003.')
})


// GET FULL USER AND CART DATA OF INDIVIDUAL
// `SELECT * FROM users
// INNER JOIN cart ON users.user_uuid = cart.user_uuid;`

// MULTIPLE TABLE DELETIONS WITH 1 query
// WITH cartty AS (
//   DELETE FROM cart WHERE user_uuid = '8c98431e-1df7-437e-96d8-febb5d2ee81c' returning user_uuid)
// DELETE FROM user WHERE user_uuid in (SELECT user_uuid from cartty)