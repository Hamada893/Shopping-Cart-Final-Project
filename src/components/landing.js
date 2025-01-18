import React from 'react';
import Test from '../assets/images/Test.jpg';
import Home from '../pages/home';

const Landing = () => {
  return (
    <div className="relative w-full h-screen">
      <img src={Test} alt="Company Background" className="w-full h-full object-cover rounded-2xl" />
      
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 py-5">🌱 Sproutify 🌱</h1>
        <p className="text-lg max-w-md">
        At Sproutify ☘️, discover a wide range of vibrant, hand-picked plants 🪴 delivered right to your doorstep. Whether you're a seasoned plant parent 🌵 or just starting your green journey, we've got the perfect greenery to brighten your space and elevate your mood. 🌷 
        </p>
        <button
            onClick={() => document.getElementById('product-listing').scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-600 p-2 rounded-md text-sm hover:bg-gray-400"
          >
            Get Started
          </button>
      </div>
    </div>
  );
};

export default Landing;
