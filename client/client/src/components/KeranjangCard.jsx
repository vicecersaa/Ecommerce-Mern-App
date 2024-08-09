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

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${PORT}/get-cart`, {
                params: { userId: user._id }
            });
    
            const validItems = response.data.cart.filter(item => item.productId);
            console.log('Fetched cart items:', validItems); 
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
                    onSuccess: async function(result) {
                        console.log('Payment success:', result);
                        // Handle post-payment actions here (e.g., update order status)
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
            <h2 className="text-4xl font-sans font-bold mb-4">Keranjang Belanja</h2>
            {error && <p className="text-red-500">{error}</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item._id} className="flex align-middle border p-4 mb-4 rounded-lg shadow-lg">
                            <div className="flex w-full items-center mb-4">
                                <img className="w-20 h-20 object-cover mr-4" src={`${PORT}${item.productId.gambarProduk[0]}`} alt={item.productId.namaProduk} />
                                <div className="w-full">
                                    <h2 className="text-lg font-bold">
                                        {item.productId.namaProduk}
                                        {item.selectedVariant ? ` - ${item.selectedVariant.namaVarian}` : ' - No Variant'}
                                        {item.selectedSize && item.selectedSize.ukuran ? ` - ${item.selectedSize.ukuran}` : ' - No Size'}
                                    </h2>
                                    <p className="text-sm text-gray-600">{item.productId.categoryProduk ? item.productId.categoryProduk.join(", ") : 'No Categories'}</p>
                                    <p className="text-lg font-bold text-green-600">Rp {item.price}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex justify-center align-middle mb-3">
                                    <button className="bg-slate-500 text-white px-3 py-1 rounded mr-2" onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                                    <p className="text-lg">{item.quantity}</p>
                                    <button className="bg-slate-500 text-white px-3 py-1 rounded ml-2" onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                                </div>
                                <button className="bg-red-500 text-white px-3 py-1 rounded ml-auto w-full" onClick={() => removeItem(item.productId._id)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col mt-4 items-end">
                        <p className="text-xl font-bold">Total Price: <span className="text-green-600">Rp {calculateTotalPrice()}</span></p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}
