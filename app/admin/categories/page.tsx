"use client";
import useSWR from "swr";
import {  useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Category } from "@/app/types/ProductType";
import Error from "@/app/components/Error";
import Loading from "@/app/components/Loading";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Image from "next/image";
const Categories = () => {
  const [iscategoryAdd, setiscategoryAdd] = useState(false);
  const fetcher = (url:any) => fetch(url).then((res)=>res.json());
  const { data, error, isLoading } = useSWR(
    "/api/admin",
    fetcher
  );
  const [clickedState,setclickedState] = useState(false)
  const [name, setName] = useState("");
  const [file, setFile] = useState<any>(null); 
  const [description, setDescription] = useState("");
  async function deleteCategory(id:any){
    const res = await fetch('/api/admin',{
      method:'DELETE',
      body:JSON.stringify({"category":id})
    })
    const result = await res.json();
    window.location.reload();
    console.log(result);
    
    
  } 
  // Handle form submission
  const  handleSubmit = async(e:any) => {
    setclickedState(true);
    e.preventDefault(); 
    console.log("Clicked");
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
    formData.append("categoryName", name);
    if(uploadedUrls.length>0){
    formData.append("images", uploadedUrls);
    }
    formData.append("description", description);
    const body = await fetch('/api/admin',{
      method:'POST',
      body:formData
    })
    const results:{message:[]} = await body.json();
    setclickedState(false)
    window.location.reload();
    console.log(results);
    
  };
  if(clickedState) <Loading/>
  if (error) return <Error />
  if (!data) return <Loading/>
  return (
    <div className="relative overflow-x-hidden">
      <div
        className={`absolute z-[1000] inset-0 transition-transform duration-500 ease-in-out flex justify-end  px-[5%] md:px-0  ${
          iscategoryAdd ? "translate-x-0" : "translate-x-full "
        }`}
      >
        <div className="bg-white flex flex-col gap-6 relative min-h-full shadow-lg w-full dark:bg-[#23271e] lg:w-[30%]">
          <IoMdClose
            onClick={() => setiscategoryAdd(false)}
            size={26}
            className="cursor-pointer absolute top-3 right-5"
          />
          <p className="text-[16px] lg:text-[1.2vw] py-3 border-b-2 w-full text-center">
            Add Category
          </p>
          <form onSubmit={handleSubmit} className="inputGroup flex flex-col gap-5 px-[5%]">
            <input
              type="text"
              className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300"
              placeholder="Enter Name:"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="file"
              accept=".jpg"
              className="border text-[14px] p-0 rounded-md w-full file:bg-white file:dark:bg-[#23271e] file:text-[14px] file:py-2 file:px-4 file:rounded-md file:text-slate-700 dark:file:text-slate-300 file:border-r file:focus:ring-0"
              placeholder="Choose file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]); // Only set file if a file is selected
                }
              }
            }
              required
            />
            <textarea
              className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full h-[100px] lg:h-[250px] resize-none placeholder:text-slate-300 dark:placeholder:text-slate-300"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Main section */}
      <div className="shadow-md overflow-x-hidden bg-[#fcfbfb] dark:text-white dark:bg-[#1a1e16] min-h-screen rounded-md">
        <div className="flex px-1 lg:px-[5%] py-2 lg:py-7 justify-between gap-3 lg:gap-7">
          <input
            placeholder="Search"
            className="dark:bg-[#23271e] w-[30%] px-4 font-light placeholder:text-slate-300 dark:placeholder:text-slate-500 border lg:h-[35px] dark:border-[#272b23]"
            type="text"
          />
          <div>
            <button
              onClick={() => setiscategoryAdd(true)}
              className="px-3 cursor-pointer text-[12px] lg:text-md flex items-center justify-center bg-blue-600 font-semibold text-white gap-2 py-2 rounded-md"
            >
              <IoAddOutline fontWeight={800} />
              Add Category
            </button>
          </div>
        </div>

        <div className="flex  lg:text-sm text-[12px] py-2 dark:bg-[#282d22] bg-[#f5f6fb] justify-between px-[5%]">
          <p className="w-[80%] uppercase">Categories</p>
          <div className="flex justify-center w-[20%] text-center lg:text-sm text-[12px] uppercase gap-5">
            <p className=' w-1/2'>Total</p>
            <p className=' w-1/2'>Earnings</p>
          </div>
        </div>
        {data?.message?.categories.length>0 && data?.message?.categories?.map((category:Category)=>
        <div key={category._id} className="flex relative items-center w-full lg:text-sm text-[12px] py-2 justify-between px-[5%]">
        <div className="absolute right-5 top-5 flex justify-center  items-center">
        <button onClick={()=>deleteCategory(category._id)} className="relative p-2 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-full shadow-md transition-all duration-300 ease-in-out group">
           <RiDeleteBin7Fill size={18} className="group-hover:scale-110 transition-transform duration-200 ease-in-out" />
           </button>
        </div>
        
        <div className="w-[80%]">
          <div className="flex items-center gap-5">
          <Image width={40} height={40} className='hidden md:block object-cover h-10 w-10 border p-1' alt="image"  src={category.image || "https://picsum.photos/200/300"} />
          <div>
          <p className="text-sm ">{category?.name?.split(" ").slice(0,5).join("")}</p>
          <p className="text-[12px] text-slate-400">{category?.description?.split(" ").slice(0,5).join("")}</p>
          </div>
          </div>
        </div>
        <div className="flex justify-center w-[20%] text-center text-slate-400 lg:text-sm text-[12px] uppercase gap-5">
          <p className="w-1/2">{category?.total || 0}</p>
          <p className="w-1/2">{category?.earnings || 0}</p>
        </div>
      </div>)}
        
      </div>
    </div>
  );
};

export default Categories;
