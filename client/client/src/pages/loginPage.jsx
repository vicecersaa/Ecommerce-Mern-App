import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LoginPage() {
  // Port
  const PORT = 'http://localhost:5000';
  // Email Input
  const [email, setEmail] = useState('');
  // Password Input
  const [password, setPassword] = useState('');
  // Redirect State
  const [redirect, setRedirect] = useState(false);
  // Loading State
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  // Login Account
  async function handleLoginSubmit(e) {
    e.preventDefault();

    // Validate input
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const { data } = await axios.post(`${PORT}/login`, { email, password });
        setUser(data);
        setRedirect(true);
      } catch (e) {
        console.error('Login Failed', e);
        alert('Login Failed');
      } finally {
        setLoading(false);
      }
    }, 6000);
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col justify-start align-center m-auto'>
        {loading && <LoadingSpinner />}
        <div className='flex flex-col mb-3'>
          <p className='font-sans text-black font-semibold text-3xl text-center mb-1'>Welcome to Forland Living</p>
          <span className='text-center text-xs font-sans'>Menyempurnakan Tidur Anda dengan Springbed Berkualitas.</span>
        </div>
        <div className='flex flex-col'>
          <form className="flex flex-col p-5" onSubmit={handleLoginSubmit}>
            <input
              className="py-2 px-4 mb-5 rounded-md border-[1px] border-slate-500 font-sans text-[16px] focus:outline-none"
              type="email"
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="py-2 px-4 mb-5 rounded-md border-[1px] border-slate-500 font-sans text-[16px] focus:outline-none"
              type="password"
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className='w-full bg-[#000000] rounded-md py-3 px-4 text-white font-sans font-bold text-[16px] hover:cursor-pointer'>Login</button>
          </form>
          <p className='text-center font-sans text-[14px]'>
            <Link to={'/forgot-password'} className="">Lupa Password?</Link>
          </p>
          <p className='text-center font-sans text-[14px]'>
            Tidak mempunyai akun? <Link to={'/register'} className="text-[#1A4D2E]">Daftar</Link>
          </p>
        </div>
        <div className='absolute bottom-0 w-full max-w-[357px] m-auto mb-4'>
          <p className='font-sans text-sm text-gray-500 text-center'>Forland Living Since 2020</p>
        </div>
      </div>
    </div>
  );
}
