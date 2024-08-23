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

    const formatPrice = (num) => {
        if (!num) return '';
        return `Rp ${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
    };

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${PORT}/get-cart`, {
                params: { userId: user._id }
            });
    
            const validItems = response.data.cart.filter(item => item.productId);
            

            
            const sortedItems = validItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setCartItems(sortedItems);
        } catch (error) {
            setError('Failed to fetch cart items');
            console.error(error);
        }
    };

    
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity <= 0) return;

        try {
            const response = await axios.patch(`${PORT}/update-cart`, {
                userId: user._id,
                productId,
                quantity: newQuantity
            });
            setCartItems(response.data.cart);
            
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

   
    const removeItem = async (productId) => {
        try {
            const response = await axios.post(`${PORT}/remove-from-cart`, {
                userId: user._id,
                productId
            });
            setCartItems(response.data.cart);
            
    
            
            window.location.reload();
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

   
    const calculateTotalPrice = () => {
        const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        return formatPrice(total);
    };

    
    const handleCheckout = async () => {
        try {
            
        
            const response = await axios.post(`${PORT}/checkout`, {
                items: cartItems.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                    price: item.price,
                    name: item.productId.namaProduk,
                    selectedSize: item.selectedSize, 
                    selectedVariant: item.selectedVariant, 
                })),
            });
    
             
    
            if (response.data.paymentToken) {
                window.snap.pay(response.data.paymentToken, {
                    onSuccess: async function(result) {
                        
                        
                    },
                    onPending: function(result) {
                        alert('Payment is pending. Please complete the payment.');
                    },
                    onError: function(result) {
                        console.error('Payment failed:', result);
                        alert('Payment failed. Please try again.');
                    },
                    onClose: function() {
                        
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
            <div className="flex items-center gap-2 mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>

                <h2 className="text-xl font-sans font-medium">Keranjang Belanja</h2>
            </div>
            
            {error && <p className="text-red-500">{error}</p>}
            {cartItems.length === 0 ? (
                <div></div>
            ) : (
                <div>
                    {cartItems.length === 0 ? (
                <div></div>
            ) : (
        <div>
            {cartItems.map(item => (
                    <div key={item._id} className="flex align-middle border-gray-500 p-4 mb-4 rounded-lg shadow-xl">
                        <div className="flex w-full items-center mb-4">
                                <img
                                    className="w-20 h-20 p-1 object-cover mr-4 bg-[#DEDEDE] rounded-lg"
                                    src={item.productId.gambarProduk ? `${PORT}${item.productId.gambarProduk[0]}` : 'default-image-url'}
                                    alt={item.productId.namaProduk || 'Product Image'}
                                />
                                <div className="w-full">
                                    <h2 className="font-sans font-medium w-full max-w-[500px] mb-1">
                                        {item.productId.namaProduk}
                                        {item.selectedVariant && item.selectedVariant.namaVarian 
                                            ? ` - ${item.selectedVariant.namaVarian}` 
                                            : ' - Tidak ada Varian'}
                                        {item.selectedSize && item.selectedSize.ukuran 
                                            ? ` - ${item.selectedSize.ukuran}` 
                                            : ' - Tidak ada Ukuran'}
                                    </h2>
                                    <p className=" text-gray-600 font-sans text-sm mb-1">{item.productId.categoryProduk ? item.productId.categoryProduk.join(", ") : 'No Categories'}</p>
                                    <p className="text-lg font-semibold text-[#194719] mt-2">{formatPrice(item.price)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex justify-center align-middle items-center mb-3">
                                    <button className="bg-slate-100 border-slate-300 border-[1px] text-black font-semibold px-3 py-1 rounded mr-2" onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                                    <p className="text-base font-sans">{item.quantity}</p>
                                    <button className="bg-slate-100 border-slate-300 border-[1px] text-black font-semibold px-3 py-1 rounded ml-2" onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                                </div>
                                <button className="bg-slate-100 border-[1px] border-slate-300 text-black px-3 font-sans py-1 rounded ml-auto w-full" onClick={() => removeItem(item.productId._id)}>Hapus</button>
                            </div>
                        </div>
                ))}
                    </div>
            )}


                    <div className="flex flex-col mt-7 items-end ">
                        <p className="text-xl font-sans font-medium">Total Price: <span className="text-[#194719] font-semiboldfont-sans ml-2">{calculateTotalPrice()}</span></p>
                        <button className="bg-[#194719] text-white px-4 py-2 rounded mt-2" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}
