import { IoAddOutline } from "react-icons/io5";
const Categories = () => {
  return (
    <div className='shadow-md bg-[#fcfbfb] dark:text-white  dark:bg-[#1a1e16] min-h-screen rounded-md '>
      <div className="flex px-1 lg:px-[5%] py-2 lg:py-7 justify-between gap-3 lg:gap-7">
        <input placeholder='Search' className='dark:bg-[#23271e] w-[30%] px-4 font-light placeholder:text-slate-300  dark:placeholder:text-slate-500 border lg:h-[35px] dark:border-[#272b23]' type="text" name="" id="" />
        <div className="">
          <button className='px-3 text-[12px] lg:text-md flex items-center justify-center bg-blue-600 font-semibold text-white gap-2 py-2 rounded-md'>
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
  )
}

export default Categories
