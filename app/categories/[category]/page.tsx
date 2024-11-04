'use client';
import Card from '@/app/components/Card';
import CategoryCard from '@/app/components/CategoryCard';
import Error from '@/app/components/Error';
import Loading from '@/app/components/Loading';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
export default  function Category() {
   const {category} = useParams();
   const fetcher = (url:any) => fetch(url).then((res)=>res.json());
  const { data, error, isLoading } = useSWR(
    `/api/user/sub/${category}`,
    fetcher
  );
  console.log(data?.message);
  
  return (
    <>
    {isLoading && <Loading/>}
    {error && <Error/>}
    <h1 className="text-xl md:text-2xl lg:text-3xl flex justify-center font-bold text-center my-6 relative  double-underline dark:text-slate-200 text-gray-800 ">
        {decodeURIComponent(category)}
      </h1>
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
    {data?.message?.subcategories&& data?.message?.subcategories.map((sub:any)=>
    <Link key={sub._id} href={`/subcategory/${sub.name}`}>
    <CategoryCard  name={sub.name} image={sub.image} description={sub.description} />
    </Link>
   )}
    </div>
    </>
  )
}

