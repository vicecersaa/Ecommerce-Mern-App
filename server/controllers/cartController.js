const userModel = require('../models/user');

const addToCart = async (userId, productId, quantity, price, selectedVariant, selectedSize) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const existingProductIndex = user.cart.findIndex(item =>
      item.productId.toString() === productId &&
      item.selectedVariant === selectedVariant &&
      item.selectedSize === selectedSize
    );

    if (existingProductIndex > -1) {
      user.cart[existingProductIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity, price, selectedVariant, selectedSize });
    }

    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addToCart };
