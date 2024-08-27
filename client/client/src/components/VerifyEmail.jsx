import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/verify-email`, { params: { token } });
        
        setMessage(data.message);
      } catch (error) {
        setMessage('Verification failed');
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;