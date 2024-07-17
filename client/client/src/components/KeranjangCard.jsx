import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from '../UserContext';

const PORT = 'http://localhost:5000';

export default function KeranjangCard() {
    const { user } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchCartItems();
        }
    }, [user]);

    // Fetch cart items for the user
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${PORT}/get-cart`, {
                params: { userId: user._id }
            });

            const validItems = response.data.cart.filter(item => item.productId);
            setCartItems(validItems);
        } catch (error) {
            setError('Failed to fetch cart items');
            console.error(error);
        }
    };

    // Update item quantity
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity <= 0) return;

        try {
            const response = await axios.patch(`${PORT}/update-cart`, {
                userId: user._id,
                productId,
                quantity: newQuantity
            });
            setCartItems(response.data.cart);
            console.log('Updated cart items:', response.data.cart);
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    // Remove item from cart
    const removeItem = async (productId) => {
        try {
            const response = await axios.post(`${PORT}/remove-from-cart`, {
                userId: user._id,
                productId
            });
            setCartItems(response.data.cart);
            console.log('Removed cart item:', response.data.cart);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Checkout
    const handleCheckout = async () => {
        try {
            const response = await axios.post(`${PORT}/checkout`, {
                items: cartItems,
            });
    
            if (response.data.paymentToken) {
                window.snap.pay(response.data.paymentToken, {
                    onSuccess: function(result) {
                        console.log('Payment success:', result);
                        setCartItems([]);
                        alert('Checkout successful!');
                    },
                    onPending: function(result) {
                        console.log('Payment pending:', result);
                        alert('Payment is pending. Please complete the payment.');
                    },
                    onError: function(result) {
                        console.error('Payment failed:', result);
                        alert('Payment failed. Please try again.');
                    },
                    onClose: function() {
                        console.log('Payment popup closed without completing payment.');
                        alert('Payment popup closed. Please complete the payment.');
                    }
                });
            } else {
                console.error('Failed to get payment token');
                setError('Checkout failed');
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            setError('Checkout failed');
        }
    };

    if (!user) {
        return <div>Please log in to view your cart</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
            {error && <p className="text-red-500">{error}</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.productId._id} className="border p-4 mb-4 rounded-lg shadow-lg">
                            <div className="flex items-center mb-4">
                                <img className="w-20 h-20 object-cover mr-4" src={`${PORT}${item.productId.gambarProduk[0]}`} alt={item.productId.namaProduk} />
                                <div>
                                    <h2 className="text-lg font-bold">{item.productId.namaProduk}</h2>
                                    <p className="text-sm text-gray-600">{item.productId.categoryProduk}</p>
                                    <p className="text-lg font-bold text-green-600">Rp {item.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="bg-red-500 text-white px-3 py-1 rounded mr-2" onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                                <p className="text-lg">{item.quantity}</p>
                                <button className="bg-green-500 text-white px-3 py-1 rounded ml-2" onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded ml-auto" onClick={() => removeItem(item.productId._id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4">
                        <p className="text-xl font-bold">Total Price: Rp {calculateTotalPrice()}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}
