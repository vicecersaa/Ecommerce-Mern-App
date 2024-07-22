import React from 'react';
import FORLANDLOGO from '../assets/img/LOGO1.png';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-24 h-24">
        <img
          src={FORLANDLOGO}
          alt="Forland Living"
          className="w-full h-full animate-bounce"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;