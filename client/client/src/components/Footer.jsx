import LOGO from '../assets/img/FL White.png';
import TIKTOK from '../assets/img/tiktok.png';
import YOUTUBE from '../assets/img/youtube.png';
import FACEBOOK from '../assets/img/facebook.png';
import INSTAGRAM from '../assets/img/Instagram.png';

export default function Footer() {
    return (
        <div className="hidden w-full bg-[#194719] min-h-[350px] mt-20 md:flex justify-center flex-col">
            <div className='p-[60px] flex justify-center min-h-[300px]'>
                <div className="w-full max-w-[40%] mr-10">
                    <img className="w-full max-w-[250px]" src={LOGO} alt="Forland Living Logo" />
                    <p className='font-sans text-white text-sm mt-5 w-full '>Forland Living berdiri sejak 2020, Forland Living adalah perusahaan springbed terbaik yang memiliki visi & misi untuk memberikan kenyamanan pada setiap pelanggan</p>
                    <div className='flex items-center gap-3 mt-5'>
                        <div className='rounded-full bg-white/50 w-[28px] h-[28px] items-center flex justify-center'>
                            <a href="https://www.instagram.com/forland.living/" target='_blank'>
                                <img className="w-full max-w-[20px]" src={INSTAGRAM} alt="Forland Living Instagram" />
                            </a>
                        </div>
                        <div className='rounded-full bg-white/50 w-[28px] h-[28px] items-center flex justify-center'>
                            <a href="https://www.tiktok.com/@forlandliving" target='_blank'>
                                <img className="w-full max-w-[20px]" src={TIKTOK} alt="Forland Living Tiktok" />
                            </a>
                        </div>
                        <div className='rounded-full bg-white/50 w-[28px] h-[28px] items-center flex justify-center'>
                            <a href="https://www.youtube.com/@ForlandLivingOfficial" target='_blank'>
                            <img className="w-full max-w-[20px]" src={YOUTUBE} alt="Forland Living Youtube" />
                            </a>
                        </div>
                        <div className='rounded-full bg-white/50 w-[28px] h-[28px] items-center flex justify-center'>
                            <a href="https://www.facebook.com/forland.springbed/" target='_blank'>
                            <img className="w-full max-w-[20px]" src={FACEBOOK} alt="Forland Living Facebook" />
                            </a>
                        </div>        
                    </div>
                </div>
                <div className='w-full max-w-[18%] flex flex-col gap-5'>
                    <p className='text-white font-sans text-xl'>Perusahaan</p>
                    <a href="#semuaProduk" className='text-white text-sm'>Tentang Kami</a>
                    <a href="#semuaProduk" className='text-white text-sm'>Produk</a>
                    <a href="https://wa.link/0jdldi" className='text-white text-sm'>Hubungi Kami</a>
                    <a href="https://wa.link/0jdldi" className='text-white text-sm'>Karir</a>
                </div>
                <div className='w-full max-w-[18%] flex flex-col gap-5'>
                    <p className='text-white font-sans text-xl'>Info Kontak</p>
                    <p className='text-white text-sm font-sans'>+62 851-7407-1345</p>
                    <p className='text-white text-sm font-sans'>forland.living@gmail.com</p>
                </div>
                <div className='w-full max-w-[18%] flex flex-col gap-5'>
                    <p className='text-white font-sans text-xl'>Kustomer Servis</p>
                    <a href="/account" className='text-white text-sm'>Akun Saya</a>
                    <a href="/account" className='text-white text-sm'>Lacak Pesanan Anda</a>          
                </div>
                
            </div>
            <div className='w-full min-h-[40px] bg-yellow-600 flex items-center justify-center'>
                <p className='font-sans text-center'>Copyright © 2024 Forland Living. All Rights Reserved.</p>
            </div>
        </div>
    )
}