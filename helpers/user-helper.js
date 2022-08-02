var db = require('../config/connection')
var collections = require('../config/collections')
const bcrypt = require('bcrypt')
var objectId=require('mongodb').ObjectId
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userData)

            resolve(userData)
        })

    }, doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({ email: userData.email })
            if (user) {

                bcrypt.compare(userData.password, user.password).then((status) => {

                    if (status) {
                        console.log("login");
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("failed to connect");
                        resolve({ Status: false })
                    }

                })
            } else {
                console.log("no user found");
                resolve({ Status: false })
            }
        })
    }, getUsers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collections.USER_COLLECTION).find().toArray()

            resolve(users)
        })
    }, userDetails: (userId) => {

        return new Promise(async (resolve, reject) => {
            await db.get().collection(collections.USER_COLLECTION).findOne({ _id: objectId(userId) }).then((user) => {
                resolve(user)
            })
        })

    },
    updateProducts:(userId,userDetails)=>{
        console.log(userDetails);
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USER_COLLECTION)
            .update({_id:objectId(userId)},{
                $set:{
                   name:userDetails.name,
                    email:userDetails.email
               }
            }).then((response)=>{
                resolve()
            })
        })

    },
    deleteProduct:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USER_COLLECTION).remove({_id:objectId(userId)}).then((response)=>{
                   console.log(response);
                resolve(response)
            })
        })
    },
    addUser: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userData)

            resolve(userData)
        })

    }
}
