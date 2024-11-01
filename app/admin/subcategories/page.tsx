"use client";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import useSWR from "swr";
import { Category, SubCategory } from '@/app/types/ProductType';
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Image from "next/image";

const SubCategories = () => {
  const [iscategoryAdd, setiscategoryAdd] = useState(false);
  const [isLoading,setisLoading] = useState(false);
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const { data, error} = useSWR("/api/admin", fetcher);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | any>(null); // Handle file state
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  async function deleteCategory(id:any){
    const res = await fetch('/api/admin',{
      method:'DELETE',
      body:JSON.stringify({"subcategory":id})
    })
    const result = await res.json();
    window.location.reload();
    console.log(result);
    
  } 
  const handleSubmit = async (e: any) => {
    setisLoading(true);
    e.preventDefault();
    const uploadedUrls:any = [];
    const imageData = new FormData();
      imageData.append('image', file);
  
      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=f3145a10e034400f4b912f8123f851b1`, {
          method: 'POST',
          body: imageData
        });
        const result = await response.json();
        
        // If upload was successful, add the URL to the list
        if (result.success) {
          uploadedUrls.push(result.data.display_url);
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    const formData = new FormData();
    formData.append("name", name);
    if (uploadedUrls.length>0) {
      formData.append("images", uploadedUrls); // Append the file
    }
    formData.append("description", description);
    formData.append("category", categoryId); // Append category ID
    const response = await fetch('/api/admin', {
      method: 'POST',
      body: formData,
    });
    const results = await response.json();
    console.log(results);
    setisLoading(false)
  };
  if (error) return <Error />
  if (!data) return <Loading/>
  console.log("Red");
  
  return (
    <div className="relative overflow-x-hidden">
      <div
        className={`absolute z-[1000] inset-0 transition-transform duration-500 ease-in-out flex justify-end px-[5%] md:px-0  ${iscategoryAdd ? "translate-x-0" : "translate-x-full "}`}
      >
        <div className="bg-white flex flex-col gap-6 relative min-h-full shadow-lg w-full dark:bg-[#23271e] lg:w-[30%]">
          <IoMdClose onClick={() => setiscategoryAdd(false)} size={26} className="cursor-pointer absolute top-3 right-5" />
          <p className="text-[16px] py-3 border-b-2 w-full text-center ">Add SubCategory</p>
          <div className="inputGroup flex flex-col gap-5 px-[5%]">
            <input
              type="text"
              className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300"
              placeholder="Enter Name:"
              value={name}
              onChange={(e) => setName(e.target.value)} // Set name input value
            />
            <input
              type="file"
               accept=".jpg"
              className="border text-[14px] p-0 rounded-md w-full file:bg-white file:dark:bg-[#23271e] file:text-[14px] file:py-2 file:px-4 file:rounded-md file:text-slate-700 dark:file:text-slate-300  file:border-r file:focus:ring-0"
              onChange={(e) => setFile(e.target.files?.[0] || null)} // Set file input
            />
            <textarea
              className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full h-[100px] lg:h-[250px] resize-none placeholder:text-slate-300 dark:placeholder:text-slate-300"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Set description input value
            />
            <select
              className="border dark:bg-[#23271e] text-[14px] px-2 appearance-none p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)} // Set category ID input value
            >
              <option value="" disabled  >
                Select Category
              </option>
              {data?.message?.categories.length > 0 &&
                data.message.categories.map((category: Category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <button
              onClick={handleSubmit}
              className={"bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"}
            >
             {isLoading?"Adding...":"Add"}
            </button>
          </div>
        </div>
      </div>

      <div className="shadow-md bg-[#fcfbfb] dark:text-white dark:bg-[#1a1e16] min-h-screen rounded-md">
        <div className="flex px-1 lg:px-[5%] py-2 lg:py-7 justify-between gap-3 lg:gap-7">
          <input
            placeholder="Search"
            className="dark:bg-[#23271e] w-[30%] px-4 font-light placeholder:text-slate-300  dark:placeholder:text-slate-500 border lg:h-[35px] dark:border-[#272b23]"
            type="text"
            name=""
            id=""
          />
          <div className="">
            <button
              onClick={() => setiscategoryAdd(true)}
              className="px-3 cursor-pointer text-[12px] lg:text-md flex items-center justify-center bg-blue-600 font-semibold text-white gap-2 py-2 rounded-md"
            >
              <IoAddOutline fontWeight={800} />
              Add Subcategory
            </button>
          </div>
        </div>
        <div className="flex  lg:text-sm text-[12px] py-2 dark:bg-[#282d22] bg-[#f5f6fb] justify-between px-[5%]">
          <p className="w-[80%] uppercase">SubCategories</p>
          <div className="flex justify-center text-center w-[20%] lg:text-sm text-[12px] uppercase gap-5">
            <p className=' w-1/2'>Total</p>
            <p className=' w-1/2'>Earnings</p>
          </div>
        </div>
        {data?.message?.subcategories.length>0 && data?.message?.subcategories?.map((subcategory:SubCategory)=>
        <div key={subcategory._id} className="flex relative items-center w-full lg:text-sm text-[12px] py-2 justify-between px-[5%]">
        <div className="absolute right-5 top-5 flex justify-center  items-center">
        <button onClick={()=>deleteCategory(subcategory._id)} className="relative p-2 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-full shadow-md transition-all duration-300 ease-in-out group">
           <RiDeleteBin7Fill size={18} className="group-hover:scale-110 transition-transform duration-200 ease-in-out" />
           </button>
        </div>
        <div className="w-[80%]">
          <div className="flex items-center gap-5">
          <Image height={1000} width={1000} className='object-cover h-10 w-10 border p-1' alt="image"  src={subcategory.image} />
          <div>
          <p className="text-sm ">{subcategory.name.split(" ").slice(0,5).join("")}</p>
          <p className="text-[12px] text-slate-400">{subcategory.description.split(" ").slice(0,5).join("")}</p>
          </div>
          </div>
        </div>
        <div className="flex justify-center text-center w-[20%] text-slate-400 lg:text-sm text-[12px] uppercase gap-5">
          <p className="w-1/2">{subcategory?.total || 0}</p>
          <p className="w-1/2">{subcategory?.earnings || 0}</p>
        </div>
      </div>)}
      </div>
    </div>
  );
};

export default SubCategories;
