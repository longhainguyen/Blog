const db = require('../models/index');

let findUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                where: {
                  name: data.username,
                  password: data.password,
                }
              });
            reject('find sucessfull');
        } catch (error) {
            reject('fail find user');
        }
    })
}

module.exports = {
    findUser:findUser,
}