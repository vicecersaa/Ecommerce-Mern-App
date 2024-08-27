import ChangePasswordForm from "./ChangePasswordForm"
import ProfilePictureUpload from "./ProfilePictureUpload"
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";



export default function MobileAccount() {

    const {user, setUser} = useContext(UserContext);
    const [bio, setBio] = useState(true);
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');

    

    const navigate = useNavigate();

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

    return (
    <>
        {bio && (
            <div className="flex pt-[75px]">
                <div className="w-full flex flex-col items-center p-5 justify-center md:hidden">
                    <div className="w-full flex justify-center">
                        <ProfilePictureUpload />
                    </div>
                    <div className="w-full flex flex-col h-full mt-5">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <p className="font-semibold font-sans text-[#6D7588]">Ubah Biodata Diri</p>
                        </div>
                        

                    <p className="mt-5 text-base w-full font-sans">
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
                        Alamat Lengkap : 
                        <br />
                        <span className="font-semibold font-sans">{user.address}</span> 
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
                            <button className="bg-red-500  text-white font-sans cursor-pointer text-sm py-2 px-4 border-2 rounded-md mt-4" onClick={logout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
     </>   
    )
}