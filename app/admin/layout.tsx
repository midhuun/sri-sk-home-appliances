
import ThemeSwitch from "../context/ThemeSwitch"
import Image from "next/image"
import Link from 'next/link';
import Links from "./links";
const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <div className="flex fixed border-b z-[1000] dark:bg-[#181C14] bg-white  dark:border-gray-800 w-full h-[80px] items-center  justify-between px-4">
          
          <div className="left flex items-center gap-5 ">
          <Image height={80} alt="logo" width={80} src='/logo.png' />
          <input className=" h-8 w-[400px] active:outline-none dark:bg-[#1b1f17] rounded-md border dark:border-[#262525]" type="text" />
            </div>
            <div className="center">
             
            </div>
            <div className="right ">
            <ThemeSwitch />
            </div>
        </div>
       <Links />
       <div className="pl-[200px] pt-[80px]">
      {children}
      </div>
    </>
  )
}

export default layout
