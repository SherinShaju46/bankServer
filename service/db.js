//import mongoose
const mongoose = require('mongoose')

//add connection string
mongoose.connect("mongodb://0.0.0.0:27017/bankServer")

//model
const User = mongoose.model('User', {
    acno: Number,
    uname: String,
    psw: String,
    balance: Number,
    transactions: []
})

//export
module.exports={User}