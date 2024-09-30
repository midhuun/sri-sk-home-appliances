import Image from "next/image";
import Card from "./components/Card";
import { getItem } from "./components/products";
import { Design } from "./components/Design";
import { Product, SubCategory } from "./types/ProductType";
import Link from "next/link";
export default  async function Home() {
  const products:any =await getItem();
  
  return (
    <main className="flex min-h-screen flex-col  px-1 md:px-8">
      <div className="in space-y-5 md:pl-[5%]">
        {products?.message?.subcategories?.map((sub:SubCategory)=>
        <div key={sub._id}>
          <div>
          <div>
  <div className="h-1 mb-3 relative w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:bg-gradient-to-r dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 border rounded-full shadow-md">
    <div className="h-[3px] absolute inset-0 w-[300px] bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 transition-all duration-500 ease-in-out rounded-full"></div>
  </div>
</div>

          <h1 className="text-[16px] md:text-[20px] py-5 font-bold uppercase">{sub.name}</h1> 
          <div className="flex flex-wrap gap-3">
          {sub.products?.map((product:any)=>
          <Link key={product._id}   href={`/subcategory/${sub.name}/product/${product.name}`}> <Card price={product.price}  name={product.name} image={product.image[0]} description={product.description} key={product._id}   /></Link>
        )}
        </div>
          </div>
        </div>)}
      </div>
    </main>
  );
}
