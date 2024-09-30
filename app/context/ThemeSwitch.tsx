'use client';
import { useEffect,useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { LuSunMoon } from "react-icons/lu";
import { AiOutlineMoon } from "react-icons/ai";
export default function ThemeSwitch(){
    const [mounted, setMounted] = useState<Boolean>();
    const { setTheme, resolvedTheme } = useTheme()
    useEffect(()=>{
        setMounted(true)
    },[])
  if(!mounted){
    return null
  }
  if(resolvedTheme ==='dark'){
    return <LuSunMoon className="cursor-pointer" size={28} onClick={() => setTheme('light')} />
  }
  if(resolvedTheme ==='light'){
    return <AiOutlineMoon className="cursor-pointer" size={28} onClick={() => setTheme('dark')} />
  }
  
}


