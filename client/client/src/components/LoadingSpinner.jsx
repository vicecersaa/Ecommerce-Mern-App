import React from 'react';
import FORLANDLOGO from '../assets/img/LOGO1.jpg';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-24 h-24">
        <img
          src={FORLANDLOGO}
          alt="Forland Living"
          loading='lazy'
          className="w-full h-full animate-bounce"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;