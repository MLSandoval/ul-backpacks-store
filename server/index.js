//load environmental variables from env file
require('dotenv').config({path: 'backpack_shopping_cart/.env'})

console.log('process.env: ', process.env)

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

app.get('/api/test', (req, res, next) => {
  res.send({
    list: ['One', 'Two', 'Three', 'Four', 'Five'],
    message: 'this is a test endpoint'
  })
})

app.get('/api/fake-get-products', (req, res, next) => {
  
  res.send({
    products: [
      {
        id: 0,
        brand: 'Gossamer Gear',
        name: 'Mariposa',
        price: 26000,
        size: 60,
        weight: '2lb 1oz',
        material: '200D Robic Nylon',
        short_description:
          'With a removable internal frame, load lifters, and 7 built-in pockets, this is a gear-hauling workhorse that weighs in at just 2 pounds.',
        long_description:
          'This award-winning pack’s roomy main pocket holds your shelter, clothing, sleeping pad and food. There are seven extra pockets - one mesh for wet stuff, two easy-to-reach for water and high-energy snacks, and the rest for whatever else. Made of custom 100 and 200 denier Robic nylon fabric, this tough, light pack delivers a very comfortable carry even with overloaded with 35 pounds of gear.',
        images: [
          './images/product_images/Mariposa/Mariposa_1.png',
          './images/product_images/Mariposa/Mariposa_2.png',
          './images/product_images/Mariposa/Mariposa_3.png',
          './images/product_images/Mariposa/Mariposa_4.png'
        ],
        features: [
          'New belt with added stiffener and stay integration for superior load transfer and comfort',
          'New unisex ergonomic belt shape',
          'New larger more functional integrated hipbelt pockets',
          'Unisex ergonomic harness for both men and women',
          'The Mariposa is best with loads under 30lbs but will handle up to 35 just fine',
          'Made of our custom 100 and 200 denier Robic nylon',
          'It comes with a SitLight pad and a removable stay',
          'The belt is sold separately to allow customers to choose the size they need',
          'OTT (Over-the-Top) closure system provides an easy secure closure',
          'Rear mesh pocket great for drying gear and other gear storage',
          'Custom air mesh fabric on shoulder straps and hipbelt for less friction and more comfort',
          'New trekking pole hardware for storing them outside the pack',
          'Right side bottle pockets accessible without taking off pack',
          'Internal hydration sleeve and drinking tube keeper loops on both shoulder straps',
          'Harness includes multiple attachment points for accessorizing',
          'Lashing loop doubles as ice axe holder',
          'Updated hipbelt includes new removable internal stay system',
          'Need help with the sizing? Find out how to properly fit a backpack!'
        ]
      },
      {
        id: 1,
        brand: 'ULA Equipment',
        name: 'CDT',
        price: 14500,
        size: 54,
        weight: '1lb 8oz',
        material: '400D Robic Nylon',
        short_description:
          'With just over 50 liters of available space, it is suitable for thru-hikes, day hikes, and any distance back-country forays.',
        long_description:
          'The CDT is our lightest, most basic backpack. With just over 50 liters of available space, the CDT is the largest of three frameless packs we make and is suitable for thru-hikes, day hikes, travel, and any distance back-country forays. The CDT pack continues the tradition of being a reliable, lightweight, and durable backcountry companion. The maximum comfortable load in this pack is approximately 18 pounds or less. No matter what anyone claims, no frameless pack is comfortable over this load and the CDT is no exception. At these loads, the contoured shoulder straps and redesigned hip-belt result in a comfortable carry.',
        images: [
          './images/product_images/CDT/cdt_1.png',
          './images/product_images/CDT/cdt_2.png',
          './images/product_images/CDT/cdt_3.png',
          './images/product_images/CDT/cdt_4.png'
        ],
        features: [
          'Internal Pad Holster',
          'Contoured Padded Hipbelt',
          'Contoured Shoulder Straps',
          'Hipbelt Pockets',
          'Front Mesh Pocket',
          '400 Robic Adjustable Side Pockets',
          'Drawstring Extension Collar',
          'Adjustable/Bellowed Side Pockets',
          '400d Robic Bottom Panel',
          'Ice Axe/Pole Retention Loops',
          'Side/ Top Suspension Straps',
          'ULA 400 Robic',
          'Hydration Sleeve (1.4 oz)',
          'Internal Stash Pocket (1.1 oz)',
          'Water Bottle Holsters (0.8 oz)',
          'Handloops (0.8 oz)',
          'Foam Pad (1.2 oz)'
        ]
      },
      {
        id: 2,
        brand: 'HMG',
        name: 'Windrider 3400',
        price: 34000,
        size: 55,
        weight: '2lb 0oz',
        material: 'Dyneema Composite',
        short_description:
          'The 3400 volume size (55L) is ideal for weekend, section, or thru hikes where resupply points are less frequent, or for a trip that needs flexibility. ',
        long_description:
          'When the extra volume is not in use, the 3400’s top can roll down enough to make the overall size of the pack similar to the 2400, but that additional space can come in pretty handy when you need it. The ultralight central vessel of the Windrider is constructed with 100% waterproof Dyneema® Composite Fabrics. The external mesh pockets provide ample room for the equipment you’ll want access to without having to open your pack and dig, and they’re great for drying out wet clothing as you go.',
        images: [
          './images/product_images/Windrider/HMG_Windrider_1.png',
          './images/product_images/Windrider/HMG_Windrider_2.png',
          './images/product_images/Windrider/HMG_Windrider_3.png',
          './images/product_images/Windrider/HMG_Windrider_4.png'
        ],
        features: [
          'Made in Maine',
          'Three external mesh pockets -- Makes it easy to see what\'s in your pockets and allows gear to dry faster',
          'Removable, contoured aluminum stays',
          'Hardline with Dyneema® shoulder straps with 3/8” closed cell foam and spacer mesh',
          '1/4” foam back panel pad',
          'Compression System',
          'Roll-Top closure system with side compression straps for vertical compression',
          'Side compression straps for horizontal compression',
          'Top Y-strap compression -- Designed to secure gear',
          'Hardline with Dyneema® dual-density hip belt with 1/8” closed cell rigid foam, 1/4” closed cell foam and spacer mesh',
          'Hardline with Dyneema® zippered pockets on hip belt with #5 YKK zipper',
          'Adjustable sternum strap with self-tensioning elastic',
          'Ice Axe loop',
          'Hydro port and internal mesh hydro sleeve',
          'Four exterior triglide buckles for optional pack accessory straps',
          'Proprietary seam sealing on all side seams and behind all sewn-on pack features'
        ]
      },
      {
        id: 3,
        brand: 'Osprey',
        name: 'Levity',
        price: 27000,
        size: 55,
        weight: '1lb 5oz',
        material: '30D Cordura Silnylon',
        short_description:
          'The Osprey Levity 60 is the most comfortable and ventilated pack ever made for the lightest loads imaginable. It\'s perfect for weeklong, or even month long trips.',
        long_description:
          'The Osprey Levity 60 is the most comfortable and ventilated pack ever made for the lightest loads imaginable. It\'s perfect for weeklong, or even month long trips. In fact, it\'s probably not the right pack for you. It\'s for people who pack lighter, go further, and think smarter. This pack isn\'t on Instagram, because phones are too heavy, and views look better in your mind anyway. But if you are one of those maniacal gram-counters, look no further. Backed by our All Mighty Guarantee, forever.',
        images: [
          './images/product_images/Levity/levity_1.png',
          './images/product_images/Levity/levity_2.png'
        ],
        features: [
          'Fixed top lid with zippered pocket for organizing smaller items',
          'Bellowed front fabric pocket stores rain gear for easy access when skies darken, or wet gear after the downpour stops',
          'Dual access fabric side pockets for water bottles or smaller items with removable InsideOut compression cord',
          'Internal main compartment compression strap',
          'Top lid cord loop attachment points for external gear attachment',
          'Sternum strap with integrated safety whistle'
        ]
      }
    ],
    message: 'Successful product fetch'
  })
})

app.get('/api/fetch-products', (req, res, next)=>{
  console.log('this is hitting real fetch-products enpoint')
  const query = 'SELECT * FROM products;'

  db.query(query)
    .then(data=> {
      console.log('query data RETURNED: ', data.rows)
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
    text: `SELECT users.user_uuid, users.email, users.first_name, users.last_name, cart.cart_uuid, cart.cart_items 
      FROM users, cart 
      WHERE users.user_uuid = $1
        AND cart.user_uuid = $1`,
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
        VALUES (uuid_generate_v4(),(SELECT user_uuid FROM new_user), '[]')
          RETURNING (SELECT user_uuid FROM new_user), cart.cart_uuid`,
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