import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import BLANK from '../assets/img/blankPicture.png';
import LOGO from '../assets/img/LOGO1.jpg';
import { Link } from 'react-router-dom';

const PORT = 'http://localhost:5000';

export default function OrderHistory() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(`${PORT}/order-history`, {
                params: { userId: user._id }
            });

            console.log('Order history response:', response.data);
            
            const successfulOrders = response.data.filter(order => order.status === 'Berhasil');
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
                <div className="flex flex-col justify-center items-center min-h-[500px]">
                    <img loading="lazy" className="w-full max-w-[250px]" src={LOGO} alt="Forland Living Logo" />
                    <h2 className="font-medium font-sans text-2xl">Anda Belum Memiliki Pesanan</h2>
                    <Link to={'/'}>
                        <button className="bg-[#194719] text-white font-sans px-5 py-2 rounded-full mt-4">
                            Belanja Sekarang!
                        </button>
                    </Link>
                 </div>
            ) : (
                <div>
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
            )}
        </div>
    );
}

// Formatting function to add thousand separators
const formatPrice = (num) => {
    if (!num) return '';
    return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};
