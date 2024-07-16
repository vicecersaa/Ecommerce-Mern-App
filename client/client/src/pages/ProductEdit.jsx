import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductEditForm = ({ productId }) => {
    const [product, setProduct] = useState({
        namaProduk: '',
        hargaProduk: '',
        kategoriProduk: '',
        deskripsi: '',
        stockProduk: '',
        isActive: true,
        gambarProduk: [] // Initialize as an array to handle multiple images
    });

    useEffect(() => {
        if (productId) {
            // Fetch product data
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/products/${productId}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };

            fetchProduct();
        }
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, gambarProduk: Array.from(e.target.files) });
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

        product.gambarProduk.forEach((file, index) => {
            formData.append(`image`, file);
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nama Produk:</label>
                <input
                    type="text"
                    name="namaProduk"
                    value={product.namaProduk}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Harga Produk:</label>
                <input
                    type="number"
                    name="hargaProduk"
                    value={product.hargaProduk}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Kategori Produk:</label>
                <input
                    type="text"
                    name="kategoriProduk"
                    value={product.kategoriProduk}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Deskripsi:</label>
                <textarea
                    name="deskripsi"
                    value={product.deskripsi}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Stock Produk:</label>
                <input
                    type="number"
                    name="stockProduk"
                    value={product.stockProduk}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Gambar Produk:</label>
                <input
                    type="file"
                    name="gambarProduk"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">Update Product</button>
        </form>
    );
};

export default ProductEditForm;