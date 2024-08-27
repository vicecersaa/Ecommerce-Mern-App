import React, { useState, useContext } from 'react';
import axios from 'axios';
import BLANKPROFILE from '../assets/img/blank.png';
import { UserContext } from "../UserContext";
import { API_URL } from '../config';

const ProfilePictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null); 
  const { user, setUser } = useContext(UserContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      const response = await axios.post(`${API_URL}/upload-profilePicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });
  
      
  
      setUser(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
  
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='p-5'>
      <div className="w-full min-w-[250px] h-full max-h-[300px] hidden md:flex flex-col justify-center items-center mt-4 mb-4 border-[#E4EBF5] border-2 p-5 rounded-xl shadow-xl">
        {user.profilePicture ? (
          <img
            className="w-full max-w-[150px] my-2"
            src={`${API_URL}${user.profilePicture}`}
            alt="Profile"
            id="profileImage"
          />
        ) : (
          <img className="w-full max-w-[250px]" src={BLANKPROFILE} alt="Profile" id="profileImage" />
        )}
        <label
          htmlFor="uploadPhoto"
          className="w-full max-w-[250px] mt-3 border-[#E4EBF5] border-2 py-2 px-3 rounded-lg text-sm font-bold text-center cursor-pointer"
        >
          {user.profilePicture ? "Ubah Foto" : "Pilih Foto"}
        </label>
        <input
          id="uploadPhoto"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {selectedFile &&  (
          <button
            onClick={handleUpload}
            className="w-full max-w-[250px] mt-3 border-[#E4EBF5] border-2 py-2 px-3 rounded-lg text-sm font-bold text-center cursor-pointer"
          >
            Upload Foto
          </button>
        )}
      </div>
      
      <div className="w-full max-w-[150px] flex md:hidden flex-col justify-center items-center">
        {user.profilePicture ? (
          <img
            className="w-[80px] h-[80px] rounded-full object-cover"
            src={`${API_URL}${user.profilePicture}`}
            alt="Profile"
            id="profileImage"
          />
        ) : (
          <img className="w-full max-w-[80px] h-[80px] rounded-full object-fill" src={BLANKPROFILE} alt="Profile" id="profileImage" />
        )}
        <label
          htmlFor="uploadPhoto"
          className="w-full max-w-[150px] mt-3 border-[#E4EBF5] border-2 py-2 px-3 rounded-lg text-sm font-bold text-center cursor-pointer"
        >
          {user.profilePicture ? "Ubah" : "Tambah Foto"}
        </label>
        <input
          id="uploadPhoto"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {selectedFile &&  (
          <button
            onClick={handleUpload}
            className="w-full max-w-[250px] mt-3 border-[#E4EBF5] border-2 py-2 px-3 rounded-lg text-sm font-bold text-center cursor-pointer"
          >
            Upload Foto
          </button>
        )}
      </div>
    </div>

  );
};

export default ProfilePictureUpload;
