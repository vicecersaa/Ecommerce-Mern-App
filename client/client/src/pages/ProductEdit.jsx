import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import { API_URL } from '../config';


const ProductEditForm = ({ productId }) => {
    const [product, setProduct] = useState({
        namaProduk: '',
        hargaProduk: '',
        kategoriProduk: '',
        deskripsi: '',
        stockProduk: '',
        isActive: true,
        gambarProduk: [] 
    });

    const [previewImages, setPreviewImages] = useState([]); 

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`${API_URL}/products/${productId}`);
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
            await axios.patch(`${API_URL}/update-product/${productId}`, formData, {
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
                <div className='flex items-center gap-2 mb-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <h1 className='text-xl font-sans font-medium'>Pengaturan Produk</h1>
                </div>

                <div className='p-[20px]'>
                    <form onSubmit={handleSubmit}>
                    <div className="flex align-bottom mt-5">
                        <label className='w-full max-w-[200px] font-sans'>Gambar Produk :</label>
                        <label className="flex align-middle justify-center bg-slate-200 text-black rounded-lg overflow-hidden w-full max-w-[120px] cursor-pointer py-8 hover:">
                            <input
                                type="file"
                                className="opacity-0 cursor-pointer relative font-sans"
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
                            <label className='w-full max-w-[200px] font-sans'>Nama Produk :</label>
                            <input
                                type="text"
                                name="namaProduk"
                                className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none font-sans'
                                value={product.namaProduk || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex align-middle mt-5'>
                            <label className='w-full max-w-[200px] font-sans'>Harga Produk :</label>
                            <input
                                type="number"
                                name="hargaProduk"
                                value={product.hargaProduk || ''}
                                className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none font-sans'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex align-middle mt-5'>
                            <label className='w-full max-w-[200px] font-sans'>Kategori Produk :</label>
                            <input
                                type="text"
                                name="kategoriProduk"
                                className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none font-sans'
                                value={product.kategoriProduk || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex align-middle mt-5'>
                            <label className='w-full max-w-[200px] font-sans'>Deskripsi :</label>
                            <textarea
                                name="deskripsi"
                                value={product.deskripsi || ''}
                                rows='10'
                                className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none font-sans'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex align-middle mt-5'>
                            <label className='w-full max-w-[200px] font-sans'>Stock Produk :</label>
                            <input
                                type="number"
                                name="stockProduk"
                                value={product.stockProduk || ''}
                                className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none font-sans'
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="w-full bg-[#194719] py-2 mt-5 text-white rounded-md font-sans" type="submit">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductEditForm;
