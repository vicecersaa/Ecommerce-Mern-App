const mongoose = require('mongoose');
const {Schema} = mongoose;


const variantSchema = new Schema({
    namaVarian: { type: String, required: true },
    ukuran: { type: String, required: true },
    warna: { type: String },
    harga: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
  });

const productSchema = new Schema({

    namaProduk: {
        type: String,
        required: true
    },
    namaToko: {
        type: String,
        required: true
    },
    kondisi: String,
    deskripsi: String,
    hargaProduk: {
        type: String,
        required: true
    },
    gambarProduk: String,
    stockProduk: {
        type: Number,
        required: true,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0,
    },
    variants: [variantSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
