const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdsadasdasda';

const app = express() 
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
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
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await userModel.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });


// PROFILE USER 

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await userModel.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });



// PORT SETTING

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
