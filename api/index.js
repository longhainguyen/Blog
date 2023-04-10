const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const connectDB = require('./connect/connectDB');
const createUser = require('./CRUDservices/createUser')
const findUser = require('./CRUDservices/findUser');
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.post('/register', async (req, res) => {
    const data = req.body;
    console.log(data.username, data.password);
    try {
        await createUser.createNewUser(data);
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async (rep, res) => {
    const data = rep.body;
    try {
        await findUser.findUser(data);
    } catch (error) {
        console.log(error);
    }
})

app.listen(4000);
// mongodb
// user blog
// pass L2xa4NGH9r1mgT3h
// mongodb+srv://long:<longnguyen>@cluster0.6iiafjj.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://long:<longnguyen>@cluster0.6iiafjj.mongodb.net/?retryWrites=true&w=majority