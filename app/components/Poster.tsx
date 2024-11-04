import Image from 'next/image';
import React from 'react';

const Poster = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center h-auto bg-gradient-to-r from-blue-200 to-blue-500 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 overflow-hidden p-4 md:p-8 space-y-6 md:space-y-0 md:space-x-10">
      
      {/* Discount Badge */}
      <div className="absolute top-5 left-5 bg-yellow-400 text-white font-bold py-1 px-3 rounded-full animate-bounce shadow-md">
        40% OFF
      </div>

      {/* Image Section */}
      <div className="opacity-0 transition-opacity duration-1000 delay-300 animate-fadeInLeft">
        <Image
          height={500}
          width={500}
          priority
          src="/fridgee.png"
          alt="Energy Efficient Refrigerator"
          className="w-[150px] h-[200px] md:w-[200px] md:h-[300px] lg:w-[250px] lg:h-[350px] rounded-lg shadow-lg"
        />
      </div>

      {/* Text and Button Section */}
      <div className="relative hidden md:block z-10 bg-white/70 dark:bg-gray-700/70 p-5 md:p-8 rounded-lg shadow-md opacity-0 transition-opacity duration-1000 delay-500 animate-fadeInUp text-center md:text-left max-w-sm md:max-w-md">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold uppercase dark:text-gray-100 text-gray-800">
          Save Energy, Save Money!
        </h1>
        <p className="mt-3 text-base md:text-lg lg:text-xl dark:text-gray-200 text-gray-700">
          Get <span className="font-semibold text-green-600">40% OFF</span> on<br /> 
          Energy-Efficient Refrigerators Today!
        </p>
        <h2 className="mt-4 text-lg md:text-xl lg:text-2xl font-bold uppercase dark:text-gray-100 text-gray-800">
          from ₹7999
        </h2>

        {/* Call-to-Action Button */}
        <button className="mt-5 px-4 py-2 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-all duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Poster;
