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
  res.sendFile(pubDirectory)
})

app.get('/api/get-products', (req, res, next)=>{
  const query = 'SELECT * FROM products;'

  db.query(query)
    .then(data=> {
      res.send(data.rows)
    })
    .catch(e=> console.error(e.stack))
})

app.get('/api/get-user', (req, res, next)=>{
  const {user_uuid} = req.headers
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
      console.log('successful get user data query, data.rows: ', data.rows)
      const [user] = data.rows
      res.send(user)
    })
    .catch(err=>console.error('Get User Query Error: ', err))
})

app.put('/api/create-user', (req, res, next)=>{
  const queryObj = {
    text: `
      WITH new_user AS (
        INSERT INTO users VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING user_uuid
      )
      INSERT INTO cart 
        VALUES (uuid_generate_v4(), (SELECT user_uuid FROM new_user), hstore(''))
          RETURNING (SELECT user_uuid FROM new_user), cart.cart_uuid, cart.cart_items::json
      `
      ,
    values: [null, null, null]
  }

  db.query(queryObj)
    .then(data=>{
      console.log('create user query successful, data.rows: ', data.rows)
      const [newUser] = data.rows
      res.send(newUser)
    })
    .catch(err=>console.error('Create User Query Error: ', err))
})

app.patch('/api/add-item-to-cart', (req, res, next)=>{
  const {cart, product} = req.body
  console.log('additemtocart endpoint, cart, product: ', cart, product)

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
    const newCart = data.rows[0].hstore_to_json
    res.send(newCart)
  })
  .catch(err=>console.error('Add New Item To Cart Error: ', err))
})

app.patch('/api/alter-quantity', (req, res, next)=>{
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
    const newCart = data.rows[0].hstore_to_json
    res.send(newCart)
  })
  .catch(err=>console.error('Increase Quantity Error: ', err))
})

app.patch('/api/remove-item', (req, res, next)=>{
  const {cart_uuid, product_uuid} = req.body
  
  const query = {
    text: `
      UPDATE cart 
      SET cart_items = delete( cart_items, $1)
      WHERE cart_uuid = $2
      RETURNING hstore_to_json(cart_items)
    `,
    values: [product_uuid, cart_uuid]
  }

  db.query(query)
  .then(data=>{
    const newCart = data.rows[0].hstore_to_json
    res.send(newCart)
  })
  .catch(err=>console.error('Product Removal Query Error: ', ))

})

app.put('/api/place-order', (req, res, next)=>{
  const {user_uuid, cart_uuid} = req.body

  const query = {
    text: `
    INSERT INTO orders VALUES (
      uuid_generate_v4(), 
      (SELECT cart_items FROM cart WHERE cart_uuid = $1), 
      $2)
      RETURNING orders.order_uuid, orders.items::json, orders.user_uuid, $1 AS cart_uuid
    `,
    values: [cart_uuid, user_uuid]
  }

  db.query(query)
  .then(data=>{
    console.log('successful order placed query, data.rows[0]: ', data.rows[0])
    res.send(data.rows[0])
  })
  .catch(err=>console.error('Place Order Query Error: ', err))
})

app.patch('/api/clear-cart', (req,res,next)=>{
  const {cart_uuid} = req.body

  const query = {
    text: `
      UPDATE cart 
        SET cart_items = hstore('')
      WHERE cart_uuid = $1
      `,
    values: [cart_uuid]
  }

  db.query(query)
  .then(data=>{
    console.log('successful clear cart query, data.rows: ', data.rows)
    res.send({message: 'Cart Cleared successfully'})
  })
  .catch(err=>console.error('Clear Cart Query Error: ', err))
})

// app.get('/details/:product_uuid', (req,res,next)=>{
//   res.sendFile(`${pubDirectory}/index.html`, (err) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

// fixes client side routing 'cannot get xxxxxxx' on refresh issue except when there is a 
app.get('/*', (req, res, next) => {
  res.sendFile(`${pubDirectory}/index.html`, (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(3003, () => {
  console.log('Node server listening on port 3003.')
  console.log('path.join(__dirname::: ', pubDirectory)
})
