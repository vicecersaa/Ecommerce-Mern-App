import React, { useContext, useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../ProductContext";
import Header from "../components/header";
import Footer from "../components/Footer";
import STARS from "../assets/img/star.png";
import { UserContext } from '../UserContext';
import axios from 'axios';
import SemuaProduk from "../components/SemuaProduk";
import { API_URL } from "../config";

const formatPrice = (num) => {
    if (!num) return '';
    return `Rp ${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};

export default function ProdukDetail() {
    const { id } = useParams();
    const { products, loading } = useContext(ProductContext);
    const { user } = useContext(UserContext);
    const [product, setProduct] = useState(null);

    
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    
    const [errorMessageAccount, setErrorMessageAccount] = useState('')
    const [successMessageAccount, setSuccessMessageAccount] = useState('');

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



    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            const firstVariant = product.variants[0];
            const firstSize = firstVariant.ukuranVarian && firstVariant.ukuranVarian.length > 0 
                ? firstVariant.ukuranVarian[0]  
                : { ukuran: '', harga: 0, _id: '' }; 
    
            setSelectedVariant({
                namaVarian: firstVariant.namaVarian,
                ukuranVarian: firstVariant.ukuranVarian
            });
    
            setSelectedSize({
                ukuran: firstSize.ukuran,
                harga: firstSize.harga,
                _id: firstSize._id  
            });
    
           
        }
    }, [product]);

    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setErrorMessageAccount('');
            setSuccessMessageAccount('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    

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
            setErrorMessageAccount('Silahkan login akun anda terlebih dahulu.');
            return;
        }
    
        if (selectedVariant.ukuranVarian.length > 0 && !selectedSize.ukuran) {
            setErrorMessage('Tolong pilih Tipe / Ukuran terlebih dahulu.');
            return;
        }
    
        try {
            const response = await axios.post(`${API_URL}/add-to-cart`, {
                userId: user._id,
                productId: product._id,
                quantity,
                price,
                selectedVariant,
                selectedSize
            });
    
            if (response.status === 200) {
                setSuccessMessageAccount('Produk berhasil ditambahkan ke keranjang!');
                setErrorMessage('');  
            }
        } catch (error) {
            setErrorMessage('Failed to add to cart');
            console.error('Error:', error);
        }
    };
    

    const handleBuyNow = async () => {
        setErrorMessageAccount(''); 
        setSuccessMessageAccount(''); 
    
        if (!user) {
            setErrorMessageAccount('Silahkan login akun anda terlebih dahulu.');
            return;
        }

        if (!user.fullName) {
            setErrorMessageAccount('Silahkan isi keterangan nama lengkap anda di profil.');
            return;
        }
    
        if (!user.address) {
            setErrorMessageAccount('Silahkan isi keterangan alamat lengkap anda di profil.');
            return;
        }
    
        if (!user.phoneNumber) {
            setErrorMessageAccount('Silahkan isi No Telp lengkap anda di profil.');
            return;
        }
    
        if (product.variants.length > 0 && !selectedVariant) {
            setErrorMessageAccount('tolong pilih varian terlebih dahulu');
            return;
        }
    
        if (selectedVariant && selectedVariant.ukuranVarian.length > 0 && (!selectedSize || !selectedSize.ukuran)) {
            setErrorMessage('Pilih Tipe / Ukuran terlebih dahulu.');
            return;
        }
    
        if (quantity <= 0) {
            setErrorMessageAccount('Jumlah barang tidak bisa kosong.');
            return;
        }
    
        try {
            const productName = `${product.namaProduk}${selectedVariant ? ` - ${selectedVariant.namaVarian}` : ''}${selectedSize ? ` - ${selectedSize.ukuran}` : ''}`;
    
            const response = await axios.post(`${API_URL}/checkout-direct`, {
                userId: user._id,
                productId: product._id,
                quantity,
                price,
                productName,
                selectedSize: selectedSize || null, 
                selectedVariant: selectedVariant || null, 
            });
    
            if (response.status === 201) {
                const { paymentToken } = response.data;
    
                if (!paymentToken) {
                    throw new Error('Gagal menerima token pembayaran');
                }
    
                window.snap.pay(paymentToken, {
                    onSuccess: function(result) {
                        
                        setSuccessMessageAccount('Pembayaran Berhasil! Cek riwayat pesanan anda.');
                    },
                    onPending: function(result) {
                        
                        setErrorMessageAccount('Pembayaran ditunggu, harap selesaikan pembayaran anda.');
                    },
                    onError: function(result) {
                        console.error('Pembayaran Error:', result);
                        setErrorMessageAccount('Pembayaran gagal, silahkan melakukan pembayaran ulang.');
                    },
                    onClose: function() {
                        
                        setErrorMessageAccount('Pembayaran dibatalkan, silahkan selesaikan pembayaran anda.');
                    }
                });
            } else {
                setErrorMessageAccount('Gagal melakukan transaksi, silahkan ulang lagi.');
            }
        } catch (error) {
            console.error('Gagal proses pesanan:', error);
            setErrorMessageAccount('Gagal proses pesanan, silahkan coba lagi.');
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
        <div className="bg-gray-50 pb-[100px] md:pb-0">
            <Header />
        <div className="hidden w-full max-w-[350px] mx-auto md:pt-[180px] md:flex bg-white ">
            {errorMessageAccount && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black opacity-50 absolute inset-0"></div>
                    <div
                        ref={modalRef}
                        className="animate-popUp text-red-700 px-4 py-2 font-sans text-center mt-4 bg-red-100 rounded-full mb-2 relative max-w-md mx-auto z-10"
                        role="alert"
                    >
                        <span className="block sm:inline text-center text-sm">{errorMessageAccount}</span>
                    </div>
                </div>
            )}

            {successMessageAccount && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black opacity-50 absolute inset-0"></div>
                    <div
                        ref={modalRef}
                        className="animate-popUp text-green-700 px-4 py-2 font-sans text-center mt-4 bg-green-100 rounded-full mb-2 relative max-w-md mx-auto z-10"
                        role="alert"
                    >
                        <span className="block sm:inline text-center text-sm">{successMessageAccount}</span>
                    </div>
                </div>
            )}

        </div>

        <div className="flex w-full max-w-[350px] mx-auto md:hidden ">
            {errorMessageAccount && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black opacity-50 absolute inset-0"></div>
                    <div
                        ref={modalRef}
                        className="animate-popUp text-red-700 px-4 py-2 font-sans text-center mt-4 bg-red-100 rounded-full mb-2 relative max-w-md mx-auto z-10"
                        role="alert"
                    >
                        <span className="block sm:inline text-center text-sm">{errorMessageAccount}</span>
                    </div>
                </div>
            )}

            {successMessageAccount && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black opacity-50 absolute inset-0"></div>
                    <div
                        ref={modalRef}
                        className="animate-popUp text-green-700 px-4 py-2 font-sans text-center mt-4 bg-green-100 rounded-full mb-2 relative max-w-md mx-auto z-10"
                        role="alert"
                    >
                        <span className="block sm:inline text-center text-sm">{successMessageAccount}</span>
                    </div>
                </div>
            )}

        </div>

            <div className="hidden container mx-auto w-full max-w-[1100px] mt-10 justify-evenly gap-5 md:flex bg-white">
                <div className="w-full max-w-[400px]">
                    <img className="w-full max-w-[400px] bg-[#DEDEDE] p-[20px] rounded-lg" src={`${API_URL}${mainImage}`} alt={product.namaProduk} />
                    <div className="flex justify-center mt-2 gap-5">
                        {product.gambarProduk.map((image, index) => (
                            <img
                                key={index}
                                className="w-full max-w-[80px] bg-[#DEDEDE] p-[10px] rounded-lg cursor-pointer"
                                src={`${API_URL}${image}`}
                                alt={product.namaProduk}
                                onClick={() => handleThumbnailClick(image)}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-[600px]">
                    <h1 className="font-medium font-sans text-2xl">
                        {product.namaProduk}
                        {selectedVariant && selectedVariant.namaVarian 
                            ? ` - ${selectedVariant.namaVarian}` 
                            : ''}
                        {selectedSize && selectedSize.ukuran 
                            ? ` - ${selectedSize.ukuran}` 
                            : ''}
                    </h1>

                    <div className="flex items-center gap-1">
                        <img className="w-full max-w-[13px]" src={STARS} alt="Rating stars" />
                        <span>{product.ratings}</span>
                    </div>

                    <p className="text-[#194719] font-sans font-medium text-2xl mb-5 mt-3">{formatPrice(price)}</p>
                    
                    <div>
                    {product.variants && product.variants.length > 0 ? (
                            <h2 className="text-base font-sans mb-2">Pilih Varian : </h2>
                        ) : (
                            <div></div>   
                        )}

                        {product.variants && product.variants.length > 0 ? (
                            uniqueVariantNames.map((variantName) => (       
                                    <button
                                        className="rounded-full"
                                        key={variantName}
                                        onClick={() => handleVariantClick(product.variants.find(v => v.namaVarian === variantName))}
                                        style={{
                                            backgroundColor: selectedVariant && selectedVariant.namaVarian === variantName ? '#194719' : '#f5f5f5',
                                            color: selectedVariant && selectedVariant.namaVarian === variantName ? 'white' : 'black',
                                            padding: '8px 18px',
                                            margin: '4px',
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

                    {selectedVariant && selectedVariant.ukuranVarian && selectedVariant.ukuranVarian.length > 0 ? (
                            <h2 className="text-base font-sans mb-2 mt-5">Pilih Tipe/Ukuran : </h2>
                        ) : (
                            <p></p>
                        )}

                        {successMessage && (
                            <div className="bg-green-100 border-green-400 text-green-700 text-center font-sans text-sm mt-4 w-full max-w-[370px] mx-auto px-4 py-3">{successMessage}</div>
                        )}

                        {errorMessage && (
                            <div className="animate-popUp text-red-700 px-4 py-2 font-sans max-w-[323px] bg-red-100 rounded-full mb-2" role="alert">
                                <span className="block sm:inline text-center">{errorMessage}</span>
                            </div>
                        )}
                        
                        {selectedVariant && selectedVariant.ukuranVarian && selectedVariant.ukuranVarian.length > 0 ? (
                            selectedVariant.ukuranVarian.map((size) => (
                                <button
                                    className="rounded-full"
                                    key={size._id}
                                    onClick={() => handleSizeClick(size)}
                                    style={{
                                        backgroundColor: selectedSize._id === size._id ? '#194719' : '#f5f5f5',
                                        color: selectedSize._id === size._id ? 'white' : 'black',
                                        padding: '8px 18px',
                                        margin: '4px',
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

                    <p className="text-slate-500 font-medium font-sans">
                        Kondisi : <span className="text-black font-normal font-sans">{product.kondisi}</span>
                    </p>

                    <p className="text-slate-500 font-medium font-sans">
                        Minimal Pesanan : <span className=" text-black font-normal font-sans">1 Buah</span>
                    </p>

                    <p className="mb-3 text-slate-500 font-medium font-sans">
                        Toko : <span className="text-[#194719] font-semibold font-sans">{product.namaToko}</span>
                    </p>

                    <p className="mb-5 text-slate-500 font-sans">
                        {getDisplayText(product.deskripsi)}
                        {product.deskripsi.length > 243 && (
                            <button className="text-[#194719] font-sans" onClick={toggleExpansion}>
                                {isExpanded ? '..Lihat Lebih Sedikit' : '..Lihat Selengkapnya'}
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
                                <p className="text-[#212121] font-sans text-[18px]">{formatPrice(price * quantity)}</p>
                        </div>
                        
                    </div>
                  
                        <button
                            className="w-[100%] max-w-[130px] h-[50px] bg-[#194719] text-white rounded-full mr-3 text-sm font-normal"
                            onClick={handleAddToCart}
                        >
                            + Keranjang
                        </button>

                        <button
                            className="w-full max-w-[130px] h-[50px] bg-yellow-500 text-black rounded-full mt-4 text-sm"
                            onClick={handleBuyNow}
                        >
                            Beli Sekarang
                        </button>

                </div>
            </div>


            <div className="flex flex-col container mx-auto w-full mt-[70px] justify-center md:hidden">
                <div className="w-full max-w-full bg-white">
                    <img className="w-full max-w-screen mx-auto bg-[#DEDEDE] max-h-[380px] px-6"  src={`${API_URL}${mainImage}`} alt={product.namaProduk} />
                    <div className="flex justify-center mt-2 gap-3">
                        {product.gambarProduk.map((image, index) => (
                            <img
                                key={index}
                                className="w-full max-w-[80px] bg-[#DEDEDE] p-[10px] rounded-lg cursor-pointer"
                                src={`${API_URL}${image}`}
                                alt={product.namaProduk}
                                onClick={() => handleThumbnailClick(image)}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full mt-2 bg-gray-100">
                    <div className="bg-white p-[10px]">
                        <p className="text-[#194719] font-sans text-2xl font-bold">{formatPrice(price)}</p>
                        <h1 className="font-sans text-lg mt-2 font-semibold text-gray-500">
                            {product.namaProduk}
                            {selectedVariant && selectedVariant.namaVarian 
                                ? ` - ${selectedVariant.namaVarian}` 
                                : ''}
                            {selectedSize && selectedSize.ukuran 
                                ? ` - ${selectedSize.ukuran}` 
                                : ''}
                        </h1>

                        <div className="flex items-center gap-1 ">
                            <img className="w-full max-w-[15px]" src={STARS} alt="Rating stars" />
                            <span className="font-sans text-base">{product.ratings}</span>
                        </div>
                    </div>

                    <div className="bg-white p-[10px] mt-2">
                    
                        <div className="">
                            {product.variants && product.variants.length > 0 ? (
                                <>
                                    <h2 className="text-base font-sans mb-2 mt-3 font-bold">Pilih Varian : </h2>
                                    <div className="overflow-x-auto flex space-x-2 scrollbar-hide pb-2">
                                        {uniqueVariantNames.map((variantName) => (
                                            <button
                                                className="rounded-full whitespace-nowrap"
                                                key={variantName}
                                                onClick={() => handleVariantClick(product.variants.find(v => v.namaVarian === variantName))}
                                                style={{
                                                    backgroundColor: selectedVariant && selectedVariant.namaVarian === variantName ? '#194719' : '#f5f5f5',
                                                    color: selectedVariant && selectedVariant.namaVarian === variantName ? 'white' : 'black',
                                                    padding: '8px 18px',
                                                    margin: '4px',
                                                    border: 'none',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {variantName}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div></div>
                            )}
                        </div>


                        <div className="mt-4 mb-4">
                            {selectedVariant && selectedVariant.ukuranVarian && selectedVariant.ukuranVarian.length > 0 ? (
                                <h2 className="text-base font-sans mb-2 mt-5 font-bold">Pilih Tipe/Ukuran : </h2>
                            ) : (
                                <p></p>
                            )}

                            {successMessage && (
                                <div className="bg-green-100 border-green-400 text-green-700 text-center font-sans text-sm mt-4 w-full max-w-[370px] mx-auto px-4 py-3">{successMessage}</div>
                            )}

                            {errorMessage && (
                                <div className="animate-popUp text-red-700 px-4 py-2 font-sans max-w-[323px] bg-red-100 rounded-full mb-2" role="alert">
                                    <span className="block sm:inline text-center">{errorMessage}</span>
                                </div>
                            )}
                            
                            {selectedVariant && selectedVariant.ukuranVarian && selectedVariant.ukuranVarian.length > 0 ? (
                                <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar pb-2">
                                    {selectedVariant.ukuranVarian.map((size) => (
                                        <button
                                            className="rounded-full flex-shrink-0"
                                            key={size._id}
                                            onClick={() => handleSizeClick(size)}
                                            style={{
                                                backgroundColor: selectedSize._id === size._id ? '#194719' : '#f5f5f5',
                                                color: selectedSize._id === size._id ? 'white' : 'black',
                                                padding: '8px 18px',
                                                margin: '4px',
                                                border: 'none',
                                            }}
                                        >
                                            {size.ukuran}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p></p>
                            )}
                        </div>

                    </div>

                    <div className="mt-2 mb-2 bg-white p-[10px]">
                        
                        <h2 className="font-bold font-sans text-lg mb-2">Detail Produk</h2>

                        <p className="text-slate-500 font-medium font-sans">
                            Kondisi : <span className="text-black font-normal font-sans">{product.kondisi}</span>
                        </p>

                        <p className="text-slate-500 font-medium font-sans">
                            Minimal Pesanan : <span className=" text-black font-normal font-sans">1 Buah</span>
                        </p>

                        <p className="mb-3 text-slate-500 font-medium font-sans">
                            Toko : <span className="text-[#194719] font-semibold font-sans">{product.namaToko}</span>
                        </p>

                        <h2 className="font-bold font-sans text-lg mb-2">Deskripsi Produk</h2>

                        <p className="text-slate-500 font-sans">
                            {getDisplayText(product.deskripsi)}
                            {product.deskripsi.length > 243 && (
                                <button className="text-[#194719] font-sans" onClick={toggleExpansion}>
                                    {isExpanded ? '..Lihat Lebih Sedikit' : '..Lihat Selengkapnya'}
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t-[1px] shadow-sm md:hidden z-50">
                        
                        <div className="flex justify-between p-[8px]">
                            
                            <div className="w-full max-w-[100px] flex justify-center border border-[#194719] rounded-md p-1">
                                <button
                                    className="w-[25px] h-[25px] flex items-center justify-center text-[18px] font-bold"
                                    onClick={() => handleQuantityChange(-1)}
                                >
                                    -
                                </button>
                                <input
                                    className="w-[35px] h-[23px] text-center border-none outline-none"
                                    type="text"
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    className="w-[25px] h-[25px] flex items-center justify-center text-[18px] font-bold"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    +
                                </button>
                            </div>

                            <div className="flex items-end justify-center gap-3 bg-white px-2">
                                <p className="text-gray-500 font-sans">Subtotal : </p>
                                <p className="text-[#212121] font-sans font-bold text-[18px]">{formatPrice(price * quantity)}</p>
                            </div>
                        </div>

                        <div className="bg-white flex justify-center gap-2 p-2">
                            
                            <div className="flex w-full items-center justify-center gap-2">
                                <button
                                    className="w-full h-[35px] bg-[#FFFFFF] text-[#194719] border-[1px] border-[#194719] rounded-md text-sm font-normal px-2"
                                    onClick={handleAddToCart}
                                >
                                    + Keranjang
                                </button>

                                <button
                                    className="w-full h-[35px] bg-[#194719] border-[1px] border-[#194719] text-white rounded-md text-sm font-normal px-2"
                                    onClick={handleBuyNow}
                                >
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            <Footer />
        </div>
    );
}
