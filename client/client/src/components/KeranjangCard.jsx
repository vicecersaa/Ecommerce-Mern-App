import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ProductContext } from "../ProductContext";

const KeranjangCard = () => {
    const {products, loading} = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    
    const currentProduct = products && products.length > 0 ? products[0] : null;

    if (loading) return <p>Loading...</p>;
    if (!currentProduct) return <p>No product available</p>;

    return (
        <div className="product-card">
            <img src={`http://localhost:5000${currentProduct.gambarProduk[0]}`} alt={currentProduct.namaProduk} />
            <h2>{currentProduct.namaProduk}</h2>
            <p>{currentProduct.hargaProduk}</p>
        </div>
    );
};

export default KeranjangCard;