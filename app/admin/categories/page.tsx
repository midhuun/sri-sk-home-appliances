"use client";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
const Categories = () => {
  const [iscategoryAdd, setiscategoryAdd] = useState(true);
  return (
    <>
    <div
  className={`absolute z-[1000] inset-0 transition-transform duration-500 ease-in-out flex justify-end  px-[5%] md:px-0  ${iscategoryAdd ? "translate-x-0" : "translate-x-full  opacity-50"}`}
>
  <div className="bg-white flex flex-col gap-6 relative min-h-full shadow-lg w-full dark:bg-[#23271e] lg:w-[30%]">
    <IoMdClose onClick={()=>setiscategoryAdd(false)} size={26} className="cursor-pointer absolute top-3 right-5  " />
    <p className="text-[1.2vw] py-3 border-b-2 w-full text-center ">Add Category</p>
    <div className="inputGroup flex flex-col gap-5 px-[5%]">
    <input type="text" className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300" placeholder="Enter Name:" />
    <input
  type="file"
  className="border text-[14px] p-0 rounded-md w-full file:bg-white file:dark:bg-[#23271e] file:text-[14px] file:py-2 file:px-4 file:rounded-md file:text-slate-700 dark:file:text-slate-300  file:border-r file:focus:ring-0"
  placeholder="Choose file"
/>
<textarea
        className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full h-[100px] resize-none placeholder:text-slate-300 dark:placeholder:text-slate-300"
        placeholder="Enter description..."
      />
<button className="bg-blue-500 text-white  py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
      Add
    </button>
</div>
<p className="text-[1.2vw] py-2  border-t-2 w-full text-center ">Add Sub Category</p>
    <div className="inputGroup flex flex-col gap-7 px-[5%]">
    <input type="text" className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300" placeholder="Enter Name:" />
    <input
  type="file"
  className="border text-[14px] p-0 rounded-md w-full file:bg-white file:dark:bg-[#23271e] file:text-[14px] file:py-2 file:px-4 file:rounded-md file:text-slate-700 dark:file:text-slate-300  file:border-r file:focus:ring-0"
  placeholder="Choose file"
/>
<textarea
        className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full h-[100px] resize-none placeholder:text-slate-300 dark:placeholder:text-slate-300"
        placeholder="Enter description..."
      />
<button className="bg-blue-500 text-white  py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
      Add
    </button>
</div>
  </div>
</div>


    <div className='shadow-md bg-[#fcfbfb] dark:text-white  dark:bg-[#1a1e16] min-h-screen rounded-md '>
      <div className="flex px-1 lg:px-[5%] py-2 lg:py-7 justify-between gap-3 lg:gap-7">
        <input placeholder='Search' className='dark:bg-[#23271e] w-[30%] px-4 font-light placeholder:text-slate-300  dark:placeholder:text-slate-500 border lg:h-[35px] dark:border-[#272b23]' type="text" name="" id="" />
        <div className="">
          <button onClick={()=>setiscategoryAdd(true)} className='px-3 cursor-pointer text-[12px] lg:text-md flex items-center justify-center bg-blue-600 font-semibold text-white gap-2 py-2 rounded-md'>
            <IoAddOutline fontWeight={800} />
            Add Category</button>
        </div>
      </div>
      <div className="flex lg:text-sm  text-[12px] py-2 dark:bg-[#282d22] bg-[#f5f6fb] justify-between px-[5%]">
            <p className="uppercase">Categories</p>
            <div className="flex lg:text-sm text-[12px] uppercase  gap-5">
              <p>Total</p>
              <p>Earnings</p>
            </div>
        </div>
        <div className="flex  lg:text-sm text-[12px] py-2  justify-between px-[5%]">
          <div>
          <p className="text-sm">Travel</p>
          <p className=" text-[12px] text-slate-400 ">Travel with joy and love</p>
          </div>
           
            <div className="flex text-slate-400 lg:text-sm text-[12px] uppercase  gap-5">
              <p>3192</p>
              <p>Earnings</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Categories
