"use client";
import Card from '@/app/components/Card';
import Error from '@/app/components/Error';
import Loading from '@/app/components/Loading';
import { Product } from '@/app/types/ProductType';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';
const page = () => {
const {subcategory}:any = useParams();
const subName:any = decodeURIComponent(subcategory);
const fetcher = (url:any) => fetch(url).then((res)=>res.json());
const { data, error, isLoading } = useSWR(
  `/api/user/subcategory/${subName}`,
  fetcher
);
console.log(data?.message?.products);

  return (
    <>
    {isLoading && <Loading/>}
    {error && <Error/>}
    <div className='lg:px-[5%] flex gap-4 flex-wrap justify-center md:justify-normal'>
    {data?.message?.products && data?.message?.products?.map((product:Product)=>
    <Link key={product._id} href={`/subcategory/${subcategory}/product/${product.name}`}>
    <Card price={product.price}  name={product.name} image={product.image[0]} description={product.description} />
    </Link>
   )}
    </div>
    </>
  )
}

export default page