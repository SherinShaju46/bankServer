//**server creation starts */
//import express
const express = require('express');

//app creation
const app = express()

//port set
app.listen(3000, () => {
   console.log("server started at port 3000");
})
//**server creation ends */

//integrate frontend with server
const cors = require('cors');
app.use(cors({ origin: "http://localhost:4200" }))

//import logic.js file
const logic = require('./service/logic');

//to convert all incoming json data to js
app.use(express.json())

//incoming requests
//post request
app.post('/register', (req, res) => {
   // console.log(req.body.acno);
   // res.send("post method worked")
   logic.register(req.body.acno, req.body.uname, req.body.psw).then(result => {
      res.status(result.statusCode).json(result)
   })
})

//login request
app.post('/login', (req, res) => {
   logic.login(req.body.acno, req.body.psw).then(result => {
      res.status(result.statusCode).json(result)
   })
})

//balance check
app.get('/balance/:acno', (req, res) => {
   logic.getBalance(req.params.acno).then(result => {
      res.status(result.statusCode).json(result)
   })
})

//get request
// app.get('/getdata', (req, res)=>{
//    console.log(req.body.acno);
//    res.json(req.body.acno)
// })
























