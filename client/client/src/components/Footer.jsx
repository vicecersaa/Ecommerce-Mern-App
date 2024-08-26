import LOGO from '../assets/img/FL White.png';
import TIKTOK from '../assets/img/tiktok.png';
import YOUTUBE from '../assets/img/youtube.png';
import FACEBOOK from '../assets/img/facebook.png';
import INSTAGRAM from '../assets/img/instagram.png';

export default function Footer() {
    return (
        <div className="hidden w-full bg-[#194719] min-h-[350px] mt-20 md:flex flex-col">
            <div className='p-[60px] flex min-h-[350px]'>
                <div className="w-full max-w-[36%] mr-10">
                    <img className="w-full max-w-[250px]" src={LOGO} alt="Forland Living Logo" />
                    <p className='font-sans text-white text-sm mt-5 w-full '>Forland Living berdiri sejak 2020, Forland Living adalah perusahaan springbed terbaik yang memiliki visi & misi untuk memberikan kenyamanan pada setiap pelanggan</p>
                    <div className='flex items-center gap-3 mt-5'>
                        <div className='rounded-full bg-white/50 w-[28px] h-[28px] items-center flex justify-center'>
                            <img className="w-full max-w-[20px]" src={INSTAGRAM} alt="Forland Living Instagram" />
                        </div>
                        <div className='rounded-full bg-white/50 w-[28px] h-[28px] items-center flex justify-center'>
                            <img className="w-full max-w-[20px]" src={TIKTOK} alt="Forland Living Tiktok" />
                        </div>
                        <div className='rounded-full bg-white/50 w-[28px] h-[28px] items-center flex justify-center'>
                            <img className="w-full max-w-[20px]" src={YOUTUBE} alt="Forland Living Youtube" />
                        </div>
                        <div className='rounded-full bg-white/50 w-[28px] h-[28px] items-center flex justify-center'>
                            <img className="w-full max-w-[20px]" src={FACEBOOK} alt="Forland Living Facebook" />
                        </div>        
                    </div>
                </div>
                <div className='w-full max-w-[16%] flex flex-col gap-5'>
                    <p className='text-white font-sans text-xl'>Perusahaan</p>
                    <a href="#" className='text-white text-sm'>Tentang Kami</a>
                    <a href="#" className='text-white text-sm'>Blog</a>
                    <a href="#" className='text-white text-sm'>Hubungi Kami</a>
                    <a href="#" className='text-white text-sm'>Karir</a>
                </div>
                <div className='w-full max-w-[16%] flex flex-col gap-5'>
                    <p className='text-white font-sans text-xl'>Kustomer Servis</p>
                    <a href="#" className='text-white text-sm'>Akun Saya</a>
                    <a href="#" className='text-white text-sm'>Lacak Pesanan Anda</a>
                    <a href="#" className='text-white text-sm'>Pengembalian</a>
                    <a href="#" className='text-white text-sm'>FAQ</a>
                </div>
                <div className='w-full max-w-[16%] flex flex-col gap-5'>
                    <p className='text-white font-sans text-xl'>Tentang Kami</p>
                    <a href="#" className='text-white text-sm'>Privasi</a>
                    <a href="#" className='text-white text-sm'>Syarat & Ketentuan</a>
                    <a href="#" className='text-white text-sm'>Kebijakan Pengembalian</a>
                </div>
                <div className='w-full max-w-[16%] flex flex-col gap-5'>
                    <p className='text-white font-sans text-xl'>Info Kontak</p>
                    <a href="#" className='text-white text-sm'>+62 851-5692-1649</a>
                    <a href="#" className='text-white text-sm'>forland.living@gmail.com</a>
                    <a href="#" className='text-white text-sm'>Jl.Arzimar I No.30, Tegal Gundil 16144</a>
                </div>
            </div>
            <div className='w-full min-h-[40px] bg-yellow-600 flex items-center justify-center'>
                <p className='font-sans text-center'>Copyright © 2024 Forland Living. All Rights Reserved.</p>
            </div>
        </div>
    )
}