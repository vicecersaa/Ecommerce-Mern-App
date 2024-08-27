import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ProductContext } from '../ProductContext';
import { Link } from 'react-router-dom';
import './ProdukUnggulan.css';
import { API_URL } from '../config';

export default function ProdukUnggulan() {
    const { products } = useContext(ProductContext);

    const featuredProductNames = ["Full Foam In A Box - Standard Series", "Mornington Bonnel", "Multibed Bonnel Spring", "Shamanta", "Swanston", "Bumper", "Silver", "Sofabed"];

    const featuredProducts = products
        .filter(product =>
            featuredProductNames.some(name => product.namaProduk.toLowerCase().includes(name.toLowerCase()))
        )
        .sort((a, b) => {
            const indexA = featuredProductNames.findIndex(name => a.namaProduk.toLowerCase().includes(name.toLowerCase()));
            const indexB = featuredProductNames.findIndex(name => b.namaProduk.toLowerCase().includes(name.toLowerCase()));
            return indexA - indexB;
        })
        .slice(0, 8);

    const truncateText = (text, length) => {
        if (text.length > length) {
            return `${text.slice(0, length)}...`;
        }
        return text;
    };

    return (
        <div>
            <div className="hidden w-full max-w-screen-lg mx-auto overflow-hidden md:flex">
                <Swiper
                    spaceBetween={10} 
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 5 },
                        768: { slidesPerView: 3, spaceBetween: 5 },
                        1024: { slidesPerView: 4, spaceBetween: 10 },
                        
                    }}
                    modules={[Navigation, Pagination]}
                >
                    {featuredProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <Link to={`/products/${product._id}`}>
                                <div className="flex flex-col items-start justify-center w-full h-auto p-4 border border-gray-300 bg-white rounded-lg mb-4">
                                    <img
                                        src={`${API_URL}${product.gambarProduk[0]}`}
                                        alt={product.namaProduk}
                                        className="w-full max-w-[200px] h-auto rounded-md mx-auto"
                                    />
                                    <span className='text-xs sm:text-sm text-[#194719] mb-1'>{product.categoryProduk}</span>
                                    <h3 className="font-medium font-sans text-sm sm:text-base mb-1">
                                        {truncateText(product.namaProduk, 30)}
                                    </h3>
                                    <p className='text-xs sm:text-sm font-sans mb-1'>{product.kondisi}</p>
                                    <p className="text-sm sm:text-base text-[#194719]-600">{formatPrice(product.hargaProduk)}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="flex w-full max-w-screen-lg mx-auto h-full max-h-[225px] overflow-hidden md:hidden p-2 mb-3">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        370: { slidesPerView: 2, spaceBetween: 10 },
                        480: { slidesPerView: 2, spaceBetween: 10 },
                       
                        
                    }}
                    modules={[Navigation, Pagination]}
                    className="swiper-container"
                >
                    {featuredProducts.map((product) => (
                        <SwiperSlide key={product._id} className="flex items-center justify-center">
                            <Link to={`/products/${product._id}`} className="flex flex-col items-start justify-center w-full max-w-[180px] max-h-[200px] p-4 border border-gray-300 bg-white rounded-lg">
                                <img
                                    src={`${API_URL}${product.gambarProduk[0]}`}
                                    alt={product.namaProduk}
                                    className="w-full max-w-[130px] h-auto rounded-md mx-auto"
                                />
                                <h3 className="font-medium font-sans text-sm sm:text-base mb-1">
                                    {truncateText(product.namaProduk, 15)}
                                </h3>
                                <p className="text-sm sm:text-base text-[#194719]-600">{formatPrice(product.hargaProduk)}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

const formatPrice = (num) => {
    if (!num) return '';
    return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};
