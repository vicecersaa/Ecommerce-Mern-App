import React, { useEffect, useState } from "react";
import axios from 'axios';

const PORT = 'http://localhost:5000';

export default function AdminOrderHistory() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${PORT}/get-orders`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again later.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatPrice = (num) => {
        if (!num) return '';
        return `Rp ${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-sans font-medium mb-10">Order History</h2>
            
            {error && <p className="text-red-500">{error}</p>}
            {orders.length === 0 ? (
                <div>No orders found.</div>
            ) : (
                orders.map(order => (
                    <div key={order._id} className="border-gray-500 p-4 mb-4 rounded-lg shadow-xl">
                        <div className="mb-4">
                            <h3 className="font-sans font-semibold">User Info</h3>
                            <p>Username: {order.user?.username || 'N/A'}</p>
                            <p>Full Name: {order.user?.fullname || 'N/A'}</p>
                            <p>No. Telp: {order.user?.phone || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="font-sans font-semibold">Order Details</h3>
                            {order.items.map(item => (
                                <div key={item._id} className="flex justify-between items-center mb-3">
                                    <div>
                                        <img src={`http://localhost:5000/${item.gambarProduk}`} />
                                        <p>Product: {item.name || 'N/A'}</p>
                                        <p>Variant: {item.selectedVariant ? item.selectedVariant.namaVarian : 'Tidak ada Varian'}</p>
                                        <p>Size: {item.selectedSize ? item.selectedSize.ukuran : 'Tidak ada Ukuran'}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
