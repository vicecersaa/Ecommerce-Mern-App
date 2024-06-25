import React, { useContext, useState } from 'react';
import GOOGLE from '../assets/img/google.png';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';



export default function LoginPage() {

    // Port 
    const PORT = 'http://localhost:5000'
    // Email Input
    const [email, setEmail] = useState('');
    // Password Input
    const [password, setPassword] = useState('');
    // Redirect State
    const [redirect, setRedirect] = useState(false);
    const {setUser} =  useContext(UserContext);
    // Login Account 
    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${PORT}/login`, {email,password});
            setUser(data);
            alert('Login Successful');
            setRedirect(true);
        } catch (e) {
            alert('Login Failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
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
                    <p className='font-sans text-black font-bold text-4xl p-8'>Login</p>
                </div>
                <div className='flex flex-col'>
                    <form className="flex flex-col p-5" onSubmit={handleLoginSubmit}>

                        <input 
                            className="py-3 px-4 mb-5 rounded-md font-sans text-[16px]" type="email" placeholder='Email'  
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input 
                            className="py-3 px-4 mb-5 rounded-md font-sans text-[16px]" type="text" placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button className='w-full bg-[#03AC0E] rounded-xl py-3 px-4 text-white font-bold text-[16px] hover:cursor-pointer'>Login</button>

                    </form>
                    <p className='text-center font-sans text-[14px]'>Don't have an account? <Link to={'/register'} className="text-[#03AC0E]" href="">Register</Link></p>
                    
                    <div className='flex items-center w-full max-w-[350px] m-auto mt-[20px]'>
                    <hr class="w-full my-6 border-gray-400 mr-5" />
                    <p className='w-full text-center font-sans text-[14px]'>or login with <hr /></p> 
                    <hr class="w-full my-6 border-gray-400 ml-5" />
                    </div>
                    
                    <div className='flex text-center justify-center items-center gap-4 w-full max-w-[350px] m-auto mt-4 border-[1px] bg-white py-3 px-6 rounded-md'>
                        <img className="w-full max-w-[24px]" src={GOOGLE} alt="Google" />
                        <p className='font-sans text-[14px]'>Google</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}