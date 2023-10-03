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

//import jwt
const jwt = require('jsonwebtoken')

//to convert all incoming json data to js
app.use(express.json())

//create middleware to verify token
const jwtMiddleware = (req, res, next) => {
   console.log("...middleware...");
   //access token from request header
   try {
      const token = req.headers['access_token']
      //verify
      jwt.verify(token, 'secretkey123')
      //compiler to come out of function
      next()
   }
   catch {
      res.status(404).json(
         {
            statusCode: 404,
            status: false,
            message: "unauthorized user"
         }
      )
   }
}

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
app.get('/balance/:acno', jwtMiddleware, (req, res) => {
   logic.getBalance(req.params.acno).then(result => {
      res.status(result.statusCode).json(result)
   })
})

//get user details
app.get('/getUser/:acno', jwtMiddleware, (req, res) => {
   logic.getUser(req.params.acno).then(result => {
      res.status(result.statusCode).json(result)
   })
})

//fund transfer
app.post('/transfer', jwtMiddleware, (req, res) => {
   logic.fundTransfer(
      req.body.toAcno,
      req.body.fromAcno,
      req.body.amount,
      req.body.psw,
      req.body.date
   ).then(result => {
      res.status(result.statusCode).json(result)
   })
})

//transaction history
app.get('/transaction/:acno', jwtMiddleware, (req, res) => {
   logic.getTransaction(req.params.acno).then(result => {
      res.status(result.statusCode).json(result)
   })
})

//delete account
app.delete('/deleteacc/:acno', jwtMiddleware, (req, res) => {
   logic.deleteAcc(req.params.acno).then(result => {
      res.status(result.statusCode).json(result)
   })
})

//get request
// app.get('/getdata', (req, res)=>{
//    console.log(req.body.acno);
//    res.json(req.body.acno)
// })
























