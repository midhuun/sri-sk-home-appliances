import Image from 'next/image';
import React from 'react';

interface Product {
  name: string;
  image: string;
  description: string;
  price: number;
}

const Card = ({ name, image, description, price }: Product) => {
  const shortname = name?.split(" ").slice(0, 5).join(" ");
  const shortdesc = description?.split(" ").slice(0, 5).join(" ");
  return (
    <div className="flex justify-center flex-wrap gap-3">
      <div className="flex flex-col h-[300px] w-full md:w-[280px] hover:border border-black dark:border-white overflow-hidden relative group">
        <div className='relative bg-white dark:bg-gray-800'>
          <Image
            style={{ objectFit: "cover" }}
            height={1000}
            width={1000}
            alt={name}
            src={image}
            className="w-full transition-transform duration-300 group-hover:scale-105 md:h-56 h-[150px] object-cover"
          />
          <p className="text-sm absolute bottom-0 left-0 p-2 bg-white dark:bg-gray-900 dark:text-gray-300 text-gray-900 transition-all duration-300 group-hover:bottom-2">
            ₹{price}
          </p>
        </div>
        <div className="p-4 h-[120px]">
          <p className="text-sm md:text-lg font-medium text-gray-800 dark:text-gray-300">{shortname}</p>
          <p className="text-gray-500">{shortdesc}....</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
