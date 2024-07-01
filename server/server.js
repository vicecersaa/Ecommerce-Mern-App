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


//konfigurasi multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Folder untuk menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp untuk nama file unik
  }
});
const upload = multer({ storage });



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


  // Endpoint untuk meng-upload gambar
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`; // URL gambar
  res.json({ imageUrl });
});


app.post('/products', async (req, res) => {
  const { namaProduk, namaToko, kondisi, deskripsi, hargaProduk, stockProduk, gambarProduk } = req.body;
  const productDoc = new productModel({
    namaProduk,
    hargaProduk,
    namaToko,
    kondisi,
    deskripsi,
    gambarProduk, // Pastikan ini diterima dan disimpan
    stockProduk,
    variants: JSON.parse(variants),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  try {
    const savedProduct = await productDoc.save();
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
