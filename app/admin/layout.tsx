"use client";
import ThemeSwitch from "../context/ThemeSwitch"
import Image from "next/image"

import { TbMenuDeep } from "react-icons/tb";

import Links from "./links";
import { useState } from "react";
const layout = ({children}:{children:React.ReactNode}) => {
  const [isnavOpen,setIsNavOpen]  =useState(false)
  return (
    <>
        <div className="flex fixed border-b z-[1000] dark:bg-[#181C14] bg-white  dark:border-gray-800 w-full h-[80px] items-center  justify-between px-4">
          <div className="left flex items-center gap-5 ">
            <TbMenuDeep onClick={()=>setIsNavOpen(!isnavOpen)} className="cursor-pointer" size={28} />
          <Image height={80} alt="logo" width={80} src='/logo.png' />
          <input className=" h-8 w-[400px] active:outline-none dark:bg-[#1b1f17] rounded-md border dark:border-[#262525]" type="text" />
            </div>
            <div className="center">
             
            </div>
            <div className="right ">
            <ThemeSwitch />
            </div>
        </div>
       <Links navopen={isnavOpen} />
       <div className="lg:pl-[200px] pt-[80px]">
      {children}
      </div>
    </>
  )
}

export default layout
