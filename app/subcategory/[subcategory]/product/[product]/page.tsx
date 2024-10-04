"use client";
import Card from '@/app/components/Card';
import Error from '@/app/components/Error';
import { PiHeartbeatLight } from "react-icons/pi";
import Loading from '@/app/components/Loading';
import {ProductType} from '@/app/types/ProductType';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';
import { addToCart } from '@/app/store/CartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
const page = () => {
const {product}:any = useParams();
const subName:any = decodeURIComponent(product);
const fetcher = (url:any) => fetch(url).then((res)=>res.json());
const { data, error, isLoading } = useSWR(
  `/api/user/product/${subName}`,
  fetcher
);
const productdetails= data?.message as ProductType
  const dispatch =  useDispatch<AppDispatch>();
 function addProducttoCart(productdetails:ProductType){
  dispatch(addToCart(productdetails))
 }
  return (
    <>
    {isLoading && <Loading />}
    {error && <Error/>}
    {data?.message &&
        <div className='md:flex pt-7 px-4 md:pt-[100px] justify-center md:gap-7 space-y-4 '>

        <div className='w-full px-2 md:w-[40%]'>
            <Image className='h-[300px] md:h-[500px] object-cover ' src={productdetails?.image[0]} height={1000} width={1000} alt={productdetails?.name} />
        </div>
        <div className='space-y-2 w-full px-2 md:w-[30%]'>
        <p className='font-semibold text-[15px] md:text-[20px]'>{productdetails?.name}</p>
        <p className='text-[16px] text-gray-600 '>{productdetails?.subcategory?.name}</p>
        <div>
        <p className='font-semibold text-[14px] md:text-[16px]'>MRP :  ₹{productdetails.price}.00</p>
        <p className='text-[12px] md:text-[14px] text-gray-600 '>Inclusive of all taxes</p>
        </div>
        <p className='text-[14px] md:text-[16px]'>{productdetails?.description}</p>
        <div className='space-y-1 pt-6 flex flex-col items-center'>
        <button onClick={()=>addProducttoCart(productdetails)} className='py-3 my-2 w-[80%] md:w-full font-semibold rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black'>Add to Bag</button>
        <button className='py-3 hover:border-black dark:border-gray-800 my-2 flex justify-center items-center gap-2 text-center border  dark:hover:border-white w-[80%] md:w-full font-semibold rounded-2xl '>Favourite<PiHeartbeatLight size={24} /></button>
        </div>
        </div>
    </div>
    }
    </>
  )
}

export default page