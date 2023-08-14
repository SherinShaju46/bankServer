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

//function to check balance
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

//to get user details
getUser = (acno) => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200
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

//function to transfer money and update balance
fundTransfer = (toAcno, fromAcno, amount, psw, date) => {
    let amnt = parseInt(amount)
    return db.User.findOne({ acno: fromAcno, psw }).then(fromUser => {
        if (fromUser) {
            return db.User.findOne({ acno: toAcno }).then(toUser => {
                if (toUser) {
                    if (amnt > fromUser.balance) {
                        return {
                            message: "insufficient balance",
                            status: false,
                            statusCode: 405
                        }
                    }
                    else {
                        fromUser.balance -= amnt
                        fromUser.transactions.push({
                            type: 'DEBIT',
                            to: toUser.acno,
                            amount: amnt,
                            date
                        })
                        fromUser.save()

                        toUser.balance += amnt
                        toUser.transactions.push({
                            type: 'CREDIT',
                            from: fromUser.acno,
                            amount: amnt,
                            date
                        })
                        toUser.save()

                        return {
                            message: "transaction success",
                            status: true,
                            statusCode: 200,
                            balance: fromUser.balance
                        }
                    }
                }
                else {
                    return {
                        message: "invalid to account credentials",
                        status: false,
                        statusCode: 404
                    }
                }
            })
        }
        else {
            return {
                message: "invalid acno or password",
                status: false,
                statusCode: 404
            }
        }
    })
}

//export function
module.exports = {
    register, login, getBalance, getUser, fundTransfer
}
