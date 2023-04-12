const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const connectDB = require('./connect/connectDB');
const createUser = require('./CRUDservices/createUser')
const findUser = require('./CRUDservices/findUser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const app = express();
const secret = 'dha7tqw76dqgd2ysb8g2t21g87';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.post('/register', async (req, res) => {
    const data = req.body;
    console.log(data.username, data.password);
    try {
        await createUser.createNewUser(data);
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
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id:userDoc._id,
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


app.listen(4000);
// mongodb
// user blog
// pass L2xa4NGH9r1mgT3h
// mongodb+srv://long:<longnguyen>@cluster0.6iiafjj.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://long:<longnguyen>@cluster0.6iiafjj.mongodb.net/?retryWrites=true&w=majority