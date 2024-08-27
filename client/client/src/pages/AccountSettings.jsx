import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AccountSettings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleAdminRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/register-admin`, { name, email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className="p-[20px] border-[1px] border-gray-500 rounded-lg z-10 shadow-md">
            <h3 className='text-lg font-base mb-7'>Create New Admin :</h3>
            <form onSubmit={handleAdminRegister}>
                <div className='flex align-middle mt-5'>
                    <label className="w-full max-w-[150px] font-sans">Username :</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none'/>
                </div>
                <div className='flex align-middle mt-5'>
                    <label className='w-full max-w-[150px]'>Email :</label>
                    <input className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='flex align-middle mt-5'>
                    <label className='w-full max-w-[150px]'>Password :</label>
                    <input className='w-full border-[1px] border-slate-500 rounded-md px-3 py-2 text-sm focus: outline-none' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className="w-full bg-[#194719] py-2 mt-5 text-white rounded-md" type="submit">Create Admin</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AccountSettings;