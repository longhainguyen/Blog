const db = require('../models/index');
const bcrypt = require('bcryptjs')

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let createNewUser = async (data) => {
    let hashPass = await hashUserPassword(data.password);
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.create({
                name: data.username,
                password: hashPass,
            })
            reject('create sucessfull');
        } catch (error) {
            reject('fail create new user');
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject('fail hash password');
        }
    })
}

module.exports = {
    createNewUser:createNewUser,
}