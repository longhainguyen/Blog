const { raw } = require('express');
const db = require('../models/index');
const bcrypt = require('bcryptjs')

let findUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                where: {
                  name: data.username,
                },
                raw:true,
              });
            resolve(user);
        } catch (error) {
            reject('fail find user');
        }
    })
}

module.exports = {
    findUser:findUser,
}