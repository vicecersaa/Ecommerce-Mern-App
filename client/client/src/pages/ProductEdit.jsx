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
                        gambarProduk: data.gambarProduk || [] // Ensure default empty array
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
            const response = await axios.patch(`http://localhost:5000/update-product/${productId}`, formData, {
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
            <div className='w-full max-w-[1100px] m-auto mt-[30px]'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Gambar Produk:</label>
                        <input
                            type="file"
                            name="gambarProduk"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        {previewImages.length > 0 && (
                            <div className="image-previews">
                                {previewImages.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Preview ${index}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <label>Nama Produk:</label>
                        <input
                            type="text"
                            name="namaProduk"
                            value={product.namaProduk || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Harga Produk:</label>
                        <input
                            type="number"
                            name="hargaProduk"
                            value={product.hargaProduk || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Kategori Produk:</label>
                        <input
                            type="text"
                            name="kategoriProduk"
                            value={product.kategoriProduk || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Deskripsi:</label>
                        <textarea
                            name="deskripsi"
                            value={product.deskripsi || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Stock Produk:</label>
                        <input
                            type="number"
                            name="stockProduk"
                            value={product.stockProduk || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default ProductEditForm;
