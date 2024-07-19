import { UserContext } from "../UserContext";
import Header from "../components/header";
import { useContext, useState, useEffect } from "react";
import BLANKSQUARE from '../assets/img/blankPicture.png';
import TambahProduk from "../components/TambahProduk";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import ChangePasswordForm from '../components/ChangePasswordForm';
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import KeranjangCard from '../components/KeranjangCard';
import OrderHistory from '../components/OrderHistory';
import AccountSettings from '../pages/AccountSettings';
import { ProductContext} from '../ProductContext';



export default function AccountPage() {

    // data profile
    const {user, setUser} = useContext(UserContext);
    // bio state 
    const [bio, setBio] = useState(true);
    // riwayat state
    const [riwayat, setRiwayat] = useState(false);
    // keranjang state
    const [keranjang, setKeranjang] = useState(false);
    // tambah produk state
    const [tambahProduk, setTambahProduk] = useState(false);
    // set akun state
    const [akun, setAkun] = useState(false);
    // ubah produk state
    const [produkSaya, setProdukSaya] = useState(false);
     const [editingField, setEditingField] = useState(null);
     const [editValue, setEditValue] = useState('');
     const [cart, setCart] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { products, setProducts } = useContext(ProductContext);

    const handleEdit = (id) => {
        navigate(`/account/product-edit/${id}`);
    };

    
    const PORT = 'http://localhost:5000'

        
        // ADD TO CART
        useEffect(() => {
            const fetchCart = async () => {
              // Cek apakah user ada dan user._id tersedia
              if (!user || !user._id) {
                console.error('User ID is not available');
                return;
              }
          
              try {
                const response = await axios.get(`${PORT}/get-cart`, {
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
          
            // Hanya panggil fetchCart jika user dan user._id tersedia
            if (user && user._id) {
              fetchCart();
            }
          }, [user]); 
    

    if (!user) {
        return <div>Loading...</div>;
    }

    // logout
    async function logout() {
        try {
            const response = await axios.post(`${PORT}/logout`, null, { withCredentials: true });
            console.log('Logout response:', response);
            
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
            console.error('Error response:', error.response);
        }
    }

    // ubah ke section bio
    function handleBio() {
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setAkun(false);
        setBio(true);
    }

    //ubah ke section riwayat pesanan
    function handleRiwayat() {
        setBio(false);
        setKeranjang(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setAkun(false);
        setRiwayat(true);
    }

    //ubah ke section keranjang
    function handleKeranjang() {
        setBio(false);
        setRiwayat(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setAkun(false);
        setKeranjang(true);
    }

    //ubah ke section tambah produk
    function handleTambahProduk() {
        setBio(false)
        setRiwayat(false);
        setKeranjang(false);
        setProdukSaya(false);
        setAkun(false);
        setTambahProduk(true);
    }

    function handleUbahProduk() {
        setBio(false)
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(false);
        setAkun(false);
        setProdukSaya(true);
    }

    function handleAkun() {
        setBio(false)
        setRiwayat(false);
        setKeranjang(false);
        setTambahProduk(false);
        setProdukSaya(false);
        setAkun(true);
    }


    const startEditing = (field, currentValue) => {
        setEditValue(currentValue); // Set initial value for the field
        setEditingField(field); // Set field to be edited
    };

    const handleSave = async () => {
        if (editingField) {
            try {
                console.log("Saving", editingField, editValue);
                await handleEditProfile(editingField, editValue);
                setEditingField(null); // Close the form after saving
                setEditValue(''); // Clear the edit value
            } catch (err) {
                console.error(`Failed to update ${editingField}:`, err);
            }
        }
    };

      // delete product
      const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:5000/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    // Successfully deleted, update the context
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
    


     // Edit profile handler
     const handleEditProfile = async (field, value) => {
        try {
            const response = await axios.patch(`${PORT}/profile/update-profile/${user._id}`, { [field]: value }, { withCredentials: true });
            if (response.status === 200) {
                setUser(prevUser => ({ ...prevUser, [field]: value }));
                console.log(`${field} updated successfully`);
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
                        {user && user.role === 'admin' && (
                            <button onClick={handleTambahProduk} className={`py-[10px] px-[24px] font-bold ${tambahProduk ? 'text-[#03AC0E] border-b-2 border-[#03AC0E]' : 'text-[#6D7588]'}`}>
                                <p>Tambah Produk</p>
                            </button>
                        )}
                        {user && user.role === 'admin' && (
                            <button onClick={handleUbahProduk} className={`py-[10px] px-[24px] font-bold ${produkSaya ? 'text-[#03AC0E] border-b-2 border-[#03AC0E]' : 'text-[#6D7588]'}`}>
                            <p>Produk Saya</p>
                        </button>
                        )}
                        {user && user.role === 'admin' && (
                            <button onClick={handleAkun} className={`py-[10px] px-[24px] font-bold ${akun ? 'text-[#03AC0E] border-b-2 border-[#03AC0E]' : 'text-[#6D7588]'}`}>
                            <p>Pengaturan Akun</p>
                        </button>
                        )}

                    </div>
                    
                    {bio && (
                        <div className="flex border-x-2 border-b-2 p-3">
                            <div className="mt-4 w-full flex p-5 h-screen min-h-[340px]">
                                <ProfilePictureUpload />
                                <div className="mt-4 w-full flex flex-col p-5 h-full min-h-[340px] max-h-[300px]">
                                    <p className="font-bold text-[#6D7588]">Ubah Biodata Diri</p>

                                <p className="mt-2 text-base w-full font-semibold">
                                    Username : {user.name} 
                                    <span
                                        onClick={() => startEditing('name', user.name)}
                                        className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer"
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
                                                    className="w-full bg-[#03AC0E] text-white px-4 py-2 rounded-md hover:bg-[#029c00]"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-2 text-base w-full font-semibold">
                                    Nama Lengkap : {user.fullName} 
                                    <span 
                                        onClick={() => startEditing('fullName', user.fullName || "")}
                                        className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">
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
                                                    className="w-full bg-[#03AC0E] text-white px-4 py-2 rounded-md hover:bg-[#029c00]"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-2 text-base w-full font-semibold">
                                    Alamat Lengkap : {user.address} 
                                    <span 
                                        onClick={() => startEditing('address', user.address || "")}
                                        className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">
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
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                                                placeholder="Enter full address"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full bg-[#03AC0E] text-white px-4 py-2 rounded-md hover:bg-[#029c00]"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}



                                <p className="mt-2 text-base w-full font-semibold">
                                    Nomor Telp : {user.phoneNumber} 
                                    <span 
                                        onClick={() => startEditing('phoneNumber', user.phoneNumber || "")}
                                        className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">
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
                                                    className="w-full bg-[#03AC0E] text-white px-4 py-2 rounded-md hover:bg-[#029c00]"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-2 text-base w-full font-semibold">
                                    Email : {user?.email || "-"} 
                                    <span 
                                        onClick={() => startEditing('email', user.email || "")}
                                        className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">
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
                                                    className="w-full bg-[#03AC0E] text-white px-4 py-2 rounded-md hover:bg-[#029c00]"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="mt-2 text-base w-full font-semibold">
                                        Password : XXXXXX   
                                        <span 
                                            onClick={() => startEditing('password', user.password || "")}
                                            className="text-xs ml-3 text-[#03AC0E] font-normal cursor-pointer">
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
                                        <button className="bg-red-500  text-white font-sans font-semibold cursor-pointer text-sm py-2 px-4 border-2 rounded-md" onClick={logout}>Log Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {riwayat && (
                        <div>
                            <OrderHistory />
                        </div>
                    )}


                    {keranjang && (
                        <div className="flex border-x-2 border-b-2 p-3">
                            <div className="mt-4 w-full flex flex-col p-5 h-screen min-h-[340px]">
                                {cart.length === 0 ? (
                                    <p>Your cart is empty</p>
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
                        <div className="mt-4 w-full flex flex-col p-5 h-screen  min-h-[1500px]">
                            <TambahProduk />
                        </div>
                        </div>
                    )}
                </div>
                    
                <div>
                    {user && user.role === 'admin' && produkSaya && (
                        <div>
                            {products.map((product) => (
                                <div key={product._id} className="product-item border p-4 mb-4 rounded-lg shadow-lg">
                                    <img src={`http://localhost:5000${product.gambarProduk[0]}`} alt="" />
                                    <h2 className="text-lg font-bold">{product.namaProduk}</h2>
                                    <p className="text-sm text-gray-600">Harga: {product.hargaProduk}</p>
                                    <button 
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={() => handleEdit(product._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    {user && user.role === 'admin' && akun && (
                        <AccountSettings />
                    )}
                </div>


            </div>
        </div>
    )
}