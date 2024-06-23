const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);

const app = express() 
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req,res) => {
    res.json('test ok')
})






// REGISTER USER

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userDoc = await userModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
    
})

// LOGIN USER 

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await userModel.findOne({email})
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            res.status(200).json('pass ok')
        } else {
            res.status(404).json('wrong password')
        }
    } else {
        res.status(400).json('not found')
    }
})



// PORT SETTING

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
