import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import BLANK from '../assets/img/blankPicture.png';

const PORT = 'http://localhost:5000';

export default function OrderHistory() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // FETCH ORDER HISTORY
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(`${PORT}/order-history`, {
                params: { userId: user._id }
            });

            console.log('Order history response:', response.data);
            // Filter orders to include only those with status 'Berhasil'
            const successfulOrders = response.data.filter(order => order.status === 'Berhasil');
            setOrders(successfulOrders);
        } catch (error) {
            setError('Failed to fetch order history');
            console.error(error);
        }
    };
    
    
    useEffect(() => {
        if (user) {
            fetchOrderHistory(); // Initial fetch
            const intervalId = setInterval(fetchOrderHistory, 60000); 
            return () => clearInterval(intervalId); // Clean up the interval on component unmount
        }
    }, [user]);

    if (!user) {
        return <div>Please log in to view your order history</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Riwayat Pesanan</h1>
            {error && <p className="text-red-500">{error}</p>}
            {orders.length === 0 ? (
                <p>Anda belum memiliki riwayat pesanan.</p>
            ) : (
                <div>
                    {orders.map(order => (
                        <div key={order._id} className={`border p-4 mb-4 rounded-lg shadow-lg ${order.status === 'Tidak Berhasil' ? 'bg-red-100' : ''}`}>
                            <div className="mb-4">
                                <h2 className="text-lg font-bold">Tanggal Pesanan: {new Date(order.createdAt).toLocaleDateString()}</h2>
                                <p className="text-sm text-gray-600">Status: {order.status}</p>
                                <p className="text-lg font-bold text-green-600">Total Belanja: {formatPrice(order.totalAmount)}</p>
                            </div>
                            {order.items.map(item => (
                                <div key={item.productId ? item.productId._id : item._id} className="flex items-center mb-4">
                                    <img 
                                        className="w-20 h-20 object-cover mr-4" 
                                        src={item.productId && item.productId.gambarProduk ? `http://localhost:5000${item.productId.gambarProduk[0]}` : BLANK} 
                                        alt={item.productId ? item.productId.namaProduk : 'Product Image'} 
                                    />
                                    <div>
                                        <h2 className="text-lg font-bold">{item.name}</h2>
                                        <p className="text-lg font-bold text-green-600">{formatPrice(item.price)}</p>
                                        <p>Jumlah: {item.quantity}</p>
                                        <p>Total Harga: {formatPrice(item.price * item.quantity)}</p>
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
