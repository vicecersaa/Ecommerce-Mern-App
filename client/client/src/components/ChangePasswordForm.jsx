import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/change-password', {
                oldPassword,
                newPassword
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setSuccess('Password updated successfully');
                setError('');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
            setSuccess('');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 relative">
                <h2 className="text-xl font-semibold mb-4">Ubah Password</h2>
                <div className="absolute top-3 right-2 cursor-pointer hover:bg-[#DEDEDE] rounded-md p-1" onClick={props.editing}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                    placeholder="Password Lama"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                    placeholder="Password Baru"
                />
                <button
                    onClick={handleChangePassword}
                    className="w-full bg-[#03AC0E] text-white px-4 py-2 rounded-md hover:bg-[#029c00]"
                >
                    Simpan
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </div>
        </div>
    );
};

export default ChangePasswordForm;