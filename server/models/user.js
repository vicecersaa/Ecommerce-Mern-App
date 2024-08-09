const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define ukuranSchema to match the size schema used in Product
const ukuranSchema = new Schema([{
    ukuran: { type: String },
    harga: { type: Number }
}], { _id: false });

// Define variantSchema to match the variant schema used in Product
const variantSchema = new Schema([{
    namaVarian: { type: String },
    ukuranVarian: [ukuranSchema],
    harga: { type: Number }
}], { _id: false });

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    phoneNumber: String,
    role: { type: String, default: 'user' },
    profilePicture: String,
    fullName: String,
    metodePembayaran: [{ type: String }],
    historiTransaksi: [{ type: Schema.Types.ObjectId, ref: "Transaksi" }],
    totalBarang: { type: Number, required: true, default: 0 },
    cart: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        selectedVariant: variantSchema,  
        selectedSize: ukuranSchema        
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    totalBelanja: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.methods.addToCart = async function (productId, quantity, price, selectedVariant, selectedSize) {
    const existingCartItem = this.cart.find(item => item.productId.equals(productId));

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
    } else {
        if (typeof selectedVariant !== 'object' || typeof selectedSize !== 'object') {
            throw new Error('selectedVariant and selectedSize must be objects');
        }
        this.cart.push({ productId, quantity, price, selectedSize, selectedVariant });
    }

    await this.calculateTotalBelanja(); 

    return this.save();
};

userSchema.methods.removeFromCart = async function (productId) {
    this.cart = this.cart.filter(item => !item.productId.equals(productId));

    await this.calculateTotalBelanja();  

    return this.save();
};

userSchema.methods.updateCartItem = async function (productId, quantity) {
    const item = this.cart.find(item => item.productId.equals(productId));

    if (item) {
        item.quantity = quantity;
    }

    await this.calculateTotalBelanja(); 

    return this.save();
};

// Helper method to calculate totalBelanja
userSchema.methods.calculateTotalBelanja = async function () {
    const products = await mongoose.model('Product').find({ _id: { $in: this.cart.map(item => item.productId) } });
    
    this.totalBelanja = this.cart.reduce((total, cartItem) => {
        const product = products.find(product => product._id.equals(cartItem.productId));
        if (product) {
            return total + (cartItem.quantity * product.hargaProduk);
        }
        return total;
    }, 0);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
