import Image from 'next/image';
import React from 'react';

interface CategoryCardProps {
  name: string;
  image: string;
  description: string;
}

const CategoryCard = ({ name, image, description }: CategoryCardProps) => {
  const shortdesc = description.split(" ").slice(0,6).join(" ");
  return (
    
    <div className="flex flex-col h-[250px] md:h-[350px] w-full md:w-[300px] overflow-hidden relative group transition-shadow duration-300">
      <div className="relative bg-white dark:bg-black">
        <Image style={{objectFit: "cover"}} height={1000} width={1000} alt={name} src={image}  className="w-full h-[180px]  transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="md:p-4 p-1 flex  flex-col gap-1 md:gap-2 h-[120px]">
        <p className="text-md md:text-lg font-medium text-gray-800 dark:text-gray-300">{name}</p>
        <p className="text-gray-500 dark:text-gray-400  text-[12px]">{shortdesc} ...</p>
      </div>
    </div>
  );
}

export default CategoryCard;
