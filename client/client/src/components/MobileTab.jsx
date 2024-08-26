import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function MobileTab({keranjang, home, produk, transaksi, akun}) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;

    if (path === '/' && hash === '#semuaProduk') {
      setActiveTab('produk');
    } else if (path === '/' && hash === '#keranjang') {
      setActiveTab('keranjang');
    } else if (path === '/' && hash === '#akun') {
      setActiveTab('akun');
    } else if (path === '/' && hash === '#transaksi') {
      setActiveTab('transaksi');
    } else if (path === '/') {
      setActiveTab('home');
    } else {
      setActiveTab('home');
    }
  }, [location]);

  const {user, setUser} = useContext(UserContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-[60px] bg-white border-t-[1px] shadow-sm md:hidden z-50 flex justify-evenly items-center">
      <Link to="/" onClick={home}>
        <div className={`flex flex-col justify-center items-center ${activeTab === 'home' ? 'text-[#194719] font-bold border-b-2 border-[#194719]' : 'text-gray-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill={activeTab === 'home' ? '#194719' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12L11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="font-sans text-xs">Home</span>
        </div>
      </Link>

      <a href="#semuaProduk" onClick={produk}>
        <div className={`flex flex-col justify-center items-center ${activeTab === 'produk' ? 'text-[#194719] font-bold border-b-2 border-[#194719]' : 'text-gray-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill={activeTab === 'produk' ? '#194719' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
          </svg>
          <span className="font-sans text-xs">Produk</span>
        </div>
      </a>
      {user ? (
        <a href="#keranjang" onClick={keranjang}>
          <div className={`flex flex-col justify-center items-center ${activeTab === 'keranjang' ? 'text-[#194719] font-bold border-b-2 border-[#194719]' : 'text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={activeTab === 'keranjang' ? '#194719' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="font-sans text-xs">Keranjang</span>
          </div>
        </a>
      ) : (
        <Link to={'/login'}>
        <div className={`flex flex-col justify-center items-center ${activeTab === 'keranjang' ? 'text-[#194719] font-bold border-b-2 border-[#194719]' : 'text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={activeTab === 'keranjang' ? '#194719' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="font-sans text-xs">Keranjang</span>
          </div>
        </Link>
      )}
      
      
      
      {user ? (
        <a href="#transaksi" onClick={transaksi}>
          <div className={`flex flex-col justify-center items-center ${activeTab === 'transaksi' ? 'text-[#194719] font-bold border-b-2 border-[#194719]' : 'text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={activeTab === 'transaksi' ? '#194719' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.726 48.726 0 0 0-12.548 0A2.142 2.142 0 0 0 3.75 6.108V16.5A2.25 2.25 0 0 0 6 18.75h.75m2.491-14.25v.75c0 1.243 1.009 2.25 2.25 2.25a2.25 2.25 0 0 0 2.25-2.25v-.75m-4.5 0v.75c0 1.243 1.009 2.25 2.25 2.25a2.25 2.25 0 0 0 2.25-2.25v-.75" />
            </svg>
            <span className="font-sans text-xs">Transaksi</span>
          </div>
        </a>
      ) : (
        <Link to="/login">
        <div className={`flex flex-col justify-center items-center ${activeTab === 'transaksi' ? 'text-[#194719] font-bold border-b-2 border-[#194719]' : 'text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={activeTab === 'transaksi' ? '#194719' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.726 48.726 0 0 0-12.548 0A2.142 2.142 0 0 0 3.75 6.108V16.5A2.25 2.25 0 0 0 6 18.75h.75m2.491-14.25v.75c0 1.243 1.009 2.25 2.25 2.25a2.25 2.25 0 0 0 2.25-2.25v-.75m-4.5 0v.75c0 1.243 1.009 2.25 2.25 2.25a2.25 2.25 0 0 0 2.25-2.25v-.75" />
            </svg>
            <span className="font-sans text-xs">Transaksi</span>
          </div>
          </Link>
      )}
      
      
      {user ? (
                <a href="#akun" onClick={akun}>
                  <div className={`flex flex-col justify-center items-center ${activeTab === 'akun' ? 'text-[#194719] font-bold border-b-2 border-[#194719]' : 'text-gray-500'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill={activeTab === 'akun' ? '#194719' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Zm-9 11.625a8.999 8.999 0 0 1 15.012 0M6.68 20.625A9.001 9.001 0 0 1 12 20.25a9.001 9.001 0 0 1 5.32 1.375" />
                      </svg>
                      <span className="font-sans text-xs">Akun</span>
                  </div>
                </a>
            ) : (
              <Link to="/login">
                  <div className={`flex flex-col justify-center items-center ${activeTab === 'akun' ? 'text-[#194719] font-bold border-b-2 border-[#194719]' : 'text-gray-500'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill={activeTab === 'akun' ? '#194719' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Zm-9 11.625a8.999 8.999 0 0 1 15.012 0M6.68 20.625A9.001 9.001 0 0 1 12 20.25a9.001 9.001 0 0 1 5.32 1.375" />
                      </svg>
                      <span className="font-sans text-xs">Akun</span>
                  </div>
              </Link>
        )}
    </div>
  );
}
