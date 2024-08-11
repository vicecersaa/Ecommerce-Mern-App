import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';


const ProductEditForm = ({ productId }) => {
    const [product, setProduct] = useState({
        namaProduk: '',
        hargaProduk: '',
        kategoriProduk: '',
        deskripsi: '',
        stockProduk: '',
        isActive: true,
        gambarProduk: [] // For managing selected files
    });

    const [previewImages, setPreviewImages] = useState([]); // For image previews

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/products/${productId}`);
                    const data = response.data;

                    setProduct({
                        namaProduk: data.namaProduk || '',
                        hargaProduk: data.hargaProduk || '',
                        kategoriProduk: data.kategoriProduk || '',
                        deskripsi: data.deskripsi || '',
                        stockProduk: data.stockProduk || '',
                        isActive: data.isActive !== undefined ? data.isActive : true,
                        gambarProduk: data.gambarProduk || []
                    });

                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };

            fetchProduct();
        }
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProduct(prevProduct => ({
            ...prevProduct,
            gambarProduk: files
        }));

        // Generate image previews
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('namaProduk', product.namaProduk);
        formData.append('hargaProduk', product.hargaProduk);
        formData.append('kategoriProduk', product.kategoriProduk);
        formData.append('deskripsi', product.deskripsi);
        formData.append('stockProduk', product.stockProduk);
        formData.append('isActive', product.isActive);

        product.gambarProduk.forEach((file) => {
            formData.append('image', file);
        });

        try {
            await axios.patch(`http://localhost:5000/update-product/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='w-full max-w-[1100px] m-auto mt-[30px] border-[1px] border-slate-500 p-[30px] rounded-md'>
                <h1 className='font-bold text-4xl mb-[50px]'>Pengaturan Produk</h1>
                <form onSubmit={handleSubmit}>
                <div className="flex align-bottom mt-5">
                    <label className='w-full max-w-[200px]'>Gambar Produk :</label>
                    <label className="flex align-middle justify-center bg-slate-200 text-black rounded-lg overflow-hidden w-full max-w-[120px] cursor-pointer py-8 hover:">
                        <input
                            type="file"
                            className="opacity-0 cursor-pointer relative"
                            onChange={handleFileChange}
                            multiple
                        />
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 z-1 cursor-pointer absolute">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </label>
                    <div className='flex'>
                        {previewImages.length > 0 && (
                            <div className="flex gap-5 justify-center align-middle rounded-md ml-5">
                                {previewImages.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        className="border-[1px] border-[#000000] rounded-md"
                                        alt={`Preview ${index}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                    
                    <div className='flex align-middle mt-5'>
                        <label className='w-full max-w-[200px]'>Nama Produk :</label>
                        <input
                            type="text"
                            name="namaProduk"
                            className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none'
                            value={product.namaProduk || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex align-middle mt-5'>
                        <label className='w-full max-w-[200px]'>Harga Produk :</label>
                        <input
                            type="number"
                            name="hargaProduk"
                            value={product.hargaProduk || ''}
                            className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex align-middle mt-5'>
                        <label className='w-full max-w-[200px]'>Kategori Produk :</label>
                        <input
                            type="text"
                            name="kategoriProduk"
                            className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none'
                            value={product.kategoriProduk || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex align-middle mt-5'>
                        <label className='w-full max-w-[200px]'>Deskripsi :</label>
                        <textarea
                            name="deskripsi"
                            value={product.deskripsi || ''}
                            rows='10'
                            className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex align-middle mt-5'>
                        <label className='w-full max-w-[200px]'>Stock Produk :</label>
                        <input
                            type="number"
                            name="stockProduk"
                            value={product.stockProduk || ''}
                            className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none'
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="w-full bg-slate-500 py-2 mt-5 text-white rounded-md" type="submit">Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default ProductEditForm;
