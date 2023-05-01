const db = require('../models/index');

let createNewPost = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Post.create({
                title: data.title,
                summary: data.summary,
                content: data.content,
                cover: data.cover,
                authorID: data.authorID,
                author: data.author,
            })
            reject('create sucessfull');
        } catch (error) {
            reject('fail create new post');
        }
    })
}

module.exports = {
    createNewPost:createNewPost,
}

