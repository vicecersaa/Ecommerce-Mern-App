const express = require('express');
require('dotenv').config();
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
const orderModel = require('./models/order');
const midtrans = require('./config/midtransConfig');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const helmet = require('helmet');


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
const jwtSecret = process.env.JWT_SECRET;

const app = express() 
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(helmet());


const corsOptions = {
    origin: process.env.NODE_ENV === 'development' ? 'https://forlandliving.com' : 'http://localhost:3000',
    credentials: true, 
    optionsSuccessStatus: 200 
};

console.log("Current NODE_ENV:", process.env.NODE_ENV);

app.use(cors(corsOptions));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  

const validateUpdate = [
  body('phoneNumber').optional().isString(),
  body('address').optional().isString(),
];




mongoose.connect(process.env.MONGO_URL)






// ------------------------------------------------------------------------------------------------------ //

//ACCOUNT SETTINGS :


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APPLICATION_SPECIFIC_PASSWORD
  }
});



// REGISTER ACCOUNT 
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  
  if (!name || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Format email tidak valid' });
  }

  
  const passwordRegex = /^[\S]{8,}$/;
  if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password harus memiliki minimal 8 kata.' });
  }

  try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ message: 'Email sudah terdaftar' });
      }

      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

      const userDoc = await userModel.create({
          name,
          email,
          role: 'user',
          password: hashedPassword,
      });

      res.status(201).json({ message: 'Registrasi berhasil', user: userDoc });
  } catch (e) {
      console.error('Error saat registrasi:', e);
      res.status(500).json({ message: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.' });
  }
});




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

  
  const hashedPassword = await bcrypt.hash(password, 10);

  
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


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const userDoc = await userModel.findOne({ email });

   
    if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
      jwt.sign({
          email: userDoc.email,
          id: userDoc._id
      }, jwtSecret, {}, (err, token) => {
          if (err) return res.status(500).json({ message: 'Failed to generate token' });
          res.cookie('token', token, { httpOnly: true, path: '/' }).json(userDoc);
      });
    } else {
      res.status(422).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to login', details: err.message });
  }
});


// FORGOT PASSWORD

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Reset Password',
      html: `<p>To reset your password, please click the link below:</p><p><a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>`,
    });

    

    res.json({ message: 'Reset password email sent' });
  } catch (error) {
    console.error('Error sending email:', error.message); 
    res.status(500).json({ error: 'Failed to send reset password email' });
  }
});



// RESET PASSWORD 

app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
      const userDoc = await userModel.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }
      });

      if (!userDoc) {
          return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      userDoc.password = bcrypt.hashSync(newPassword, bcryptSalt);
      userDoc.resetPasswordToken = undefined;
      userDoc.resetPasswordExpires = undefined;
      await userDoc.save();

      res.json({ message: 'Password reset successfully' });
  } catch (err) {
      res.status(500).json({ error: 'Failed to reset password', details: err.message });
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
  const upload = multer({ storage: storage }).single('image'); 
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'Error uploading file', details: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    

    try {
      const userId = req.user._id;
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { profilePicture: imageUrl }, 
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
  const { userId, productId, quantity, price, selectedVariant, selectedSize } = req.body;

  if (!selectedVariant || typeof selectedVariant !== 'object') {
      return res.status(400).json({ message: 'Invalid selectedVariant' });
  }

  if (!selectedSize || typeof selectedSize !== 'object') {
      return res.status(400).json({ message: 'Invalid selectedSize' });
  }

  try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await user.addToCart(productId, quantity, price, selectedVariant, selectedSize);
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
app.get('/order-history', authenticateUser, async (req, res) => {
  const userId = req.query.userId;
  try {
      const orders = await orderModel.find({ userId }).populate('items.productId');
      res.json(orders);
  } catch (error) {
      console.error('Failed to fetch order history:', error);
      res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

app.get('/get-orders', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    
    const orders = await orderModel.find({ status: 'Berhasil' })
      .populate({
        path: 'userId',
        select: 'name fullName phoneNumber address cart'
      })
      .populate({
        path: 'items.productId',
        select: 'name price selectedVariant selectedSize'
      });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});





// GET ADMIN 

app.get('/admin-users', async (req, res) => {
  try {
      const admins = await userModel.find({ role: 'admin' });
      res.status(200).json(admins);
  } catch (err) {
      res.status(500).json({ message: err.message });
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


  // get product id 
  app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

  // Search Filter 
  app.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        let products;

        if (!query) {
         
            products = await productModel.find().limit(5);
        } else {
       
            products = await productModel.find({
                namaProduk: { $regex: query, $options: 'i' }
            });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

  // Endpoint untuk meng-upload gambar
  app.post('/upload-image', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: 'Error uploading file', details: err.message });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        
        res.json({ imageUrls });
        
    });
}); 
  

// UPLOAD PRODUCT 

app.post('/products', authenticateUser, authenticateAdmin, async (req, res) => {
  const { namaProduk, namaToko, kondisi, deskripsi, hargaProduk, stockProduk, gambarProduk, variants, beratProduk, categoryProduk } = req.body;
  
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
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE PRODUCT

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const product = await productModel.findByIdAndDelete(id);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
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
app.post('/checkout', authenticateUser, async (req, res) => {
  const { items } = req.body;
  const userId = req.user._id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items provided for checkout' });
  }

  try {
    const user = await userModel.findById(userId).populate('cart.productId');
    if (!user) return res.status(404).json({ error: 'User not found' });

    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }

      if (item.quantity > product.stockProduk) {
        return res.status(400).json({ error: `Insufficient stock for product ${item.productId}` });
      }

      
      const productName = product.namaProduk.length > 50 ? product.namaProduk.substring(0, 50) : product.namaProduk;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: productName,
        selectedVariant: item.selectedVariant,
        selectedSize: item.selectedSize
      });

      totalAmount += item.price * item.quantity;
    }

    const order = new orderModel({
      userId,
      items: orderItems,
      totalAmount,
      status: 'Berlangsung'
    });

    const savedOrder = await order.save();

    const transactionDetails = {
      order_id: savedOrder._id.toString(),
      gross_amount: totalAmount,
    };

    const itemDetails = orderItems.map(item => ({
      id: item.productId.toString(),
      price: item.price,
      quantity: item.quantity,
      name: item.name,
    }));

    const midtransTransaction = await midtrans.createTransaction({
      transaction_details: transactionDetails,
      item_details: itemDetails,
      customer_details: {
        first_name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        billing_address: user.address,
        shipping_address: user.address
      }
    });

    savedOrder.midtransToken = midtransTransaction.token;
    await savedOrder.save();

    res.json({ 
      message: 'Order created successfully',
      order: savedOrder,
      paymentUrl: midtransTransaction.redirect_url,
      paymentToken: midtransTransaction.token 
    });

  } catch (error) {
    console.error('Checkout failed:', error);
    res.status(500).json({ error: 'Checkout failed', details: error.message });
  }
});



// Midtrans notification endpoint
app.post('/midtrans-notification', async (req, res) => {
  const { order_id, transaction_status } = req.body;

  

  try {
      const order = await orderModel.findById(order_id);

      if (!order) {
          console.error('Order not found:', order_id);
          return res.status(404).json({ error: 'Order not found' });
      }

      if (transaction_status === 'capture' || transaction_status === 'settlement') {
          order.status = 'Berhasil';
          
          
          const midtransTransaction = await midtrans.transaction.status(order_id);
          order.invoiceUrl = midtransTransaction.invoice_url || midtransTransaction.redirect_url || null;
          
          await order.save();

          
          await userModel.findByIdAndUpdate(order.userId, { $set: { cart: [] } });
      } else if (transaction_status === 'deny' || transaction_status === 'cancel' || transaction_status === 'expire') {
          order.status = 'Tidak Berhasil';
          await order.save();
      } else if (transaction_status === 'pending') {
          order.status = 'Berlangsung';
          await order.save();
      }

      

      res.status(200).send('OK');
  } catch (error) {
      console.error('Midtrans notification failed:', error);
      res.status(500).send('Notification handling failed');
  }
});





// CHECKOUT DIRECT 
app.post('/checkout-direct', async (req, res) => {
  const { userId, productId, quantity, price, selectedSize, selectedVariant } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (quantity > product.stockProduk) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }

    const totalAmount = quantity * price;

    
    const newOrder = new orderModel({
      userId,
      items: [{ 
        productId, 
        quantity, 
        price, 
        name: product.namaProduk,
        selectedSize: selectedSize,    
        selectedVariant: selectedVariant 
      }],
      totalAmount,
    });

    
    const savedOrder = await newOrder.save();

    
    const transactionDetails = {
      order_id: savedOrder._id.toString(),
      gross_amount: totalAmount,
    };

    const itemDetails = [{
      id: product._id.toString(),
      price: price,
      quantity: quantity,
      name: product.namaProduk.substring(0, 50),
    }];

    const midtransTransaction = await midtrans.createTransaction({
      transaction_details: transactionDetails,
      item_details: itemDetails,
      customer_details: {
        first_name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        billing_address: {
          first_name: user.name,
          email: user.email,
          phone: user.phoneNumber,
          address: user.address 
        },
        shipping_address: {
          first_name: user.name,
          email: user.email,
          phone: user.phoneNumber,
          address: user.address 
        }
      }
    });

    
    savedOrder.midtransToken = midtransTransaction.token;
    await savedOrder.save();

    res.status(201).json({ 
      message: 'Order placed successfully',
      order: savedOrder,
      paymentUrl: midtransTransaction.redirect_url,
      paymentToken: midtransTransaction.token 
    });
  } catch (error) {
    console.error('Checkout-direct failed:', error);
    res.status(500).json({ message: error.message });
  }
});




// UPDATE PRODUCT
app.patch('/update-product/:id', authenticateUser, authenticateAdmin, (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(400).json({ error: 'Error uploading files', details: err.message });
    
    const { id } = req.params;
    const { namaProduk, hargaProduk, kategoriProduk, deskripsi, stockProduk, isActive, variants } = req.body;

    try {
      const product = await productModel.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      product.namaProduk = namaProduk || product.namaProduk;
      product.hargaProduk = hargaProduk || product.hargaProduk;
      product.kategoriProduk = kategoriProduk || product.kategoriProduk;
      product.deskripsi = deskripsi || product.deskripsi;
      product.stockProduk = stockProduk || product.stockProduk;
      product.isActive = isActive !== undefined ? isActive : product.isActive;
      product.variants = variants || product.variants;

      if (req.files && req.files.length > 0) {
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        product.gambarProduk = imageUrls;
      }

      const updatedProduct = await product.save();
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product', details: error.message });
    }
  });
});






// ------------------------------------------------------------------------------------------------------ //

//PORT SETTINGS :

const PORT = process.env.PORT || 5000;


// PORT SETTING

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
