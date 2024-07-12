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
const { body, validationResult } = require('express-validator');
require('dotenv').config();


// MIDDLEWARE
const saltRounds = 10;

// Middleware to authenticate user (if required)
const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
      try {
          const userData = jwt.verify(token, jwtSecret);
          req.user = await userModel.findById(userData.id);
          next();
      } catch (err) {
          res.status(401).json({ error: 'Unauthorized' });
      }
  } else {
      res.status(401).json({ error: 'Unauthorized' });
  }
};

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdsadasdasda';

const app = express() 
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());  // Untuk parsing aplikasi/json
app.use(bodyParser.urlencoded({ extended: true }));  // Untuk parsing aplikasi/x-www-form-urlencoded

const validateUpdate = [
  body('phoneNumber').optional().isString(),
  body('address').optional().isString(),
  // Add more validations as needed
];


mongoose.connect(process.env.MONGO_URL)






// ------------------------------------------------------------------------------------------------------ //

//ACCOUNT SETTINGS :


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
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const userDoc = await userModel.findOne({ email });
      if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
          jwt.sign({
              email: userDoc.email,
              id: userDoc._id
          }, jwtSecret, {}, (err, token) => {
              if (err) return res.status(500).json({ error: 'Failed to generate token' });
              res.cookie('token', token, { httpOnly: true, path: '/' }).json(userDoc);
          });
      } else {
          res.status(422).json({ error: 'Invalid credentials' });
      }
  } catch (err) {
      res.status(500).json({ error: 'Failed to login', details: err.message });
  }
});



 // LOGOUT USER
app.post('/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0) }); 
  res.status(200).send('Logged out successfully');
});



// PROFILE USER 
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) return res.status(401).json({ error: 'Unauthorized' });
          const user = await userModel.findById(userData.id);
          res.json({ name: user.name, email: user.email, _id: user._id, address: user.address, fullName: user.fullName, phoneNumber: user.phoneNumber, profilePicture: user.profilePicture });
      });
  } else {
      res.json(null);
  }
});


// UPDATE USER 
app.patch('/profile/update-profile/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
    
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
});


// CHANGE PASSWORD
app.post('/change-password', authenticateUser, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
      const userDoc = req.user;
      
      if (userDoc && bcrypt.compareSync(oldPassword, userDoc.password)) {
          const hashedPassword = bcrypt.hashSync(newPassword, bcryptSalt);
          userDoc.password = hashedPassword;
          await userDoc.save();
          res.status(200).json({ message: 'Password updated successfully' });
      } else {
          res.status(400).json({ error: 'Invalid old password' });
      }
  } catch (err) {
      res.status(500).json({ error: 'Failed to update password', details: err.message });
  }
});

// UPLOAD PROFILE PICTURE
app.post('/upload-profilePicture', authenticateUser, (req, res) => {
  upload(req, res, async function (err) {
      if (err) {
          return res.status(400).json({ error: 'Error uploading file', details: err.message });
      }
      if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'No files uploaded' });
      }

      // Map the uploaded files to their URLs
      const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

      // Update the user's profilePicture
      try {
          const userId = req.user._id; // Extract user ID from the request (make sure authenticateUser middleware sets req.user)
          const updatedUser = await userModel.findByIdAndUpdate(
              userId,
              { $push: { profilePicture: { $each: imageUrls } } },
              { new: true }
          );
          if (!updatedUser) {
              return res.status(404).json({ error: 'User not found' });
          }
          res.json({ profilePicture: updatedUser.profilePicture });
      } catch (error) {
          res.status(500).json({ error: 'Failed to update user', details: error.message });
      }
  });
});





// ------------------------------------------------------------------------------------------------------ //

//PRODUCT SETTINGS : 



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
  

// UPLOAD PRODUCT 

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



// ------------------------------------------------------------------------------------------------------ //

//PORT SETTINGS :




// PORT SETTING

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
