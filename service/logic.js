//import db.js file to get db details here
const db = require('./db.js')

//create a function for register logic
register = (acno, uname, psw) => {
    //collection key:arg
    return db.User.findOne({ acno }).then(user => {
        //if user with acno found
        if (user) {
            return {
                message: "user already exists",
                status: false,
                statusCode: 404
            }
        }
        else {
            //creating an object for new user
            newuser = new db.User({
                acno: acno,
                uname: uname,
                psw: psw,
                balance: 0,
                transactions: []
            })
            //save new object to reflect the change in db
            newuser.save()
            return {
                message: "registered successfully",
                status: true,
                statusCode: 200,
            }
        }
    })
}

//login function
login = (acno, psw) => {
    return db.User.findOne({ acno, psw }).then(user => {
        if (user) {
            return {
                message: "login successful",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                currentAcno: user.acno
            }
        }
        else {
            return {
                message: "login failed, incorrect acno or psw",
                status: false,
                statusCode: 401
            }
        }
    })
}

getBalance = (acno) => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                message: user.balance,
                status: true,
                statusCode: 200,
            }
        }
        else {
            return {
                message: "incorrect acno",
                status: false,
                statusCode: 401
            }
        }
    })
}
//export function
module.exports = {
    register, login, getBalance
}
