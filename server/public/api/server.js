const express = require("express");
const app = express();

const path = require("path");
const pubDirectory = path.join(__dirname, "server/public/api/server.js");
// console.log('path: ', pubDirectory);
app.use(express.static(pubDirectory));
app.use(express.json());

// const cors = require("cors");
// app.use(cors());


// const mysql = require("mysql");
// const creds = require("./mysql_credentials");
// const db = mysql.createPool(creds);

// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("../../db.json");
// const jsonMiddleware = jsonServer.defaults();
// // const port = process.env.PORT || 3001;

// server.use(jsonMiddleware);
// server.use(router);
// // server.listen(port);

// app.get('/', (req, res, next)=>{
//     res.sendFile(pubDirectory);
// })

app.listen(3001, ()=>{
    console.log('Node server listening on port 3001.');
})