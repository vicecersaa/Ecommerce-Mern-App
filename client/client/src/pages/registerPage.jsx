import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';



export default function RegisterPage() {
    
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


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
        setErrorMessage('');  
        setSuccessMessage('');  

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password harus memiliki minimal 8 karakter, mengandung setidaknya satu huruf besar dan satu angka.');
            setLoading(false);
            return;
        }

        setTimeout(async () => {
            try {
                await axios.post('http://localhost:5000/register', {
                    name,
                    email,
                    password
                });

            
                setSuccessMessage('Registrasi berhasil! Silakan masuk dengan akun Anda.');

            } catch (e) {
                if (e.response && e.response.data && e.response.data.message) {
                    setErrorMessage(e.response.data.message);
                } else {
                    setErrorMessage('Registration failed, please try again.');
                }
            } finally {
                setLoading(false);
            }
        }, 5000); 
    }




    return (
        <div className='min-h-screen flex items-center justify-center'>
        <div className='flex flex-col justify-start align-center  m-auto w-full'>
            {loading && <LoadingSpinner />}
           
            <div className='flex flex-col mb-3 w-full max-w-[320px] mx-auto'>
                <p className='font-sans text-black font-semibold text-3xl text-center mb-1'>Register <span className='text-[#194719]'>Forland Living</span></p>
                <span className='text-center text-xs font-sans'>Menyempurnakan Tidur Anda dengan Springbed Berkualitas.</span>
            </div>
            <div className='flex flex-col w-full max-w-[320px] mx-auto'>
                
                <form className="flex flex-col p-5" onSubmit={registerUser}>
                
                    <input 
                        className="py-2 px-4  mb-5 rounded-md border-[1px] border-slate-500 font-sans text-sm focus:outline-none" 
                        type="text" placeholder='Username' 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        className="py-2 px-4 mb-5 rounded-md border-[1px] border-slate-500 font-sans text-sm focus:outline-none" 
                        type="email" placeholder='Email'  
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        className="py-2 px-4 mb-5 rounded-md border-[1px] border-slate-500 font-sans text-sm focus:outline-none" 
                        type="password" placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className='w-full bg-[#194719] rounded-md py-3 px-4 text-white font-sans font-bold text-[16px] hover:cursor-pointer'>Create An Account</button>
                </form>

                <p className='text-center font-sans text-[14px]'>Sudah Punya Akun? <Link to={'/login'} className="text-[#194719]" href="">Masuk</Link></p>          
            </div>
            <div className='w-full mx-auto'>
                {successMessage && (
                        <div className="bg-green-100 border-green-400 text-green-700 text-center font-sans text-sm mt-4 w-full max-w-[370px] mx-auto px-4 py-3">{successMessage}</div>
                    )}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5 font-sans text-center text-sm mt-4 w-full max-w-[300px] mx-auto" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
            </div>

        </div>
    </div>
    )
}