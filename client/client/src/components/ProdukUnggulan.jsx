import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ProductContext } from '../ProductContext';
import { Link } from 'react-router-dom';
import './ProdukUnggulan.css';

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
        <div className="w-full max-w-[1200px] mx-auto overflow-hidden">
            <Swiper
                spaceBetween={20}
                slidesPerView={4}   
                navigation
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3.5 },
                }}
                modules={[Navigation, Pagination]} 
            >
                {featuredProducts.map((product) => (
                    <SwiperSlide key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <div className="flex flex-col items-start justify-center w-full max-w-[300px] h-[430px] p-[20px] border-[1px] border-gray-300 bg-white rounded-lg shadow-xl mb-10">
                                <img
                                    src={`http://localhost:5000${product.gambarProduk[0]}`}
                                    alt={product.namaProduk}
                                    className="w-full max-w-[270px] h-64 rounded-md mx-auto"
                                />
                                <span className='text-sm text-[#194719] mb-1'>{product.categoryProduk}</span>
                                <h3 className="font-medium font-sans text-base mb-1">
                                    {truncateText(product.namaProduk, 50)}
                                </h3>
                                <p className='text-sm font-sans mb-1'>{product.kondisi}</p>
                                <p className="text-base text-[#194719]-600">{formatPrice(product.hargaProduk)}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

const formatPrice = (num) => {
    if (!num) return '';
    return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};
