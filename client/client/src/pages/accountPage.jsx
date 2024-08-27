import { UserContext } from "../UserContext";
import Header from "../components/header";
import { useContext, useState, useEffect } from "react";
import BLANKSQUARE from '../assets/img/blankPicture.png';
import TambahProduk from "../components/TambahProduk";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import ChangePasswordForm from '../components/ChangePasswordForm';
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import KeranjangCard from '../components/KeranjangCard';
import OrderHistory from '../components/OrderHistory';
import AccountSettings from '../pages/AccountSettings';
import { ProductContext} from '../ProductContext';
import AdminList from "../components/AdminList";
import LOGO from '../assets/img/LOGO1.jpg';
import { Link } from "react-router-dom";
import AdminOrderHistory from "../components/AdminOrderHistory";
import MobileTab from "../components/MobileTab";
import { API_URL } from "../config";


export default function AccountPage() {

    
    const {user, setUser} = useContext(UserContext);
     
    const [bio, setBio] = useState(true);
    
    const [riwayat, setRiwayat] = useState(false);
    
    const [keranjang, setKeranjang] = useState(false);
    
    const [tambahProduk, setTambahProduk] = useState(false);
    
    const [akun, setAkun] = useState(false);

    const navigate = useNavigate();
    
    const [transaksi, setTransaksi] = useState(false);
    
    const [produkSaya, setProdukSaya] = useState(false);
     const [editingField, setEditingField] = useState(null);
     const [editValue, setEditValue] = useState('');
     const [cart, setCart] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const { products, setProducts } = useContext(ProductContext);

    const filteredProducts = products.filter(product =>
        product.namaProduk.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const visibleProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleEdit = (id) => {
        navigate(`/account/product-edit/${id}`);
    };
        
        
        useEffect(() => {
            const fetchCart = async () => {
              
              if (!user || !user._id) {
                console.error('User ID is not available');
                return;
              }
          
              try {
                const response = await axios.get(`${API_URL}/get-cart`, {
                  params: { userId: user._id }
                });
          
                if (response.status === 200) {
                  setCart(response.data.cart || []);
                } else {
                  console.error('Failed to fetch cart:', response.status);
                }
              } catch (error) {
                console.error('Failed to fetch cart:', error);
                setError(error);
              } finally {
                setLoading(false);
              }
            };
          
            
            if (user && user._id) {
              fetchCart();
            }
          }, [user]); 
    

    if (!user) {
        return 
        navigate('/login');
    }

   
    async function logout() {
        try {
            const response = await axios.post(`${API_URL}/logout`, null, { withCredentials: true });
            
            
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
            console.error('Error response:', error.response);
        }
    }

    
    function handleBio() {
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setAkun(false);
        setTransaksi(false)
        setBio(true);
    }

    
    function handleRiwayat() {
        setBio(false);
        setKeranjang(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setAkun(false);
        setTransaksi(false)
        setRiwayat(true);
    }

    
    function  handleKeranjang() {
        setBio(false);
        setRiwayat(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setAkun(false);
        setTransaksi(false)
        setKeranjang(true);
    }

    
    function handleTambahProduk() {
        setBio(false)
        setRiwayat(false);
        setKeranjang(false);
        setProdukSaya(false);
        setAkun(false);
        setTransaksi(false)
        setTambahProduk(true);
    }

    function handleUbahProduk() {
        setBio(false)
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(false);
        setAkun(false);
        setTransaksi(false)
        setProdukSaya(true);
    }

    function handleAkun() {
        setBio(false)
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setTransaksi(false)
        setAkun(true);
    }

    function handleTransaksi() {
        setBio(false)
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setAkun(false);
        setTransaksi(true);
    }


    const startEditing = (field, currentValue) => {
        setEditValue(currentValue); 
        setEditingField(field); 
    };

    const handleSave = async () => {
        if (editingField) {
            try {
                
                await handleEditProfile(editingField, editValue);
                setEditingField(null); 
                setEditValue(''); 
            } catch (err) {
                console.error(`Failed to update ${editingField}:`, err);
            }
        }
    };

      
      const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${API_URL}/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    
                    setProducts(products.filter(product => product._id !== productId));
                    alert('Product deleted successfully');
                } else {
                    const errorData = await response.json();
                    alert(`Failed to delete product: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product');
            }
        }
    };
    


     
     const handleEditProfile = async (field, value) => {
        try {
            const response = await axios.patch(`${API_URL}/profile/update-profile/${user._id}`, { [field]: value }, { withCredentials: true });
            if (response.status === 200) {
                setUser(prevUser => ({ ...prevUser, [field]: value }));
                
            } else {
                throw new Error(`Failed to update ${field}`);
            }
        } catch (err) {
            console.error(`Error updating ${field}:`, err);
            throw new Error(`An error occurred while updating ${field}`);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }


    const formatPrice = (num) => {
        if (!num) return '';
        return `Rp ${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
    };
    
  
    


    return (
        <div className="">
            <Header />
            <div className="">
            <div className="hidden flex-col flex-wrap w-full max-w-[1100px] m-auto mt-[30px] bg-[#FFFFFF] pt-[190px] md:flex">
                <div className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <span className="font-sans font-semibold text-lg">{user.name}</span>
                </div>
                
                    <div className="w-full flex items-center mt-3 border-t-2 border-x-2 border-b-2 rounded-t-xl">

                        <button onClick={handleBio} className={`py-[10px] px-[24px] font-bold ${bio ? 'text-[#194719] border-b-2 border-[#194719]' : 'text-[#6D7588]'}`}>
                            <p>Biodata Diri</p>
                        </button>

                        <button onClick={handleRiwayat} className={`py-[10px] px-[24px] font-bold ${riwayat ? 'text-[#194719] border-b-2 border-[#194719]' : 'text-[#6D7588]'}`}>
                            <p>Riwayat Pesanan</p>
                        </button>

                        <button onClick={handleKeranjang} className={`py-[10px] px-[24px] font-bold ${keranjang ? 'text-[#194719] border-b-2 border-[#194719]' : 'text-[#6D7588]'}`}>
                            <p>Keranjang</p>
                        </button>

                        {user && user.role === 'admin' && (
                            <button onClick={handleTambahProduk} className={`py-[10px] px-[24px] font-bold ${tambahProduk ? 'text-[#194719] border-b-2 border-[#194719]' : 'text-[#6D7588]'}`}>
                                <p>Tambah Produk</p>
                            </button>
                        )}
                        {user && user.role === 'admin' && (
                            <button onClick={handleUbahProduk} className={`py-[10px] px-[24px] font-bold ${produkSaya ? 'text-[#194719] border-b-2 border-[#194719]' : 'text-[#6D7588]'}`}>
                            <p>Produk Saya</p>
                        </button>
                        )}
                        {user && user.role === 'admin' && (
                            <button onClick={handleAkun} className={`py-[10px] px-[24px] font-bold ${akun ? 'text-[#194719] border-b-2 border-[#194719]' : 'text-[#6D7588]'}`}>
                            <p>Pengaturan Akun</p>
                        </button>
                        )}
                        {user && user.role === 'admin' && (
                            <button onClick={handleTransaksi} className={`py-[10px] px-[24px] font-bold ${transaksi ? 'text-[#194719] border-b-2 border-[#194719]' : 'text-[#6D7588]'}`}>
                            <p>Semua Transaksi</p>
                        </button>
                        )}

                    </div>
                    
                    {bio && (
                        <div className="flex border-x-2 border-b-2 p-3">
                            <div className="mt-4 w-full flex p-5 h-screen min-h-[340px]">
                                <ProfilePictureUpload />
                                <div className="mt-4 w-full flex flex-col p-5 h-full min-h-[340px] max-h-[300px]">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        <p className="font-semibold font-sans text-[#6D7588]">Ubah Biodata Diri</p>
                                    </div>
                                    

                                <p className="mt-2 text-base w-full font-sans">
                                    Username : <span className="font-semibold font-sans">{user.name}</span> 
                                    <span
                                        onClick={() => startEditing('name', user.name)}
                                        className="text-xs ml-3 text-[#191719] font-normal cursor-pointer"
                                    >
                                        Ubah
                                    </span>
                                </p>

                                {editingField === 'name' && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 ">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 relative">
                                            
                                            <h2 className="text-xl font-semibold mb-4">Ubah Username</h2>
                                            <div className="absolute top-3 right-2 cursor-pointer hover:bg-[#DEDEDE] rounded-md" onClick={() => setEditingField(null)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                                                placeholder="Enter new username"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full bg-[#194719] text-white px-4 py-2 rounded-md"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-2 text-base w-full font-sans">
                                    Nama Lengkap : <span className="font-sans font-semibold">{user.fullName}</span>
                                    <span 
                                        onClick={() => startEditing('fullName', user.fullName || "")}
                                        className="text-xs ml-3 text-[#194719] font-normal cursor-pointer">
                                        Tambahkan / Ubah
                                    </span>
                                </p>

                                {editingField === 'fullName' && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 relative">
                                            <h2 className="text-xl font-semibold mb-4">Tambah Nama Lengkap</h2>
                                            <div className="absolute top-3 right-2 cursor-pointer hover:bg-[#DEDEDE] rounded-md" onClick={() => setEditingField(null)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                                                placeholder="Enter new full name"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full bg-[#194719] text-white px-4 py-2 rounded-md"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-2 text-base w-full font-sans">
                                    Alamat Lengkap : <span className="font-semibold font-sans">{user.address}</span> 
                                    <span 
                                        onClick={() => startEditing('address', user.address || "")}
                                        className="text-xs ml-3 text-[#194719] font-normal cursor-pointer">
                                        Tambahkan / Ubah
                                    </span>
                                </p>

                                {editingField === 'address' && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 relative">
                                            <h2 className="text-xl font-semibold mb-4">Tambah Alamat Lengkap</h2>
                                            <div className="absolute top-3 right-2 cursor-pointer hover:bg-[#DEDEDE] rounded-md" onClick={() => setEditingField(null)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <textarea
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="border-2 border-gray-300 rounded p-2 w-full mb-4 resize-none h-32 text-sm"
                                                placeholder="Silahkan isi alamat lengkap anda, Nama Jalan, No Rumah, Kode Pos, Kecamatan dan lain-lain."
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full bg-[#194719] text-white px-4 py-2 rounded-md"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}




                                <p className="mt-2 text-base w-full font-sans">
                                    Nomor Telp : <span className="font-semibold font-sans">{user.phoneNumber}</span> 
                                    <span 
                                        onClick={() => startEditing('phoneNumber', user.phoneNumber || "")}
                                        className="text-xs ml-3 text-[#194719] font-normal cursor-pointer">
                                        Tambahkan / Ubah
                                    </span>
                                </p>

                                {editingField === 'phoneNumber' && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 relative">
                                            <h2 className="text-xl font-semibold mb-4">Tambah Nomor Telepon</h2>
                                            <div className="absolute top-3 right-2 cursor-pointer hover:bg-[#DEDEDE] rounded-md" onClick={() => setEditingField(null)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                                                placeholder="Enter Phone Number"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full bg-[#194719] text-white px-4 py-2 rounded-md "
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-2 text-base w-full font-sans">
                                    Email : <span className="font-semibold font-sans">{user?.email || "-"}</span> 
                                    <span 
                                        onClick={() => startEditing('email', user.email || "")}
                                        className="text-xs ml-3 text-[#194719] font-normal cursor-pointer">
                                        Tambahkan / Ubah
                                    </span>
                                </p>

                                {editingField === 'email' && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 relative">
                                            <h2 className="text-xl font-semibold mb-4">Ubah Email</h2>
                                            <div className="absolute top-3 right-2 cursor-pointer hover:bg-[#DEDEDE] rounded-md" onClick={() => setEditingField(null)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                                                placeholder="Enter Email Address"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full bg-[#194719] text-white px-4 py-2 rounded-md"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="mt-2 text-base w-full font-sans">
                                        Password : <span className="font-semibold font-sans">XXXXXX</span>   
                                        <span 
                                            onClick={() => startEditing('password', user.password || "")}
                                            className="text-xs ml-3 text-[#194719] font-normal cursor-pointer">
                                            Ubah
                                        </span>
                                    </p>

                                        {editingField === 'password' && (
                                            <ChangePasswordForm 
                                                userId={user._id} 
                                                editing={() => setEditingField(null)}
                                                />
                                        )}
                                </div>


                                    <div className="mt-auto flex items-end">
                                        <button className="bg-red-500  text-white font-sans cursor-pointer text-sm py-2 px-4 border-2 rounded-md" onClick={logout}>Log Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {riwayat && (
                        <div className="hidden border-x-2 border-b-2 p-3 md:flex">
                            <div className="mt-4 w-full flex flex-col p-5 h-full min-h-[340px]">
                                <OrderHistory />
                            </div>
                        </div>
                    )}


                    {keranjang && (
                        <div className="flex border-x-2 border-b-2 p-3">
                            <div className="mt-4 w-full flex flex-col p-5 h-screen min-h-[340px]">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col justify-center items-center min-h-[500px]">
                                        <img loading="lazy" className="w-full max-w-[250px]" src={LOGO} alt="Forland Living Logo" />
                                        <h2 className="font-medium font-sans text-2xl">Keranjang Anda Kosong</h2>
                                        <p className="font-sans">Silahkan Isi Keranjang Anda.</p>
                                        <Link to={'/'}>
                                            <button className="bg-[#194719] text-white font-sans px-5 py-2 rounded-full mt-4">
                                                Belanja Sekarang!
                                            </button>
                                        </Link>
                                    </div>
                                ) : (
                                    
                                        
                                            <KeranjangCard


                                            />
                                      
                                  
                                )}
                            </div>
                        </div>
                    )}
                <div>
                    {user && user.role === 'admin' && tambahProduk &&(
                        <div className="flex border-x-2 border-b-2 p-3">
                        <div className="mt-4 w-full flex flex-col p-5 h-full  min-h-[1500px]">
                            <TambahProduk />
                        </div>
                        </div>
                    )}
                </div>
                    
                <div className="flex flex-col h-full align-middle justify-center border-x-2">
                    {user && user.role === 'admin' && produkSaya && (
                        <div className="mt-4 w-full flex flex-col p-5 h-full">
                            <div className="flex items-center gap-2 mb-5 pt-5 pb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <h2 className="text-xl font-sans font-medium">Pengaturan Produk</h2>
                            </div>
                            <div>
                                <div className="flex items-center relative">
                                    <input 
                                        type="text" 
                                        placeholder="Cari Nama Produk..." 
                                        value={searchTerm} 
                                        onChange={(e) => setSearchTerm(e.target.value)} 
                                        className="w-full py-2 px-3 mb-3 border-[1px] border-gray-500 rounded-md outline-none font-sans"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>

                                {visibleProducts.map((product) => (
                                    <div key={product._id} className="flex border-gray-500 border-[1px] align-middle vp-4 mb-4 rounded-lg gap-5 p-[20px] mt-10">
                                        <img className="w-full max-w-[100px] h-full min-h-[80px] rounded-md" src={`${API_URL}${product.gambarProduk[0]}`} alt={product.namaProduk} />
                                        
                                        <div className="flex flex-col align-middle justify-center w-full">
                                            <h2 className="text-lg font-medium font-sans mb-1">{product.namaProduk}</h2>
                                            <p className="text-sm text-gray-600 font-sans">{formatPrice(product.hargaProduk)}</p>
                                        </div>
                                        <div className="w-full mx-auto justify-end flex gap-5 align-middle max-h-[100%] m-auto">
                                            <button 
                                                className="rounded-md border-[#194719] bg-[#194719] h-10 px-8 text-white font-sans"
                                                onClick={() => handleEdit(product._id)}
                                            >
                                                Edit Produk
                                            </button>
                                            <button
                                                className="rounded-md border-[#ff3a3a] bg-[#ff3a3a] h-10 px-8 text-white font-sans"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Hapus Produk
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination Controls */}
                                <div className="flex mt-8">
                                    <button 
                                        className={`px-3 py-1 border rounded-md font-sans ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#194719] text-white'}`} 
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        Sebelumnya
                                    </button>
                                    <span className="px-3 py-1">
                                        {currentPage} of {totalPages}
                                    </span>
                                    <button 
                                        className={`px-3 py-1 border rounded-md font-sans ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#194719] text-white'}`} 
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        Selanjutnya
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                
                    {user && user.role === 'admin' && akun && (
                        <div className="flex flex-col border-x-2 border-b-2 p-3">
                            <div className='flex items-center mb-5 pl-5 pt-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <h2 className='text-xl font-sans font-medium'>Admin Settings</h2>
                            </div>
                            <div className="p-5">
                                <div className="flex flex-col">
                                    <AdminList />
                                </div>
                            </div>
                            <div className="mt-4 w-full flex flex-col p-5 h-screen  min-h-[1500px]">
                                <AccountSettings />
                            </div>
                        </div>
                    )}


                    {user && user.role === 'admin' && transaksi && (
                        <div className="flex border-x-2 border-b-2 p-3">
                        <div className="mt-4 w-full flex flex-col p-5 h-full min-h-[340px]">
                            <AdminOrderHistory />
                        </div>
                    </div>
                    )}


            </div>
                     

            </div>


            <MobileTab />
        </div>
        
    )
}