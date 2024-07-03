import { UserContext } from "../UserContext";
import Header from "../components/header";
import { useContext, useState } from "react";
import BLANKPROFILE from '../assets/img/blank.png';
import BLANKSQUARE from '../assets/img/blankPicture.png';
import TambahProduk from "../components/TambahProduk";

export default function AccountPage() {

    // data profile
    const {user} = useContext(UserContext);

   
    // bio state 
    const [bio, setBio] = useState(true);

    // riwayat state
    const [riwayat, setRiwayat] = useState(false);

    // keranjang state
    const [keranjang, setKeranjang] = useState(false);

    // tambah produk state
    const [tambahProduk, setTambahProduk] = useState(false)

    // total barang keranjang state
    const [totalBarang, setTotalBarang] = useState(0);

    if (!user) {
        return <div>Loading...</div>;
    }

    

    // ubah ke section bio
    function handleBio() {
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(false);
        setBio(true);
    }

    //ubah ke section riwayat pesanan
    function handleRiwayat() {
        setBio(false);
        setKeranjang(false);
        setTambahProduk(false);
        setRiwayat(true);
    }

    //ubah ke section keranjang
    function handleKeranjang() {
        setBio(false);
        setRiwayat(false);
        setTambahProduk(false);
        setKeranjang(true);
    }

    //ubah ke section tambah produk
    function handleTambahProduk() {
        setBio(false)
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(true);
    }



    return (
        <div>
            <Header />
            <div className="flex flex-col flex-wrap w-full max-w-[1100px] m-auto mt-[30px]">
                <div className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <span className="font-sans font-semibold text-lg">{user.name}</span>
                </div>
                
                    <div className="w-full flex items-center mt-3 border-t-2 border-x-2 rounded-t-xl">

                        <button onClick={handleBio} className={`py-[10px] px-[24px] font-bold ${bio ? 'text-[#03AC0E] border-b-2 border-[#03AC0E]' : 'text-[#6D7588]'}`}>
                            <p>Biodata Diri</p>
                        </button>

                        <button onClick={handleRiwayat} className={`py-[10px] px-[24px] font-bold ${riwayat ? 'text-[#03AC0E] border-b-2 border-[#03AC0E]' : 'text-[#6D7588]'}`}>
                            <p>Riwayat Pesanan</p>
                        </button>

                        <button onClick={handleKeranjang} className={`py-[10px] px-[24px] font-bold ${keranjang ? 'text-[#03AC0E] border-b-2 border-[#03AC0E]' : 'text-[#6D7588]'}`}>
                            <p>Keranjang</p>
                        </button>

                        <button onClick={handleTambahProduk} className={`py-[10px] px-[24px] font-bold ${tambahProduk ? 'text-[#03AC0E] border-b-2 border-[#03AC0E]' : 'text-[#6D7588]'}`}>
                            <p>Tambah Produk</p>
                        </button>

                    </div>
                    
                    {bio && (
                        <div className="flex border-x-2 border-b-2 p-3">
                            <div className="mt-4 w-full flex p-5 h-screen min-h-[340px]">
                                <div className="w-full max-w-[250px] h-full max-h-[300px] flex flex-col justify-center items-center mt-4 mb-4 border-[#E4EBF5] border-2 p-5 rounded-xl shadow-xl"> 
                                    <img className="w-full max-w-[250px]" src={BLANKPROFILE} alt="Profile" />
                                    <button className="w-full max-w-[250px] mt-3 border-[#E4EBF5] border-2 py-2 px-3 rounded-lg text-sm font-bol cursor-pointer">Pilih Foto</button>
                                </div>
                                <div className="mt-4 w-full flex flex-col p-5 h-full min-h-[340px] max-h-[300px]">
                                    <p className="font-bold text-[#6D7588]">Ubah Biodata Diri</p>

                                    <p className="mt-2 text-base w-full font-semibold">Username : {user.name} <span className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">Ubah</span></p>

                                    <p className="mt-2 text-base w-full font-semibold">Nama Lengkap : {user?.fullName || "-"} <span className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">Tambahkan / Ubah</span></p>

                                    <p className="mt-2 text-base w-full font-semibold">Alamat Lengkap : {user?.address || "-"} <span className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">Tambahkan / Ubah</span></p>

                                    <p className="mt-2 text-base w-full font-semibold">Nomor Hp : {user?.phoneNumber || "-"} <span className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">Tambahkan / Ubah</span></p>

                                    <p className="mt-2 text-base w-full font-semibold">Email : {user.email} <span className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">Ubah</span></p>

                                    <p className="mt-2 text-base w-full font-semibold">Password : XXXXXX <span className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">Ubah</span></p>

                                    

                                    <div className="mt-auto flex items-end">
                                        <button className="bg-red-500  text-white font-sans font-semibold cursor-pointer text-sm py-2 px-4 border-2 rounded-md">Log Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {riwayat && (
                        <div className="flex border-x-2 border-b-2 p-3">
                            <div className="mt-4 w-full flex flex-col p-5 h-screen min-h-[340px]">
                                <p className="text-xl font-sans font-semibold">Daftar Transaksi</p>

                                <div className="flex items-center mt-5">
                                    <p className="text-md font-sans font-bold mr-6">Status</p>
                                    <div className="flex justify-center items-center gap-3">
                                        <button className="font-sans font-medium py-1 px-4 border-2 rounded-full border-slate-200">Semua</button>
                                        <button className="font-sans font-medium py-1 px-4 border-2 rounded-full border-slate-200">Berlangsung</button>
                                        <button className="font-sans font-medium py-1 px-4 border-2 rounded-full border-slate-200">Berhasil</button>
                                        <button className="font-sans font-medium py-1 px-4 border-2 rounded-full border-slate-200">Tidak Berhasil</button>
                                    </div>
                                </div>

                                <div className="mt-5 border-2 p-[20px] rounded-lg border-slate-300">

                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                        <p className="text-sm">Belanja</p>
                                        <span className="text-sm">Tanggal Pembelian</span>
                                        <span className="text-sm px-2 border-2 border-[#03AC0E] rounded-md bg-[#03AC0E] font-bold">Status</span>
                                    </div>

                                    <div className="mt-3">{user?.namaToko || "Springbed"}</div>

                                    <div className="mt-2 flex gap-5 items-center">
                                        <img className="w-full max-w-[60px] h-full min-h-[60px] rounded-lg" src={user?.gambarProduk || BLANKSQUARE} alt="Gambar Produk" />
                                        <div className="mr-auto">
                                            <p className="text-md font-semibold">{user?.namaProduk || "Nama Produk"}</p>
                                            <span className="text-sm">1 barang x {user?.hargaProduk || "Harga Produk"}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span>Total Belanja</span>
                                            <span>{user?.totalBelanja || "Rp. 0"}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 justify-end mt-10">
                                        <p className="text-[#03AC0E] text-sm font-semibold">Lihat Detail Transaksi</p>
                                        <button className="py-[4px] px-12 bg-white rounded-md text-sm border-[1px] border-[#03AC0E] text-[#03AC0E] font-bold">Beri Ulasan</button>
                                        <button className="py-[6px] px-12 bg-[#03AC0E] rounded-md text-sm text-white font-bold">Beli Lagi</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}


                    {keranjang && (
                        <div className="flex border-x-2 border-b-2 p-3">
                            <div className="mt-4 w-full flex flex-col p-5 h-screen min-h-[340px]">
                                <p className="text-xl font-sans font-semibold">Keranjang</p>

                                <div className="flex items-center w-full h-[65px] border-[1px] bg-[whitesmoke] rounded-lg mt-5">
                                    <input className="w-5 h-5 mr-4 ml-4 cursor-pointer" type="checkbox" />
                                    <p className="mr-1 font-semibold">Pilih Semua</p>
                                    <span>({totalBarang})</span>
                                </div>

                                <div className="flex flex-col justify-center w-full border-[1px] bg-[whitesmoke] rounded-lg mt-5">
                                    
                                    <div className="flex items-center mb-5 mt-3">
                                        <input className="w-5 h-5 mr-4 ml-4 cursor-pointer" type="checkbox" />
                                        <p className="font-semibold">{user?.namaToko || "Nama Toko"}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center"> 
                                            <input className="w-5 h-5 mr-4 ml-4 cursor-pointer" type="checkbox" />
                                            <img className="w-full max-w-[60px] h-full min-h-[60px] rounded-lg" src={user?.gambarProduk || BLANKSQUARE} alt="Gambar Produk" />
                                            <p className="text-base ml-5">{user?.namaProduk || "Nama Produk"}</p>
                                            <p className="ml-auto mr-4">{user?.hargaProduk || "Rp. 0"}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 mt-4 justify-end mr-5 mb-3">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="align-center size-6 text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>


                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="align-center size-6 text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                            <div className="flex items-center justify-between border-[1px] border-slate-400 rounded-lg">
                                                <button class="px-3  text-black rounded-l-md hover:bg-green-600" >-</button>
                                                <span id="counterValue" class="px-4 py-1 bg-gray-100 text-gray-800 font-bold">0</span>
                                                <button class="px-3  text-black rounded-r-md hover:bg-green-600" >+</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )}

                   {tambahProduk && (
                     <div className="flex border-x-2 border-b-2 p-3">
                        <div className="mt-4 w-full flex flex-col p-5 h-screen h-full min-h-[1500px]">
                            <TambahProduk /> 
                         </div>
                    </div>
                   )}
            </div>
        </div>
    )
}