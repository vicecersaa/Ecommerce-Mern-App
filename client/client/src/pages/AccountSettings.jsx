import React, { useState } from 'react';
import axios from 'axios';

const AccountSettings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleAdminRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register-admin', { name, email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className="admin-section">
            <h2 className='text-4xl font-sans font-bold mb-10'>Admin Settings</h2>
            <form onSubmit={handleAdminRegister}>
                <div className='flex align-middle mt-5'>
                    <label className="w-full max-w-[150px]">Username :</label>
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
                <button className="w-full bg-slate-500 py-2 mt-5 text-white rounded-md" type="submit">Create Admin</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AccountSettings;