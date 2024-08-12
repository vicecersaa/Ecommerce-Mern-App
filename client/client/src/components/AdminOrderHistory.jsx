import React, { useEffect, useState } from "react";
import axios from 'axios';

const PORT = 'http://localhost:5000';

export default function AdminOrderHistory() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Fungsi untuk mengambil data pesanan dari server
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${PORT}/get-orders`);
            setOrders(response.data);  // Menyimpan data pesanan ke state
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again later.');
        }
    };

    // Mengambil data pesanan saat komponen pertama kali dimuat
    useEffect(() => {
        fetchOrders();
    }, []);

    // Format harga untuk ditampilkan
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
                            <p>Username: {order.userId?.name || 'N/A'}</p>
                            <p>Nama Lengkap: {order.userId?.fullName || 'N/A'}</p>
                            <p>No. Telp: {order.userId?.phoneNumber || 'N/A'}</p>
                            <p>Alamat Lengkap: {order.userId?.address || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="font-sans font-semibold">Order Details</h3>
                            {order.items.map(item => (
                                <div key={item._id} className="flex justify-between items-center mb-3">
                                    <div>
                                        <p>Nama Produk: {item.name || 'N/A'}</p>
                                        <p>Varian Dipilih: {item.selectedVariant?.namaVarian || 'N/A'}</p>
                                        <p>Tipe/Ukuran Dipilih: {item.selectedSize?.ukuran || 'N/A'}</p>
                                        <p>Jumlah Barang: {item.quantity}</p>
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
