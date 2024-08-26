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
        <div className="h-full pb-[110px] md:pb-0">
        <div className="hidden container mx-auto p-4 md:flex">
            <div className="hidden items-center gap-2 mb-10 md:flex">
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
            <div className="hidden md:flex">
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


                    <div className="hidden flex-col mt-7 items-end md:flex">
                        <p className="text-xl font-sans font-medium">Total Price: <span className="text-[#194719] font-semiboldfont-sans ml-2">{calculateTotalPrice()}</span></p>
                        <button className="bg-[#194719] text-white px-4 py-2 rounded mt-2" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
                        <div className="flex items-center gap-2 md:hidden px-[10px]">
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
                        <div className="p-[10px]">
                            {cartItems.map(item => (
                                <div key={item._id} className="flex flex-col justify-center items-start border-gray-200 border-[1px] rounded-lg mt-3 p-3">
                                    <div className="flex w-full items-start mb-2">
                                            <img
                                                className="w-20 h-20 p-1 object-cover mr-4 bg-[#DEDEDE] rounded-lg"
                                                src={item.productId.gambarProduk ? `${PORT}${item.productId.gambarProduk[0]}` : 'default-image-url'}
                                                alt={item.productId.namaProduk || 'Product Image'}
                                            />
                                            <div className="w-full">
                                                <h2 className="font-sans font-medium w-full text-sm max-w-[320px]">
                                                  
                                                    {item.productId.namaProduk}
                                       
                                                    {item.selectedVariant && item.selectedVariant.namaVarian 
                                                        ? ` - ${item.selectedVariant.namaVarian}` 
                                                        : ' - Tidak ada Varian'}
                                                    {item.selectedSize && item.selectedSize.ukuran 
                                                        ? ` - ${item.selectedSize.ukuran}` 
                                                        : ' - Tidak ada Ukuran'}
                                                </h2>
                                                
                                                <p className="text-base font-semibold text-[#194719] mt-2">{formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col justify-end items-end">
                                            <div className="flex justify-end items-center">
                                                <div className="flex items-center border-slate-300 border-[1px] rounded">
                                                    <button className="text-black font-semibold px-3 py-1 mr-2" onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                                                    <p className="text-base font-sans">{item.quantity}</p>
                                                    <button className="text-black font-semibold px-3 py-1 ml-2" onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => removeItem(item.productId._id)} className="size-6 cursor-pointer ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </div>
                                           

                                            
                                        </div>
                                </div>
                                
                            ))}
                        </div>
                        )}


                        <div className="fixed bottom-[50px] left-0 w-full flex justify-between items-end p-4 bg-white gap-2 border-t-[1px] shadow-sm">
                            <p className="text-base font-sans font-medium w-full max-w-[190px]">
                                Subtotal: <span className="text-[#194719] font-semibold ml-2">{calculateTotalPrice()}</span>
                            </p>
                            <button className="bg-[#194719] text-white px-2 py-1 rounded w-full max-w-[110px] " onClick={handleCheckout}>
                                Checkout
                            </button>      
                        </div>
                    </div>
                        )}
        </div>
    );
}
