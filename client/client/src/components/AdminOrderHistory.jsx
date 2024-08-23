import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';

const PORT = 'http://localhost:5000';

export default function AdminOrderHistory() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    
useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${PORT}/get-orders`);
            setOrders(response.data.reverse());  
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again later.');
        }
    };

    fetchOrders();
}, []);

    
    const formatPrice = (num) => {
        if (!num) return '';
        return `Rp ${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
    };

    const formatDate = (dateString) => {
        return moment(dateString).format('DD MMMM YYYY, HH:mm');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center gap-2 mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>  
                <h2 className="text-xl font-sans font-medium">Histori Pesanan</h2>
            </div>
            
            {error && <p className="text-red-500">{error}</p>}
            {orders.length === 0 ? (
                <div>No orders found.</div>
            ) : (
                orders.map(order => (
                    <div key={order._id} className="border-[1px] border-[#000000] mb-4 rounded-lg shadow-md">
                        <div>
                            {order.items.map(item => (
                                <div key={item._id} className=" mb-3">
                                    <div>
                                        <div className="w-full flex justify-between  items-center mb-5 border-[1px] border-b-black p-2">
                                            <div className="flex items-center gap-3">
                                                <div className="gap-1 flex items-center">

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                                    </svg>

                                                    <h3 className="font-sans font-semibold">Detail Transaksi</h3>

                                                </div>
                                                
                                                
                                                <p className="text-xs font-sans font-bold">#{order._id}</p>

                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                    <p className="font-sans text-xs ml-1 font-bold">{order.userId?.fullName}</p>
                                                </div>

                                                <p className="font-sans text-xs py-1 px-2 border-[1px] rounded-md bg-[#e4e4e4] text-[#194719] font-bold">{order.status}</p>
                                                

                                            </div>
                                            <div>
                                                <p className="font-sans text-sm">{formatDate(order.createdAt)}</p>
                                                
                                            </div>
                                        </div>
                                        <div className="w-full p-4">
                                            <h3 className="font-sans font-semibold mb-3">Data Pembeli</h3>
                                            
                                            <div className="w-full flex mb-1">
                                                <p className="font-sans text-sm w-full max-w-[120px]">Username </p>
                                                <p className="font-sans text-sm font-bold">: {order.userId?.name || 'N/A'}</p>
                                            </div>
                                            <div className="w-full flex mb-1">
                                                <p className="font-sans text-sm w-full max-w-[120px]">Nama Lengkap </p>
                                                <p className="font-sans text-sm font-bold">: {order.userId?.fullName || 'N/A'}</p>
                                            </div>
                                            <div className="w-full flex mb-1">
                                                <p className="font-sans text-sm w-full max-w-[120px]">No. Telp </p>
                                                <p className="font-sans text-sm font-bold">: {order.userId?.phoneNumber || 'N/A'}</p>
                                            </div>
                                            <div className="w-full flex">
                                                <p className="font-sans text-sm w-full max-w-[120px]">Alamat Lengkap </p>
                                                <p className="font-sans text-sm font-bold">: {order.userId?.address || 'N/A'}</p>
                                            </div>
                                            
                                            
                                           
                                            
                                        </div>
                                        <div className="flex w-full justify-between p-4 ">
                                            <div className="w-full max-w-[780px]">
                                                <h3 className="font-sans font-semibold mb-3">Data Pesanan</h3>
                                                <div className="w-full flex mb-1">
                                                    <p className="font-sans text-sm w-full max-w-[120px]">Produk </p>
                                                    <p className="font-sans text-sm font-bold">: {item.name || 'N/A'}</p>
                                                </div>
                                                <div className="w-full flex mb-1">
                                                    <p className="font-sans text-sm w-full max-w-[120px]">Varian </p>
                                                    <p className="font-sans text-sm font-bold">: {item.selectedVariant?.namaVarian || 'N/A'}</p>
                                                </div>
                                                <div className="w-full flex mb-1">
                                                <p className="font-sans text-sm w-full max-w-[120px]">Tipe / Ukuran </p>
                                                    <p className="font-sans text-sm font-bold">: {item.selectedSize?.ukuran || 'N/A'}</p>
                                                </div>
                                                <div className="w-full flex">
                                                    <p className="font-sans text-sm w-full max-w-[120px]">Jumlah Barang </p>
                                                    <p className="font-sans text-sm font-bold">: {item.quantity} x {formatPrice(item.price)}</p>
                                                </div>     
                                            </div>
                                            <div className="flex items-end justify-end">
                                                <p className="font-sans text-gray-500 mr-2">Subtotal :</p>
                                                <p className="font-sans font-bold">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                        
                    </div>
                ))
            )}
        </div>
    );
}
