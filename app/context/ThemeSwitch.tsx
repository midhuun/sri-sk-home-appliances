'use client';
import { useEffect,useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FiMoon, FiSun } from "react-icons/fi";
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
    return <FiSun className="cursor-pointer" onClick={() => setTheme('light')} />
  }
  if(resolvedTheme ==='light'){
    return <FiMoon className="cursor-pointer" size={28} onClick={() => setTheme('dark')} />
  }
  
}


