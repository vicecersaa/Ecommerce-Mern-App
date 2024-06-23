import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="w-full">
            <div className="flex items-center align-middle bg-gray-200 w-full py-2 px-4 justify-between">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>


                    <p className="text-base font-normal font-sans">Diskon Besar!</p>
                </div>
                <div className="text-base">
                    <a className="mr-6 hover:text-[#03AC0E]" href="">Tentang Davidpedia</a>
                    <a className="mr-6 hover:text-[#03AC0E]" href="">Mitra Davidpedia</a>
                    <a className="mr-6 hover:text-[#03AC0E]" href="">Mulai Berjualan</a>
                    <a className="mr-6 hover:text-[#03AC0E]" href="">Promo</a>
                    <a className="mr-6 hover:text-[#03AC0E]" href="">Davidpedia Care</a>
                </div>
            </div>
            <div className="flex items-center align-middle py-4 px-4 w-full gap-5 h-30 border-gray-200 border-b-2">
                
                <div className="flex items-center align-middle gap-10">
                    <a className="text-[#03AC0E] text-5xl ml-8 font-semibold font-sans" href="/">davidpedia</a>

                    <p className="text-[#505050] text-xl font-semibold font-sans mt-4 hover:bg-gray-200 py-3 px-3 rounded-md cursor-pointer">Kategori</p>
                </div>
                <div className="mt-3 w-full relative">
                    <input className="text-black border-2 border-[#BFC9D9] mt-1 rounded-md py-3 px-3 w-full focus:outline-none focus:border-[#03AC0E]" type="text" placeholder="Cari di Davidpedia" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute top-4 right-3 size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>

                <div className="mr-10 ml-10 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>

                <div className="flex items-center align-middle gap-3 mt-3">
                    <Link to={'/login'} className="bg-white border-[#03AC0E] py-2 px-5 border-2 rounded-xl text-[#03AC0E] font-bold text-base">Masuk</Link>
                    <Link to={'/register'} className="bg-[#03AC0E] border-[#03AC0E] py-2 px-5 mr-10 border-4 rounded-xl text-white font-bold text-base">Daftar</Link>
                </div>
                
            </div>
        </div>
    )
}
