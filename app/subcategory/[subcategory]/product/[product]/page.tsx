"use client";
import Error from '@/app/components/Error';
import { PiHeartbeatLight } from "react-icons/pi";
import Loading from '@/app/components/Loading';
import { ProductType } from '@/app/types/ProductType';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import useSWR from 'swr';
import { addToCart } from '@/app/store/CartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/store/store';
import { addToFavourite } from '@/app/store/FavouriteSlice';

const Page = () => {
  const { product }: any = useParams();
  const subName: any = decodeURIComponent(product);
  console.log(product);

  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/user/product/${subName}`,
    fetcher
  );
  const favourite = useAppSelector((state: any) => state.favourite);
  const cart = useAppSelector((state: any) => state.cart);

  const productdetails = data?.message as ProductType;
  const isFavourite = favourite?.find((product: ProductType) => product._id === productdetails?._id);
  const isCart = cart?.find((product: ProductType) => product._id === productdetails?._id);
  const dispatch = useDispatch<AppDispatch>();

  // State to manage the main image
  const [mainImage, setMainImage] = useState(productdetails?.image[0]);
  function addProducttoCart(productdetails: ProductType) {
    dispatch(addToCart(productdetails));
  }

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {data?.message && (
        <div className='md:flex pt-7 px-4 md:pt-[100px] justify-center md:gap-7 space-y-4 '>
           <div className='md:flex flex-col items-center hidden space-y-4 pt-4'>
              {productdetails?.image.map((img: string, index: number) => (
                <div key={index} className='cursor-pointer border ' onClick={() => setMainImage(img)}>
                  <Image 
                    src={img} 
                    width={300} 
                    height={800} 
                    className='h-[150px] w-[100px] object-contain' 
                    alt={`${productdetails?.name} image ${index + 1}`} 
                  />
                </div>
              ))}
            </div>
          <div className='w-full px-2 md:w-[40%]'>
            {/* Main Image */}
            <Image 
              width={1000} 
              height={1000} 
              className='h-[500px] md:h-[500px] object-contain ' 
              src={mainImage ||  productdetails?.image[0]} 

              alt={productdetails?.name} 
            />
          </div>
          <div className='space-y-2 w-full px-2 md:w-[30%]'>
            <p className='font-semibold text-[15px] md:text-[20px]'>{productdetails?.name}</p>
            <p className='text-[16px] text-gray-600 '>{productdetails?.subcategory?.name}</p>
            <div>
              <p className='font-semibold text-[14px] md:text-[16px]'>MRP :  ₹{productdetails.price}.00</p>
              <p className='text-[12px] md:text-[14px] text-gray-600 '>Inclusive of all taxes</p>
            </div>
            <p className='text-[14px] md:text-[16px]'>{productdetails?.description}</p>

            {/* Small Images */}
            <div className='flex md:hidden space-x-2 pt-4'>
              {productdetails?.image.map((img: string, index: number) => (
                <div key={index} className='cursor-pointer' onClick={() => setMainImage(img)}>
                  <Image 
                    src={img} 
                    width={100} 
                    height={100} 
                    className='h-[100px] w-[100px] object-cover' 
                    alt={`${productdetails?.name} image ${index + 1}`} 
                  />
                </div>
              ))}
            </div>

            <div className='space-y-1 pt-6 flex flex-col items-center'>
              {isCart
                ?
                <button className='py-3 cursor-not-allowed my-2 w-[80%] md:w-full font-semibold rounded-2xl bg-blue-500 dark:bg-white text-white dark:text-blue-500 hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black'>Added to Bag</button>
                :
                <button onClick={() => addProducttoCart(productdetails)} className='py-3 my-2 w-[80%] md:w-full font-semibold rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black'>Add to Bag</button>
              }
              {isFavourite
                ?
                <button className='py-3 cursor-not-allowed hover:border-black dark:border-gray-800 my-2 flex justify-center items-center gap-2 text-center border dark:hover:border-white w-[80%] md:w-full font-semibold rounded-2xl '>Added to Favourite<PiHeartbeatLight size={24} /></button>
                :
                <button onClick={() => dispatch(addToFavourite(productdetails))} className='py-3 hover:border-black dark:border-gray-800 my-2 flex justify-center items-center gap-2 text-center border dark:hover:border-white w-[80%] md:w-full font-semibold rounded-2xl '>Favourite<PiHeartbeatLight size={24} /></button>
              }
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page;
