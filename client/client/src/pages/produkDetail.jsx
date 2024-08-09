import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../ProductContext";
import Header from "../components/header";
import Footer from "../components/Footer";
import STARS from "../assets/img/star.png";
import { UserContext } from '../UserContext';
import axios from 'axios';

const formatPrice = (num) => {
    if (!num) return '';
    return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};

export default function ProdukDetail() {
    const { id } = useParams();
    const { products, loading } = useContext(ProductContext);
    const { user } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState({
        namaVarian: '',
        ukuranVarian: []
    });
    const [selectedSize, setSelectedSize] = useState({
        ukuran: '',
        harga: 0
    });
    const [price, setPrice] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1); 

    const PORT = 'http://localhost:5000';

    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            const firstVariant = product.variants[0];
            const firstSize = firstVariant.ukuranVarian && firstVariant.ukuranVarian.length > 0 
                ? firstVariant.ukuranVarian[0]  
                : { ukuran: '', harga: 0, _id: '' }; // Set _id kosong jika tidak ada ukuran
    
            setSelectedVariant({
                namaVarian: firstVariant.namaVarian,
                ukuranVarian: firstVariant.ukuranVarian
            });
    
            setSelectedSize({
                ukuran: firstSize.ukuran,
                harga: firstSize.harga,
                _id: firstSize._id  // Tambahkan _id ke selectedSize
            });
    
            console.log('Updated selectedSize:', {
                ukuran: firstSize.ukuran,
                harga: firstSize.harga,
                _id: firstSize._id
            });
        }
    }, [product]);
    

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const getDisplayText = (text) => {
        const maxLength = 243; 
        if (!isExpanded && text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
        setSelectedSize({ ukuran: '', harga: 0 });
        setPrice(variant.harga || product.hargaProduk);
    };

    const handleSizeClick = (size) => {
        setSelectedSize({
            ukuran: size.ukuran,
            harga: size.harga,
            _id: size._id
        });
        setPrice(size.harga);

    };

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
    };

    const handleAddToCart = async () => {
        if (!user) {
            alert('Please log in to add items to the cart');
            return;
        }

        try {
            const response = await axios.post(`${PORT}/add-to-cart`, {
                userId: user._id,
                productId: product._id,
                quantity,
                price,
                selectedVariant,
                selectedSize
            });

            if (response.status === 200) {
                alert('Product added to cart');
                console.log("Select Variant:", selectedVariant)
                console.log("Select Size:", selectedSize)
            }
        } catch (error) {
            alert('Failed to add to cart');
            console.error('Error:', error);
        }
    };

    const handleBuyNow = async () => {
        if (!user) {
            alert('Please log in to proceed');
            return;
        }

        if (product.variants.length > 0 && !selectedVariant) {
            alert('Please select a variant first');
            return;
        }

        if (selectedVariant && selectedVariant.ukuranVarian.length > 0 && !selectedSize) {
            alert('Please select a size first');
            return;
        }

        if (quantity <= 0) {
            alert('Quantity must be greater than zero');
            return;
        }

        try {
            const response = await axios.post(`${PORT}/checkout-direct`, {
                userId: user._id,
                productId: product._id,
                quantity,
                price
            });

            if (response.status === 201) {
                const { paymentToken } = response.data;

                if (!paymentToken) {
                    throw new Error('Failed to retrieve payment token');
                }

                window.snap.pay(paymentToken, {
                    onSuccess: function(result) {
                        console.log('Payment success:', result);
                    },
                    onPending: function(result) {
                        console.log('Payment pending:', result);
                    },
                    onError: function(result) {
                        console.error('Payment error:', result);
                    },
                    onClose: function() {
                        console.log('Payment popup closed');
                    }
                });
            } else {
                alert('Failed to place the order. Please try again.');
            }
        } catch (error) {
            console.error('Failed to process the order:', error);
            alert('Failed to place the order. Please try again.');
        }
    };

    useEffect(() => {
        if (!loading && products) {
            const foundProduct = products.find((p) => p._id.toString() === id.toString());
            setProduct(foundProduct);
            if (foundProduct) {
                setMainImage(foundProduct.gambarProduk[0]);
                setPrice(foundProduct.hargaProduk);
            }
        }
    }, [products, loading, id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const getUniqueVariantNames = () => {
        const variantNames = product.variants.map(variant => variant.namaVarian);
        return [...new Set(variantNames)];
    };

    const uniqueVariantNames = getUniqueVariantNames();

    return (
        <div>
            <Header />

            <div className="container mx-auto w-full max-w-[1400px] mt-10 flex justify-center gap-5">
                <div className="w-full max-w-[400px]">
                    <img className="w-full max-w-[400px] bg-[#DEDEDE] p-[20px] rounded-lg" src={`http://localhost:5000${mainImage}`} alt={product.namaProduk} />
                    <div className="flex mt-2 gap-5">
                        {product.gambarProduk.map((image, index) => (
                            <img
                                key={index}
                                className="w-full max-w-[80px] bg-[#DEDEDE] p-[10px] rounded-lg cursor-pointer"
                                src={`http://localhost:5000${image}`}
                                alt={product.namaProduk}
                                onClick={() => handleThumbnailClick(image)}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-[600px]">
                    <h1 className="font-bold text-[20px]">{product.namaProduk}</h1>

                    <div className="flex items-center gap-1">
                        <img className="w-full max-w-[13px]" src={STARS} alt="Rating stars" />
                        <span>{product.ratings}</span>
                    </div>

                    <p className="font-bold text-[30px] mb-5 mt-3">{formatPrice(price)}</p>

                    <div>
                        {product.variants && product.variants.length > 0 ? (
                            uniqueVariantNames.map((variantName) => (       
                                <button
                                    key={variantName}
                                    onClick={() => handleVariantClick(product.variants.find(v => v.namaVarian === variantName))}
                                    style={{
                                        backgroundColor: selectedVariant && selectedVariant.namaVarian === variantName ? '#194719' : '#DEDEDE',
                                        color: selectedVariant && selectedVariant.namaVarian === variantName ? 'white' : 'black',
                                        padding: '8px 16px',
                                        margin: '4px',
                                        borderRadius: '4px',
                                        border: 'none',
                                    }}
                                >
                                    {variantName}
                                </button>
                            ))
                        ) : (
                            <div></div>   
                        )}
                    </div>

                    <div className="mt-4 mb-4">
                        {selectedVariant && <h4 className="text-xl font-bold mb-3">Pilih Ukuran:</h4>}
                        {selectedVariant && selectedVariant.ukuranVarian && selectedVariant.ukuranVarian.length > 0 ? (
                            selectedVariant.ukuranVarian.map((size) => (
                                <button
                                    key={size._id}
                                    onClick={() => handleSizeClick(size)}
                                    style={{
                                        backgroundColor: selectedSize._id === size._id ? '#194719' : '#DEDEDE',
                                        color: selectedSize._id === size._id ? 'white' : 'black',
                                        padding: '8px 16px',
                                        margin: '4px',
                                        borderRadius: '4px',
                                        border: 'none',
                                    }}
                                >
                                    {size.ukuran}
                                </button>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>

                    <p className="text-slate-500 font-medium">
                        Kondisi : <span className="text-black font-normal">{product.kondisi}</span>
                    </p>

                    <p className="text-slate-500 font-medium">
                        Minimal Pesanan : <span className=" text-black font-normal">1 Buah</span>
                    </p>

                    <p className="mb-3 text-slate-500 font-medium">
                        Toko : <span className="text-[#194719] font-semibold">{product.namaToko}</span>
                    </p>

                    <p className="mb-5 text-slate-500">
                        {getDisplayText(product.deskripsi)}
                        {product.deskripsi.length > 243 && (
                            <button className="text-blue-500 ml-2" onClick={toggleExpansion}>
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </p>
                    

                    <div className="flex gap-5 items-center">
                        <div className="flex border border-gray-300 rounded-md p-1">
                            <button
                                className="w-[40px] h-[40px] flex items-center justify-center text-[18px] bg-gray-200 hover:bg-gray-300"
                                onClick={() => handleQuantityChange(-1)}
                            >
                                -
                            </button>
                            <input
                                className="w-[50px] h-[40px] text-center border-none outline-none"
                                type="text"
                                value={quantity}
                                readOnly
                            />
                            <button
                                className="w-[40px] h-[40px] flex items-center justify-center text-[18px] bg-gray-200 hover:bg-gray-300"
                                onClick={() => handleQuantityChange(1)}
                            >
                                +
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                                <p className="text-gray-500 font-sans">Subtotal</p>
                                <p className="text-[#212121] font-bold font-sanstext-[18px]">{formatPrice(price * quantity)}</p>
                        </div>
                        
                    </div>
                  
                        <button
                            className="w-[100%] max-w-[120px] h-[40px] bg-[#194719] text-white rounded-md mr-3 text-sm"
                            onClick={handleAddToCart}
                        >
                            + Keranjang
                        </button>

                        <button
                            className="w-full max-w-[120px] h-[40px] bg-[#194719] text-white rounded-md mt-4 text-sm"
                            onClick={handleBuyNow}
                        >
                            Beli Sekarang
                        </button>

                </div>
            </div>

            <Footer />
        </div>
    );
}
