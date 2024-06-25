import { UserContext } from "../UserContext";
import Header from "../components/header";
import { useContext, useState } from "react";
import BLANKPROFILE from '../assets/img/blank.png';

export default function AccountPage() {

    // data profile
    const {user} = useContext(UserContext);
    
    // bio state 
    const [bio, setBio] = useState(true);

    // riwayat state
    const [riwayat, setRiwayat] = useState(false);

    // keranjang state
    const [keranjang, setKeranjang] = useState(false);

    // ubah ke section bio
    function handleBio() {
        setRiwayat(false);
        setKeranjang(false);
        setBio(true);
    }

    //ubah ke section riwayat pesanan
    function handleRiwayat() {
        setBio(false);
        setKeranjang(false);
        setRiwayat(true);
    }

    //ubah ke section keranjang
    function handleKeranjang() {
        setBio(false);
        setRiwayat(false);
        setKeranjang(true);
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

                    </div>
                    
                    {bio && (
                        <div className="flex border-x-2 border-b-2 p-3">
                            <div className="w-full max-w-[250px] flex flex-col justify-center items-center mt-4 mb-4 border-[#E4EBF5] border-2 p-5 rounded-xl shadow-xl"> 
                                <img className="w-full max-w-[250px]" src={BLANKPROFILE} alt="Profile" />
                                <button className="w-full max-w-[250px] mt-3 border-[#E4EBF5] border-2 py-2 px-3 rounded-lg text-sm font-bol cursor-pointer">Pilih Foto</button>
                            </div>
                            <div className="mt-4 w-full flex flex-col p-5 h-full min-h-[340px]">
                                <p className="font-bold text-[#6D7588]">Ubah Biodata Diri</p>

                                <p className="mt-2 text-base">Username : {user.name} <span className="text-xs ml-3 text-[#03AC0E] font-semibold">Ubah</span></p>

                                <p className="mt-2 text-base">Email : {user.email} <span className="text-xs ml-3 text-[#03AC0E] font-semibold">Ubah</span></p>

                                <p className="mt-2 text-base">Password : XXXXXX <span className="text-xs ml-3 text-[#03AC0E] font-semibold">Ubah</span></p>

                                <div className="mt-auto flex items-end">
                                    <button className="bg-red-500  text-white font-sans font-semibold cursor-pointer text-sm py-2 px-4 border-2 rounded-md">Log Out</button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                
            </div>
        </div>
    )
}