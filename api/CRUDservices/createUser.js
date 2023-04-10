const db = require('../models/index');

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.create({
                name: data.username,
                password: data.password
            })
            reject('create sucessfull');
        } catch (error) {
            reject('fail create new user');
        }
    })
}

module.exports = {
    createNewUser:createNewUser,
}