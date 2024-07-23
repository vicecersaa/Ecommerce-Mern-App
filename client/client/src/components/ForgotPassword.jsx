import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/forgot-password', { email });
      setMessage(data.message);
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred';
      setError(errorMessage);    
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleForgotPassword}>
        <h2 className="text-2xl font-sans font-semibold mb-4 text-center">Forgot Password</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="py-2 px-4 mb-4 border border-slate-500 rounded-md w-full focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
