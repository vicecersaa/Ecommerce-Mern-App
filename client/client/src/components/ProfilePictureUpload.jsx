import React, { useState, useContext } from 'react';
import axios from 'axios';
import BLANKPROFILE from '../assets/img/blank.png';
import { UserContext } from "../UserContext";

const ProfilePictureUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('No file selected');
      return;
    }
  
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('image', file));
  
    try {
      const response = await axios.post('http://localhost:5000/upload-profilePicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Ensure cookies are sent with the request
      });
  
      console.log('Upload success:', response.data);
  
      // Assuming response.data.profilePicture contains the array of image URLs
      setUser(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
  
      // Optional: Update state after context update to reflect changes
      console.log('Updated Profile Pictures:', response.data.profilePicture);
  
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="w-full max-w-[250px] h-full max-h-[300px] flex flex-col justify-center items-center mt-4 mb-4 border-[#E4EBF5] border-2 p-5 rounded-xl shadow-xl">
    {user.profilePicture.length > 0 ? (
        user.profilePicture.map((url, index) => {
            console.log('Image URL:', url); // Debug URL
            return (
            <img
                key={index}
                className="w-full max-w-[250px] my-2"
                src={`http://localhost:5000${user.profilePicture[0]}`}
                alt={`Profile ${index}`}
                id="profileImage"
            />
            );
        })
) : (
  <img className="w-full max-w-[250px]" src={BLANKPROFILE} alt="Profile" id="profileImage" />
)}
    <label
      htmlFor="uploadPhoto"
      className="w-full max-w-[250px] mt-3 border-[#E4EBF5] border-2 py-2 px-3 rounded-lg text-sm font-bold text-center cursor-pointer"
    >
      Pilih Foto
    </label>
    <input
      id="uploadPhoto"
      type="file"
      accept="image/*"
      multiple
      onChange={handleFileChange}
      className="hidden"
    />
    {selectedFiles && selectedFiles.length > 0 && (
      <button
        onClick={handleUpload}
        className="w-full max-w-[250px] mt-3 border-[#E4EBF5] border-2 py-2 px-3 rounded-lg text-sm font-bold text-center cursor-pointer"
      >
        Upload Foto
      </button>
    )}
  </div>
  );
};

export default ProfilePictureUpload;
