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
const orderModel = require('./models/order');

// MIDDLEWARE
const saltRounds = 10;

// Middleware to authenticate user 
const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const userData = jwt.verify(token, jwtSecret);
    const user = await userModel.findById(userData.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

// Middleware to authenticate admin 
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Access is denied' });
  }
  next();
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
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  

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
            role: role || 'user',
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
    
})


// REGISTER ADMIN ACCOUNT
app.post('/register-admin', authenticateUser, async (req, res) => {
  if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admins can create new admins' });
  }

  const { name, email, password } = req.body;

  
  const existingAdmin = await userModel.findOne({ email });
  if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new admin
  const newAdmin = new userModel({
      name,
      email,
      password: hashedPassword,
      role: 'admin' 
  });

  try {
      await newAdmin.save();
      res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Failed to register admin', details: error.message });
  }
});


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
          res.json({ name: user.name, email: user.email, _id: user._id, address: user.address, fullName: user.fullName, phoneNumber: user.phoneNumber, profilePicture: user.profilePicture, role: user.role });
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



//UPLOAD PROFILE PICTURE
app.post('/upload-profilePicture', authenticateUser, (req, res) => {
  const upload = multer({ storage: storage }).single('image'); // Hanya mengizinkan satu file
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'Error uploading file', details: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    console.log('Uploaded image URL:', imageUrl);

    try {
      const userId = req.user._id;
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { profilePicture: imageUrl }, // Simpan satu URL gambar
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ profilePicture: updatedUser.profilePicture });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
  });
});


// Add to cart
app.post('/add-to-cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await user.addToCart(productId, quantity);
      res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Update cart item
app.patch('/update-cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await user.updateCartItem(productId, quantity);
      const updatedUser = await userModel.findById(userId).populate('cart.productId'); 
      res.status(200).json({ message: 'Cart updated', cart: updatedUser.cart });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Remove item from cart
app.post('/remove-from-cart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await user.removeFromCart(productId);
      res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Get cart
app.get('/get-cart', async (req, res) => {
  const { userId } = req.query;

  try {
      const user = await userModel.findById(userId).populate('cart.productId');
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({ cart: user.cart });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// ORDER HISTORY
app.get('/order-history', async (req, res) => {
  const { userId } = req.query;

  try {
      const orders = await orderModel.find({ userId }).populate('items.productId', 'namaProduk gambarProduk hargaProduk');

      res.json(orders);
  } catch (error) {
      console.error('Failed to fetch order history:', error);
      res.status(500).json({ error: 'Failed to fetch order history' });
  }
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

app.post('/products', authenticateUser, authenticateAdmin, async (req, res) => {
  const { namaProduk, namaToko, kondisi, deskripsi, hargaProduk, stockProduk, gambarProduk, variants, beratProduk, categoryProduk } = req.body;
  console.log('Received data:', req.body);
  try {
    const productDoc = new productModel({
      namaProduk,
      categoryProduk,
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
    console.log(savedProduct);
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

// GET PRODUCT CATEGORY 

app.get('/categories', authenticateUser, async (req, res) => {
  let { query } = req.query;
  query = typeof query === 'string' ? query : '';
  try {
    const categories = await productModel.distinct('categoryProduk', {
      categoryProduk: { $regex: query, $options: 'i' }
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil kategori', details: error.message });
  }
});

// CHECKOUT PRODUK
app.post('/checkout', async (req, res) => {
  const { userId, items } = req.body;

  try {
      const orderItems = items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.productId.hargaProduk, 
      }));

      const order = new orderModel({
          userId,
          items: orderItems,
          totalAmount: orderItems.reduce((total, item) => total + item.price * item.quantity, 0),
          status: 'Berlangsung'
      });

     
      await order.save();

      
      await userModel.findByIdAndUpdate(userId, { $set: { cart: [] } });

      res.json(order);
  } catch (error) {
      console.error('Checkout failed:', error);
      res.status(500).json({ error: 'Checkout failed' });
  }
});



// CHECKOUT DIRECT 
app.post('/checkout-direct', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const product = await productModel.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      // Ensure quantity does not exceed stock
      if (quantity > product.stockProduk) {
          return res.status(400).json({ message: 'Insufficient stock available' });
      }

      // Create a new order
      const newOrder = new orderModel({
          userId,
          items: [{ productId, quantity, price: product.hargaProduk }],
          status: 'Berlangsung',
          totalAmount: quantity * product.hargaProduk
      });

      // Save the order
      await newOrder.save();

      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});




// ------------------------------------------------------------------------------------------------------ //

//PORT SETTINGS :




// PORT SETTING

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
