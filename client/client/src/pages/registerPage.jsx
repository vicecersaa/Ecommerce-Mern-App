import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function RegisterPage() {

    // username state
    const [name, setName] = useState('')
    // email state
    const [email, setEmail] = useState('')
    // password state
    const [password, setPassword] = useState('')

    // Register Account
    async function registerUser(e) {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/register', {
        name,
        email,
        password
        });
        alert("Registration successful!");
    } catch (e) {
        alert('Regristration failed, please try again.')
    }
    
}

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='flex flex-col justify-start align-center  m-auto  w-full max-w-[400px] h-[470px] bg-slate-100 rounded-xl '>
                <div className='flex justify-end mt-3 mr-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className='flex'>
                    <p className='font-sans text-black font-bold text-4xl p-8'>Register</p>
                </div>
                <div className='flex flex-col'>
                    
                    <form className="flex flex-col p-5" onSubmit={registerUser}>
                    
                        <input 
                            className="py-3 px-4 mb-8 rounded-md font-sans text-[16px]" 
                            type="text" placeholder='Username' 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />

                        <input 
                            className="py-3 px-4 mb-8 rounded-md font-sans text-[16px]" 
                            type="email" placeholder='Email'  
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input 
                            className="py-3 px-4 mb-8 rounded-md font-sans text-[16px]" 
                            type="password" placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button className='w-full bg-[#03AC0E] rounded-xl py-3 px-4 text-white font-bold text-[16px] hover:cursor-pointer'>Create An Account</button>
                    </form>

                    <p className='text-center font-sans text-[14px]'>Already have an account? <Link to={'/login'} className="text-[#03AC0E]" href="">Sign in</Link></p>   
                    
                </div>
            </div>
        </div>
    )
}