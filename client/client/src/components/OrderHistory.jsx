import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import BLANK from '../assets/img/blankPicture.png';
import LOGO from '../assets/img/LOGO1.webp';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';



export default function OrderHistory() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(`${API_URL}/order-history`, {
                params: { userId: user._id }
            });
    
            
            
            
            const successfulOrders = response.data
                .filter(order => order.status === 'Berhasil')
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
            
            setOrders(successfulOrders);
        } catch (error) {
            setError('Failed to fetch order history');
            console.error(error);
        }
    };
    
    
    useEffect(() => {
        if (user) {
            fetchOrderHistory(); 
            const intervalId = setInterval(fetchOrderHistory, 60000); 
            return () => clearInterval(intervalId); 
        }
    }, [user]);

    if (!user) {
        return <div>Please log in to view your order history</div>;
    }

    return (
        <div className="container mx-auto p-4">
            
            
            {error && <p className="text-red-500">{error}</p>}
            {orders.length === 0 ? (
                <div>
                    <div className="hidden flex-col justify-center items-center min-h-[500px] md:flex">
                        <img loading="lazy" className="w-full max-w-[250px]" src={LOGO} alt="Forland Living Logo" />
                        <h2 className="font-medium font-sans text-2xl">Anda Belum Memiliki Pesanan</h2>
                        <Link to={'/'}>
                            <button className="bg-[#194719] text-white font-sans px-5 py-2 rounded-full mt-4">
                                Belanja Sekarang!
                            </button>
                        </Link>
                    </div>

                    <div className="flex flex-col justify-center items-center min-h-[500px] md:hidden">
                        <img loading="lazy" className="w-full max-w-[150px]" src={LOGO} alt="Forland Living Logo" />
                        <h2 className="font-medium font-sans text-2xl">Anda Belum Memiliki Pesanan</h2>
                        <Link to={'/'}>
                            <button className="bg-[#194719] text-white font-sans px-5 py-2 rounded-full mt-4">
                                Belanja Sekarang!
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='hidden md:flex md:flex-col'>
                        <div className='flex items-center gap-2 mb-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                            <h2 className="text-xl font-sans font-medium">Riwayat Pesanan</h2>
                        </div>
                        {orders.map(order => (
                            <div key={order._id} className={`border p-4 mb-4 rounded-lg shadow-lg ${order.status === 'Tidak Berhasil' ? 'bg-red-100' : ''}`}>
                                <div className="mb-4">
                                    <h2 className="font-sans">Tanggal Pesanan: {new Date(order.createdAt).toLocaleDateString()}</h2>
                                    <p className="text-sm text-gray-600 font-sans mt-1">Status: {order.status}</p>
                                </div>
                                {order.items.map(item => (
                                    <div key={item.productId ? item.productId._id : item._id} className="flex items-center mb-4">
                                        <img 
                                            className="w-20 h-20 object-cover mr-4" 
                                            src={item.productId && item.productId.gambarProduk ? `http://localhost:5000${item.productId.gambarProduk[0]}` : BLANK} 
                                            alt={item.productId ? item.productId.namaProduk : 'Product Image'} 
                                        />
                                        <div className='w-full flex items-end'>
                                            <div className='w-full'>
                                                <h2 className="font-sans">{item.name}</h2>
                                                <p className="font-semibold font-sans text-[#194719]">{formatPrice(item.price)}</p>
                                                <p className='font-sans text-sm mt-2'>Jumlah: {item.quantity}</p>
                                            </div>
                                            <div className="w-full ml-auto text-end">
                                                <p className="w-full font-sans text-[#194719]">Total Belanja : {formatPrice(order.totalAmount)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col md:hidden pb-[50px]'>
                        <div className='flex items-center gap-2 mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                            <h2 className="text-xl font-sans font-medium">Riwayat Pesanan</h2>
                        </div>
                        {orders.map(order => (
                            <div key={order._id} className={`border p-4 mb-4 rounded-lg shadow-lg ${order.status === 'Tidak Berhasil' ? 'bg-red-100' : ''}`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-sans text-sm">Tanggal Pesanan: {new Date(order.createdAt).toLocaleDateString()}</h2>
                                    <p className="text-sm text-gray-600 font-sans">Status: {order.status}</p>
                                </div>
                                {order.items.map(item => (
                                    <div key={item.productId ? item.productId._id : item._id} className="flex items-start mt-4">
                                        <img 
                                            className="w-20 h-20 object-cover mr-4" 
                                            src={item.productId && item.productId.gambarProduk ? `http://localhost:5000${item.productId.gambarProduk[0]}` : BLANK} 
                                            alt={item.productId ? item.productId.namaProduk : 'Product Image'} 
                                        />
                                        <div className='w-full flex flex-col items-end'>
                                            <div className='w-full'>
                                                <h2 className="font-sans text-sm">{item.name}</h2>
                                                <p className="font-semibold font-sans text-[#194719] text-base">{formatPrice(item.price)}</p>
                                                
                                            </div>
                                            <div className="w-full ml-auto text-end flex justify-between items-end mt-5">
                                                <p className='font-sans text-sm w-full text-start'>Jumlah: {item.quantity}</p>
                                                <p className="w-full font-sans text-[#194719] text-sm min-w-[130px]">Subtotal : {formatPrice(order.totalAmount)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                
            )}
        </div>
    );
}


const formatPrice = (num) => {
    if (!num) return '';
    return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};
