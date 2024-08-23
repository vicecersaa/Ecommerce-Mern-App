import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
          password,
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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gray-50">
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-gray-50 rounded-lg p-6 sm:p-10">
        {loading && <LoadingSpinner />}
        <div className="flex flex-col mb-3 w-full text-center">
          <p className="font-sans text-black font-semibold text-2xl sm:text-3xl mb-1">
            Register <span className="text-[#194719]">Forland Living</span>
          </p>
          <span className="text-xs sm:text-sm font-sans">Menyempurnakan Tidur Anda dengan Springbed Berkualitas.</span>
        </div>
        <form className="flex flex-col w-full" onSubmit={registerUser}>
          <input
            className="py-2 px-4 mb-4 sm:mb-5 rounded-md border border-slate-500 font-sans text-sm focus:outline-none"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="py-2 px-4 mb-4 sm:mb-5 rounded-md border border-slate-500 font-sans text-sm focus:outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="py-2 px-4 mb-4 sm:mb-5 rounded-md border border-slate-500 font-sans text-sm focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-[#194719] rounded-md py-2 sm:py-3 text-white font-sans font-bold text-sm sm:text-[16px] hover:cursor-pointer">
            Create An Account
          </button>
        </form>
        <p className="text-center font-sans text-sm sm:text-[14px] mt-4">
          Sudah Punya Akun?{' '}
          <Link to={'/login'} className="text-[#194719]">
            Masuk
          </Link>
        </p>
        <div className="w-full mt-4">
          {successMessage && (
            <div className="bg-green-100 border-green-400 text-green-700 text-center font-sans text-sm p-3 rounded-lg">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 text-center font-sans text-sm p-3 rounded-lg mt-3">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
