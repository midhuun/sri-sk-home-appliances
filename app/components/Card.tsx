import Image from 'next/image';
import React from 'react';

const Card = () => {
  return (
    <div className='flex justify-center md:justify-start flex-wrap gap-3'>
      <div className="flex flex-col h-[300px] w-[280px] hover:border border-black dark:border-white  overflow-hidden  relative group">
        <div className='relative bg-white dark:bg-black'>
          <Image height={200} width={100} src='/nike.avif' alt='hello' className="w-full h-56 object-cover" />
          <p className="text-sm absolute bottom-0 left-0 p-2 bg-white dark:bg-black dark:text-gray-300 text-gray-900 transition-all duration-300 group-hover:bottom-2">
            ₹200
          </p>
        </div>
        <div className="p-4 h-[120px]">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">Nike</p>
          <p className="text-gray-500">Shoes</p>
        </div>
      </div>
      <div className="flex flex-col h-[300px] w-[280px] hover:border border-black dark:border-white  overflow-hidden  relative group">
        <div className='relative'>
          <Image height={200} width={100} src='/nike.avif' alt='hello' className="w-full h-56 object-cover" />
          <p className="text-sm absolute bottom-0 left-0 p-2 bg-white dark:bg-black dark:text-gray-300 text-gray-900 transition-all duration-300 group-hover:bottom-2">
            ₹200
          </p>
        </div>
        <div className="p-4 h-[120px]">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">Nike</p>
          <p className="text-gray-500">Shoes</p>
        </div>
      </div>
      <div className="flex flex-col h-[300px] w-[280px] hover:border border-black dark:border-white  overflow-hidden  relative group">
        <div className='relative'>
          <Image height={200} width={100} src='/nike.avif' alt='hello' className="w-full h-56 object-cover" />
          <p className="text-sm absolute bottom-0 left-0 p-2 bg-white dark:bg-black dark:text-gray-300 text-gray-900 transition-all duration-300 group-hover:bottom-2">
            ₹200
          </p>
        </div>
        <div className="p-4 h-[120px]">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">Nike</p>
          <p className="text-gray-500">Shoes</p>
        </div>
      </div>
      <div className="flex flex-col h-[300px] w-[280px] hover:border border-black dark:border-white  overflow-hidden  relative group">
        <div className='relative'>
          <Image height={200} width={100} src='/nike.avif' alt='hello' className="w-full h-56 object-cover" />
          <p className="text-sm absolute bottom-0 left-0 p-2 bg-white dark:bg-black dark:text-gray-300 text-gray-900 transition-all duration-300 group-hover:bottom-2">
            ₹200
          </p>
        </div>
        <div className="p-4 h-[120px]">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">Nike</p>
          <p className="text-gray-500">Shoes</p>
        </div>
      </div>
      <div className="flex flex-col h-[300px] w-[280px] hover:border border-black dark:border-white  overflow-hidden  relative group">
        <div className='relative'>
          <Image height={200} width={100} src='/nike.avif' alt='hello' className="w-full h-56 object-cover" />
          <p className="text-sm absolute bottom-0 left-0 p-2 bg-white dark:bg-black dark:text-gray-300 text-gray-900 transition-all duration-300 group-hover:bottom-2">
            ₹200
          </p>
        </div>
        <div className="p-4 h-[120px]">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">Nike</p>
          <p className="text-gray-500">Shoes</p>
        </div>
      </div>
      <div className="flex flex-col h-[300px] w-[280px] hover:border border-black dark:border-white  overflow-hidden  relative group">
        <div className='relative'>
          <Image height={200} width={100} src='/nike.avif' alt='hello' className="w-full h-56 object-cover" />
          <p className="text-sm absolute bottom-0 left-0 p-2 bg-white dark:bg-black dark:text-gray-300 text-gray-900 transition-all duration-300 group-hover:bottom-2">
            ₹200
          </p>
        </div>
        <div className="p-4 h-[120px]">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">Nike</p>
          <p className="text-gray-500">Shoes</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
