const { raw } = require('express');
const db = require('../models/index');

let findPost = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findAll({
                where: {},
                order: [['createdAt', 'DESC']], // Sắp xếp các bài post theo thứ tự giảm dần của createdAt
                raw: true,
            });
            resolve(post);
        } catch (error) {
            reject('fail find user');
        }
    })
}

module.exports = {
    findPost:findPost,
}