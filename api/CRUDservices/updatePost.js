const { raw } = require('express');
const db = require('../models/index');

let updatePost = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.update({
                title: data.title,
                summary: data.summary,
                content: data.content,
                cover: data.cover,
            }, {
                where: {
                    id:data.id,
                }
            });
            resolve(post);
        } catch (error) {
            reject('fail update post');
        }
    })
}

module.exports = {
    updatePost:updatePost,
}