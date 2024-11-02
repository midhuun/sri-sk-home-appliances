"use client";
import Image from "next/image";
import Card from "./components/Card";
import { getItem } from "./components/products";
import Link from "next/link";
import useSWR from "swr";
import Poster from "./components/Poster";
export default  function Home() {
  const fetcher = (url:any) => fetch(url).then((res)=>res.json());
const { data, error, isLoading } = useSWR(
  `/api/user`,
  fetcher
);
  return (
    <>
    <Poster />
    <main className="flex min-h-screen flex-col py-2  px-1 ">
      
      <div className="in space-y-5 px-1">
        {data?.message?.subcategories?.map((sub:any)=>
        <div key={sub._id}>
          <div>
          <div>
  <div className="h-1 mb-3 relative w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:bg-gradient-to-r dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 border rounded-full shadow-md">
    <div className="h-[3px] absolute inset-0 w-[300px] bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 transition-all duration-500 ease-in-out rounded-full"></div>
  </div>
</div>

          <h1 className="text-[16px] md:text-[20px] py-5 font-bold uppercase">{sub.name}</h1> 
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {sub.products?.map((product:any)=>
          <Link key={product._id}   href={`/subcategory/${sub.name}/product/${product.name}`}> <Card price={product.price}  name={product.name} image={product.image[0]} description={product.description}  /></Link>
        )}
        </div>
          </div>
        </div>)}
      </div>
    </main>
    </>
  );
}
