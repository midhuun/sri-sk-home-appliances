"use client";
import Card from '@/app/components/Card';
import Error from '@/app/components/Error';
import Loading from '@/app/components/Loading';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';
const Page = () => {
const {subcategory}:any = useParams();
const subName:any = decodeURIComponent(subcategory);
const fetcher = (url:any) => fetch(url).then((res)=>res.json());
const { data, error, isLoading } = useSWR(
  `/api/user/subcategory/${subName}`,
  fetcher
);
console.log(data?.message);

  return (
    <>
    {isLoading && <Loading/>}
    {error && <Error/>}
    <h1 className="text-xl md:text-2xl lg:text-3xl flex justify-center font-bold text-center my-6 relative  double-underline dark:text-slate-200 text-gray-800 ">
        {decodeURIComponent(subcategory)}
      </h1>
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
    {data?.message?.products && data?.message?.products?.map((product:any)=>
    <Link key={product._id} href={`/subcategory/${subcategory}/product/${product.name}`}>
    <Card price={product.price}  name={product.name} image={product.image[0]} description={product.description} />
    </Link>
   )}
    </div>
    </>
  )
}

export default Page;