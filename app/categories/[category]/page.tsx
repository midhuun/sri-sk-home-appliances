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
  console.log(data?.message?.subcategories);
  
  return (
    <>
    {isLoading && <Loading/>}
    {error && <Error/>}
    <div className='lg:px-[5%] flex gap-4 flex-wrap'>
    {data?.message?.subcategories&& data?.message?.subcategories.map((sub:any)=>
    <Link key={sub._id} href={`/subcategory/${sub.name}`}>
    <CategoryCard  name={sub.name} image={sub.image} description={sub.description} />
    </Link>
   )}
    </div>
    </>
  )
}

