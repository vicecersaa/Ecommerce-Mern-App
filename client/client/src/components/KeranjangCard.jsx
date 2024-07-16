import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from '../UserContext';

const PORT = 'http://localhost:5000';

export default function KeranjangCard() {
    const { user } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    // Checkout
    const handleCheckout = async () => {
        try {
            const response = await axios.post(`${PORT}/checkout`, {
                userId: user._id,
                items: cartItems,
            });
            console.log('Checkout successful:', response.data);

            
            setCartItems([]);
            alert('Checkout successful!');
        } catch (error) {
            console.error('Checkout failed:', error);
            setError('Checkout failed');
        }
    };

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
            setCartItems(response.data.cart);
            console.log('Fetched cart items:', response.data.cart);
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

    useEffect(() => {
        if (user) {
            fetchCartItems();
        }
    }, [user]);

    // Calculate total price
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
                                    <p className="text-lg font-bold text-green-600">{formatPrice(item.price * item.quantity)}</p>
                                    <div className="flex items-center mt-2">
                                        <button 
                                            className="px-2 py-1 bg-gray-200 border rounded-l"
                                            onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 border-t border-b border-gray-300">{item.quantity}</span>
                                        <button 
                                            className="px-2 py-1 bg-gray-200 border rounded-r"
                                            onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        className="mt-2 text-red-500 underline"
                                        onClick={() => removeItem(item.productId._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold">Total Harga:</h2>
                            <p className="text-xl font-bold text-green-600">{formatPrice(calculateTotalPrice())}</p>
                        </div>
                        <button 
                            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Formatting function to add thousand separators
const formatPrice = (num) => {
    if (!num) return '';
    return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};
