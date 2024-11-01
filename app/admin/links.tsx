'use client';
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidCollection } from "react-icons/bi";
import { BiSolidCategory } from "react-icons/bi";
import { IoBagHandle } from "react-icons/io5";
import { RiUser3Fill } from "react-icons/ri";
import { usePathname } from 'next/navigation'
import Link from "next/link";
type Links ={
  id:any
  name:String,
  icon:any
}
const links:Links[] =[
  {
    id:"dashboard",
    name:"Dashboard",
    icon:<MdSpaceDashboard size={24} />
  },
  {
    id:"products",
    name:"Products",
    icon:<BiSolidCollection size={24} />
  },
  {
    id:"categories",
    name:"Categories",
    icon:<BiSolidCategory size={24} />
  },
  {
    id:"subcategories",
    name:"SubCategories",
    icon:<BiSolidCategory size={24} />
  },
  {
    id:"orders",
    name:"Orders",
    icon:<IoBagHandle size={24} />
  },
  {
    id:"users",
    name:"Users",
    icon:<RiUser3Fill size={24} />
  }
]
const Links = ({navopen}:any) => {
    const params = usePathname();
    const path =params.substring(7)
  return (
    <div className={`fixed dark:text-[#E0E0E0] ${navopen?"left-0":"left-[-100%]"} dark:bg-[#181C14] dark:border-gray-800  lg:left-0 transition duration-500 top-[80px]  z-[50] bg-white w-[200px] flex flex-col min-h-screen border-r`}>
    {links.map((link:Links)=> <Link href={`/admin/${link.id}`}  key={link.id} className={`cursor-pointer flex transition duration-300 hover:bg-[#2f88fb] px-2 h-[50px] w-full hover:text-white items-center gap-5 ${path === link.id && 'bg-[#2f88fb] text-white' }`}>
      {link.icon}
      <p className='font-semibold'>{link.name}</p>
    </Link>)}
  </div>
  )
}

export default Links
