//load environmental variables from env file
require('dotenv').config({path: 'backpack_shopping_cart/.env'})

const express = require('express')
const app = express()

const path = require('path')
const pubDirectory = path.join(__dirname, '/public')
app.use(express.static(pubDirectory))
app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

//this db is an instance of Pool class from PG
const db = require('./connection.js')

db.connect( (err, client, release) => {
  if (err) {
    console.log('pool connect err: ', err)
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log('PSQL SELECT NOW(): ', result.rows)
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
    text: `
      SELECT users.user_uuid, users.email, users.name, cart.cart_uuid, cart.cart_items::json
        FROM users, cart 
        WHERE users.user_uuid = $1
          AND cart.user_uuid = $1
    `,
    values: [user_uuid]
  }

  db.query(queryObj)
    .then(data=>{
      const [user] = data.rows
      res.send(user)
    })
    .catch(err=>console.error('Get User Query Error: ', err))
})

app.put('/api/create-user', (req, res, next)=>{
  const query = {
    text: `
      WITH new_user AS (
        INSERT INTO users VALUES (uuid_generate_v4(), $1, $2) RETURNING user_uuid
      )
      INSERT INTO cart 
        VALUES (uuid_generate_v4(), (SELECT user_uuid FROM new_user), hstore(''))
          RETURNING (SELECT user_uuid FROM new_user), cart.cart_uuid, cart.cart_items::json
    `,
    values: [null, null]
  }

  db.query(query)
    .then(data=>{
      const [newUser] = data.rows
      res.send(newUser)
    })
    .catch(err=>console.error('Create User Query Error: ', err))
})

app.patch('/api/add-item-to-cart', (req, res, next)=>{
  const {cart, product} = req.body
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
  const {user_uuid, cart_uuid, formData} = req.body
  let {
    email,
    shippingOption,
    nameOnCard,
    cardNumber,
    cardExp,
    cvv,
    billStreetAddress,
    billCity,
    billState,
    billZip,
    shipStreetAddress,
    shipCity,
    shipState,
    shipZip
  } = formData

  cardNumber = cardNumber.replace(/ /g, '')
  billZip = parseInt(billZip)
  shipZip = parseInt(shipZip)

  const query = {
    text: `
      WITH user_update AS (
        UPDATE users
          SET
            email = $3,
            name = $4
        WHERE user_uuid = $2
      ), order_info_insert AS(
      INSERT INTO orders VALUES (
        uuid_generate_v4(), 
        $2::uuid,
        (SELECT CURRENT_DATE),
        (SELECT cart_items FROM cart WHERE cart_uuid = $1)::hstore,
        $8
      )
      RETURNING orders.order_uuid AS order_uuid, 
        orders.items::json AS items, 
        orders.user_uuid AS user_uuid, 
        (SELECT to_char(orders.order_date, 'DD Mon YYYY') AS order_date),
        orders.shipping_option AS shipping_option
    ), payment_info_insert AS(
      INSERT INTO payment_info VALUES (
        uuid_generate_v4(),
        (SELECT order_uuid FROM order_info_insert),
        $5,
        $6,
        $7,
        $4,
        $9,
        $10,
        $11,
        $12
      )
      RETURNING card_number
    )
    
    INSERT INTO shipping_info VALUES (
      uuid_generate_v4(),
      (SELECT order_uuid FROM order_info_insert),
      $13,
      $14,
      $15,
      $16
    )
      RETURNING shipping_info.ship_city, shipping_info.ship_state, shipping_info.ship_zip, shipping_info.ship_street_address, 
      (SELECT order_uuid from order_info_insert) AS order_uuid, 
      (SELECT items FROM order_info_insert),
      (SELECT user_uuid FROM order_info_insert),
      (SELECT order_date FROM order_info_insert),
      (SELECT shipping_option FROM order_info_insert),
      (SELECT card_number FROM payment_info_insert)
    `,
    values: [
      cart_uuid, 
      user_uuid,
      email,
      nameOnCard,
      cardNumber,
      cardExp,
      cvv,
      shippingOption,
      billStreetAddress,
      billCity,
      billState,
      billZip,
      shipCity,
      shipState,
      shipZip,
      shipStreetAddress
    ]
  }

  db.query(query)
  .then(data=>{
    data.rows[0].card_number = 'XXXX XXXX XXXX ' + data.rows[0].card_number.slice(-4)
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
    res.send({message: 'Cart Cleared successfully'})
  })
  .catch(err=>console.error('Clear Cart Query Error: ', err))
})

app.get('/api/get-orders', (req, res, next)=>{
  const {user_uuid} = req.headers
  const query = {
    text: `
      SELECT 
        orders.order_uuid, 
        to_char(orders.order_date, 'DD Mon YYYY') AS order_date, 
        orders.items::json, 
        orders.shipping_option,
        payment_info.card_number,
        shipping_info.ship_city,
        shipping_info.ship_state,
        shipping_info.ship_street_address,
        shipping_info.ship_zip
      FROM orders
        JOIN payment_info ON orders.order_uuid = payment_info.order_uuid
        JOIN shipping_info ON orders.order_uuid = shipping_info.order_uuid
      WHERE orders.user_uuid = $1
    `,
    values: [user_uuid]
  }

  db.query(query)
  .then((data)=>{
    data.rows.forEach((element)=>{
      element.card_number = 'XXXX XXXX XXXX ' + element.card_number.slice(-4)
    })
    res.send(data.rows)
  })
  .catch(err=>{console.error('Get Orders Error: ', err)})
})

// fixes client side routing 'cannot get xxxxxxx' on refresh issue except when there is a url parameter
app.get('/*', (req, res, next) => {
  res.sendFile(`${pubDirectory}/index.html`, (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Node server listening on port 3000 or process.env.port')
  console.log('path.join(__dirname::: ', pubDirectory)
})
