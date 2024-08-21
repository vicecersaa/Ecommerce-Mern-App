import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import LOGO from '../assets/img/LOGO2.jpg';
import {ProductContext} from '../ProductContext';
export default function Header() {

    const {user} = useContext(UserContext)
    const { searchProducts, searchResults, fetchDefaultProducts } = useContext(ProductContext);
    const [query, setQuery] = useState('');
    const [showRecommendations, setShowRecommendations] = useState(false);
    const searchBoxRef = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery) {
            searchProducts(newQuery);
        } else {
            fetchDefaultProducts();
        }
        setShowRecommendations(true);
    };

    const handleClickOutside = (e) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
            setShowRecommendations(false);
        }
    };

    const handleRecommendationClick = (productId) => {
        navigate(`/products/${productId}`);
        setShowRecommendations(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!query) {
            fetchDefaultProducts();
        }
    }, [query, fetchDefaultProducts]);

    return (
        <div className="w-full">
            <div className="flex items-center bg-[#194719] w-full py-3 px-4 justify-between">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>


                    <p className="text-base font-sans text-white">Daftar sekarang dan dapatkan 25% diskon dalam pembelian pertama. <Link className=" text-yellow-400 font-sans underline" to={'/register'}>Daftar Sekarang</Link></p>
                </div>
                <div className="text-sm text-white font-sans">
                    <a className="mr-6 hover:text-yellow-400 font-sans" href="">Tentang Forland Living</a>
                    <a className="mr-6 hover:text-yellow-400 font-sans" href="">Mitra Forland Living</a>
                    <a className="mr-6 hover:text-yellow-400 font-sans" href="">Hubungi Kami</a>
                    <a className="mr-6 hover:text-yellow-400 font-sans" href="">Promo</a>
                    <a className="mr-6 hover:text-yellow-400 font-sans" href="">Forland Living Care</a>
                </div>
            </div>
            <div className="flex items-center align-middle py-2 px-4 w-full gap-5 h-30 border-gray-200 border-b-2">
                
                <div className="flex items-center align-middle gap-10 mr-6">
                    <Link to={'/'} className="ml-8">
                        <img src={LOGO} alt="Forland Living" className="w-full max-w-[270px]" />
                    </Link>
                </div>

                <div className="mt-3 w-full relative" ref={searchBoxRef}>
                    <input
                        className="text-black border-2 border-[#BFC9D9] text-sm rounded-md py-2 px-3 w-full focus:outline-none"
                        type="text"
                        placeholder="Cari di Forland Living"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => setShowRecommendations(true)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute top-3 right-3 size-4 text-[#BFC9D9]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    {showRecommendations && (
                        <div className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg">
                            {Array.isArray(searchResults) && searchResults.length > 0 ? (
                                <ul>
                                    {searchResults.map(product => (
                                        <li
                                            key={product._id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleRecommendationClick(product._id)}
                                        >   
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-black">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                </svg>
                                                <p className="text-sm text-black">
                                                    {product.namaProduk}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-2 flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-slate-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                    <p className="text-sm text-gray-500">
                                        Pencarian Tidak Ditemukan
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mr-5 ml-5 mt-3">
                    <Link to={`/account`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </Link>
                </div>

              
                {!user && (
                    <div className="flex items-center align-middle gap-3 mt-3">
                        <Link to={'/login'} className="bg-white border-[2px] border-[#194719] py-2 px-5 rounded-md text-[#194719] font-medium font-sans text-base">Masuk</Link>
                        <Link to={'/register'} className="bg-[#194719] border-[#194719] py-2 px-5 mr-5 border-4 rounded-md text-white font-medium font-sans text-base">Daftar</Link>
                    </div>
                )}
                
                {!!user && (
                    <Link to={'/account'}>
                        <div className="w-full flex items-center justify-center mx-auto mt-3 gap-2 mr-3 border-2 py-2 px-3 rounded-3xl border-slate-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            <p className="font-sans">{user.name}</p>
                        </div>
                    </Link>
                )}
                
            </div>
        </div>
    )
}
