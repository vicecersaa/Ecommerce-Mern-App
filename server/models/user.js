    const mongoose = require('mongoose');
    const {Schema} = mongoose;

    const userSchema = new Schema({
        name: String,
        email: {type:String, unique:true},
        password: String,
        address: String,
        phoneNumber: String,
        profilePicture: String,
        fullName: String,
        metodePembayaran: [{type: String}],
        historiTransaksi: [{
            type: Schema.Types.ObjectId, ref: "Transaksi"
        }],
        totalBarang: {
            type: Number,
            required: true,
            default: 0
        },
        totalBelanja: Number,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    })

    // Add a pre-save hook to update `updatedAt` before saving
    userSchema.pre('save', function(next) {
        this.updatedAt = Date.now();
        next();
    });

    const userModel = mongoose.model('User', userSchema);

    module.exports = userModel;