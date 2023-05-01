const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const connectDB = require('./connect/connectDB');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');

const createUser = require('./CRUDservices/createUser');
const createNewPost = require('./CRUDservices/createPost');
const findUser = require('./CRUDservices/findUser');
const findListPost = require('./CRUDservices/findPost');
const findPostById = require('./CRUDservices/findPostById');
const updatePost = require('./CRUDservices/updatePost');

const upload = multer({ dest: 'uploads/' })

const app = express();
const secret = 'dha7tqw76dqgd2ysb8g2t21g87';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

connectDB();

app.post('/register', async (req, res) => {
    const data = req.body;
    console.log(data.username, data.password);
    try {
        await createUser.createNewUser(data);
        const username = data.username;
        jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc.id,
                username,
            });
        })
    } catch (error) {
        console.log(error);
    }
});

app.post('/login', async (rep, res) => {
    const data = rep.body;
    try {
        const userDocList = await findUser.findUser(data);
        const userDoc = userDocList[0];
        const passOk = bcrypt.compareSync(data.password, userDoc.password);
        if (passOk) {
            //login
            const username = data.username;
            jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id: userDoc.id,
                    username,
                });
            })
        } else {
            res.status(400).json('wrong password');
        }

    } catch (error) {
        console.log(error);
        res.status(400).json(e);
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        // Xử lý lỗi khi không tìm thấy token trong cookie
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            // Xử lý lỗi xác thực token thất bại
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.json(info);
    });
});


app.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' }).json('ok');
});

app.post('/post', upload.single('file'), async (req, res) => {
    const fileData = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
    };
    const parts = fileData.originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = fileData.path + '.' + ext;
    fs.renameSync(fileData.path, newPath);

    const postData = {
        title: req.body.title,
        content: req.body.content,
        summary: req.body.summary,
        cover: newPath,
        authorID: -1,
        author: '',
    }
    const { token } = req.cookies;
    if (!token) {
        // Xử lý lỗi khi không tìm thấy token trong cookie
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            // Xử lý lỗi xác thực token thất bại
            return res.status(401).json({ error: 'Unauthorized' });
        }
        postData.authorID = info.id;
        postData.author = info.username;
        try {
            const postDoc = await createNewPost.createNewPost(postData);
            res.json(postDoc);
        } catch (error) {
            console.log(error);
        }
    });
});

app.get('/post', async (req, res) => {
    const listPosts = await findListPost.findPost();
    res.json(listPosts);
});

app.get('/post/:id', async (req, res) => {
    if (req.params.id != null) {
        const postDocList = await findPostById.findPostByID(req.params.id);
        const postDoc = postDocList[0];
        res.json(postDoc);
    }
});

app.put('/post', upload.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const fileData = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
        };
        const parts = fileData.originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = fileData.path + '.' + ext;
        fs.renameSync(fileData.path, newPath);
    }

    const { token } = req.cookies;
    if (!token) {
        // Xử lý lỗi khi không tìm thấy token trong cookie
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            // Xử lý lỗi xác thực token thất bại
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const postDoc = await findPostById.findPostByID(req.body.id);
        const postData = {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            summary: req.body.summary,
            cover: newPath ? newPath : postDoc.cover,
        }
        await updatePost.updatePost(postData);
        res.json(postData);
    });
});


app.listen(4000);
// mongodb
// user blog
// pass L2xa4NGH9r1mgT3h
// mongodb+srv://long:<longnguyen>@cluster0.6iiafjj.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://long:<longnguyen>@cluster0.6iiafjj.mongodb.net/?retryWrites=true&w=majority