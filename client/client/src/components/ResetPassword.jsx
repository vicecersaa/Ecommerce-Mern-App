import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    try {
      const { data } = await axios.post('http://localhost:5000/reset-password', { token, newPassword });
      setMessage(data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.error);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleResetPassword}>
        <h2 className="text-2xl font-sans font-semibold mb-4 text-center">Reset Password</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="password"
          placeholder="New Password"
          className="py-2 px-4 mb-4 border border-gray-300 rounded w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
