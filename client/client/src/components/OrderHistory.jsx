import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const PORT = 'http://localhost:5000';

export default function OrderHistory() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Fetch order history for the user
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(`${PORT}/order-history`, {
                params: { userId: user._id }
            });
            setOrders(response.data);
        } catch (error) {
            setError('Failed to fetch order history');
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrderHistory();
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
                        <div key={order._id} className="border p-4 mb-4 rounded-lg shadow-lg">
                            <div className="mb-4">
                                <h2 className="text-lg font-bold">Tanggal Pesanan: {new Date(order.createdAt).toLocaleDateString()}</h2>
                                <p className="text-sm text-gray-600">Status: {order.status}</p>
                                <p className="text-lg font-bold text-green-600">Total Belanja: {formatPrice(order.totalAmount)}</p>
                            </div>
                            {order.items.map(item => (
                                <div key={item.productId._id} className="flex items-center mb-4">
                                    <img className="w-20 h-20 object-cover mr-4" src={`http://localhost:5000${item.productId.gambarProduk}`} alt={item.productId.namaProduk} />
                                    <div>
                                        <h2 className="text-lg font-bold">{item.productId.namaProduk}</h2>
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
