import { IoAddOutline } from "react-icons/io5";
const Categories = () => {
  return (
    <div className='shadow-md bg-[#fcfbfb] dark:text-white  dark:bg-[#1a1e16] min-h-screen rounded-md '>
      <div className="flex px-[5%] py-7 justify-between gap-7">
        <input placeholder='Search' className='dark:bg-[#23271e] px-4 font-light placeholder:text-slate-300  dark:placeholder:text-slate-500 border h-[35px] dark:border-[#272b23]' type="text" name="" id="" />
        <div className="">
          <button className='px-3 flex items-center justify-center bg-blue-600 font-semibold text-white gap-2 py-2 rounded-md'>
            <IoAddOutline fontWeight={800} />
            Add Category</button>
        </div>
      </div>
    </div>
  )
}

export default Categories
