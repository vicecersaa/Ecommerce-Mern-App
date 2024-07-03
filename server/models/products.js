const mongoose = require('mongoose');
const {Schema} = mongoose;


const ukuranSchema = new Schema({
    ukuran: {
        type: String,
        required: false
    },
    harga: {
        type: Number,
        required: false
    }
})

  const variantSchema = new Schema({
    namaVarian: {
        type: String,
        required: false,
    },
    ukuranVarian: [ukuranSchema],
    harga: {
        type: Number,
        required: false,
    },
   
  }, {_id: false});

  const reviewSchema = new Schema({
    reviewName: {
        type: String,
        required: false,
        min: 1,
        max: 5,
    },
    reviewData: {
        type: Date,
        default: Date.now,
    }
  }, {_id: false});

const productSchema = new Schema({

    namaProduk: {
        type: String,
        required: true
    },
    namaToko: {
        type: String,
        required: true
    },
    kondisi: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    kategori: {
        type: String,
        required: false
    },
    hargaProduk: {
        type: Number,
        required: true
    },
    gambarProduk: {
        type: [String],
        required: true
    },
    stockProduk: {
        type: Number,
        required: true,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0,
        required: false,
    },
    reviews: [reviewSchema],
    variants: [variantSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    beratProduk: {
        type: Number,
        required: false,
    },
});

// Update timestamps before saving
productSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
