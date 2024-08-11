const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            name: { type: String, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Semua', 'Berlangsung', 'Berhasil', 'Tidak Berhasil'], default: 'Semua' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;
