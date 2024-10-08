import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_URL } from '../config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');  
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    setTimeout(async () => {
      try {
        const { data } = await axios.post(`${API_URL}/login`, { email, password });
        setUser(data);
        setRedirect(true);
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          setErrorMessage(e.response.data.message);
        } else {
          setErrorMessage('Login failed, please try again.');
        }
      } finally {
        setLoading(false);
      }
    }, 6000);
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center sm:p-8 bg-white p-[16px]">
      <div className="bg-white rounded-lg p-6 sm:p-10 max-w-md w-full">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex flex-col mb-3">
              <p className="font-sans text-black font-semibold text-2xl sm:text-3xl text-center mb-1">
                Welcome to <span className="text-[#194719]">Forland Living</span>
              </p>
              <span className="text-center text-xs sm:text-sm font-sans">
                Menyempurnakan Tidur Anda dengan Springbed Berkualitas.
              </span>
            </div>
            <div className="flex flex-col">
              <form className="flex flex-col p-2 sm:p-5" onSubmit={handleLoginSubmit}>
                <input
                  className="py-2 px-4 mb-4 sm:mb-5 rounded-md border-[1px] border-slate-500 font-sans text-sm sm:text-[16px] focus:outline-none"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <input
                  className="py-2 px-4 mb-4 sm:mb-5 rounded-md border-[1px] border-slate-500 font-sans text-sm sm:text-[16px] focus:outline-none"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button className="w-full bg-[#194719] rounded-md py-2 sm:py-3 px-4 text-white font-sans font-bold text-sm sm:text-[16px] hover:cursor-pointer">
                  Login
                </button>
              </form>

              <p className="text-center font-sans text-sm sm:text-[14px]">
                <Link to={'/forgot-password'} className="">
                  Lupa Password?
                </Link>
              </p>
              <p className="text-center font-sans text-sm sm:text-[14px]">
                Tidak mempunyai akun?{' '}
                <Link to={'/register'} className="text-[#194719]">
                  Daftar
                </Link>
              </p>
              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-center mt-3">
                  {errorMessage}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
