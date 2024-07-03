const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userModel = require('./models/user');
const productModel = require('./models/products');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
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
app.use(bodyParser.json());  // Untuk parsing aplikasi/json
app.use(bodyParser.urlencoded({ extended: true }));  // Untuk parsing aplikasi/x-www-form-urlencoded

mongoose.connect(process.env.MONGO_URL)



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


  //konfigurasi multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array('image');



  // Endpoint untuk meng-upload gambar
  app.post('/upload-image', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: 'Error uploading file', details: err.message });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        // Map the uploaded files to their URLs
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        
        res.json({ imageUrls });
        console.log(`Error : ${imageUrls}`);
    });
}); 


app.post('/products', async (req, res) => {
  const { namaProduk, namaToko, kondisi, deskripsi, hargaProduk, stockProduk, gambarProduk, variants, beratProduk } = req.body;
  console.log('Received data:', req.body);
  try {
  

    const productDoc = new productModel({
      namaProduk,
      hargaProduk,
      namaToko,
      kondisi,
      deskripsi,
      gambarProduk,
      stockProduk,
      variants,
      beratProduk,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedProduct = await productDoc.save();
    console.log(savedProduct)
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(422).json({ error: 'Gagal menyimpan produk', details: error.message });
  }
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  // GET PRODUCT 

  app.get('/products', async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
        console.log(products)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// PORT SETTING

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
