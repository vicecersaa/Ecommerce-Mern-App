import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';



export default function RegisterPage() {

    // username state
    const [name, setName] = useState('')
    // email state
    const [email, setEmail] = useState('')
    // password state
    const [password, setPassword] = useState('')
    // loading state
    const [loading, setLoading] = useState(false);

    // Register Account
    async function registerUser(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
        try {
            await axios.post('http://localhost:5000/register', {
            name,
            email,
            password
            });
        } catch (e) {
            alert('Regristration failed, please try again.')
        } finally {
            setLoading(false);
        }
    }, 5000) 
}

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='flex flex-col justify-start align-center  m-auto'>
            {loading && <LoadingSpinner />}
                <div className='flex flex-col mb-3'>
                    <p className='font-sans text-black font-semibold text-3xl text-center mb-1'>Register Forland Living</p>
                    <span className='text-center text-xs font-sans'>Menyempurnakan Tidur Anda dengan Springbed Berkualitas.</span>
                </div>
                <div className='flex flex-col'>
                    
                    <form className="flex flex-col p-5" onSubmit={registerUser}>
                    
                        <input 
                            className="py-2 px-4 mb-5 rounded-md border-[1px] border-slate-500 font-sans text-[16px] focus:outline-none" 
                            type="text" placeholder='Username' 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />

                        <input 
                            className="py-2 px-4 mb-5 rounded-md border-[1px] border-slate-500 font-sans text-[16px] focus:outline-none" 
                            type="email" placeholder='Email'  
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input 
                            className="py-2 px-4 mb-5 rounded-md border-[1px] border-slate-500 font-sans text-[16px] focus:outline-none" 
                            type="password" placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button className='w-full bg-[#000000] rounded-md py-3 px-4 text-white font-sans font-bold text-[16px] hover:cursor-pointer'>Create An Account</button>
                    </form>

                    <p className='text-center font-sans text-[14px]'>Sudah Punya Akun? <Link to={'/login'} className="text-[#1A4D2E]" href="">Masuk</Link></p>   
                    
                </div>
                <div className='absolute bottom-0 w-full max-w-[322px] m-auto mb-4'>
                        <p className='font-sans text-sm text-gray-500 text-center'>Forland Living Since 2020</p>
                </div>
            </div>
        </div>
    )
}