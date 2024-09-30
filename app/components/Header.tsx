"use client";
import { CgMenuLeftAlt } from "react-icons/cg";
import ThemeSwitch from "../context/ThemeSwitch";
import { LuUser } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Category, SubCategory } from "../types/ProductType";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
export default  function Header() {
  const {data:session} =useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserClicked,setisUserClicked] = useState(false);
  const [isRegister,setIsregister] = useState(false);
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const { data, error} = useSWR("/api/admin", fetcher);
  const pathname = usePathname();
  if(pathname.includes('/admin')){
    return null
  }
  function registerClick(){
    setisUserClicked(false);
    setIsregister(true);
  }
  function LoginCLick(){
    setisUserClicked(true);
    setIsregister(false);
  }
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };
  const handleLoginSubmit = (e:any) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
    
  };

  const handleRegisterSubmit = async(e:any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/user/register',
      {
        method:'POST',
        body:JSON.stringify(registerData)
      }
    )
    const result = await res.json();
    console.log(result);
    
  };
  return (
    <div>
      {/* Register Page */}
      <div className={`w-[400px] h-auto bg-white dark:bg-[#181C14] border z-[100] ${isRegister?"absolute":"hidden"} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg`}>
  <div className="p-8 relative">
    <button onClick={()=>setIsregister(false)} className="absolute top-1 hover:text-red-500 dark:hover:text-red-400 right-3 text-xl">✕</button>

    <h2 className="text-2xl font-bold dark:text-white text-center mb-6">Register</h2>
    
    <form onSubmit={handleRegisterSubmit}>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Full Name</label>
        <input type="text"  name="fullName"
        value={registerData.fullName}
        onChange={handleRegisterChange}
         id="fullName" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your full name" required />
      </div>

      <div className="mb-4">
        <label htmlFor="email"  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Email</label>
        <input type="email" name="email"
         value={registerData.email}
         onChange={handleRegisterChange}
         id="email" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your email" required />
      </div>

      <div className="mb-4">
        <label htmlFor="phone"  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Phone Number</label>
        <input type="tel"  name="phone"
        value={registerData.phone}
        onChange={handleRegisterChange}
        id="phone" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your phone number" required />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
        <input type="password"  name="password"
         value={registerData.password}
         onChange={handleRegisterChange}
          className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Confirm Password</label>
        <input type="password" name="confirmPassword"
        value={registerData.confirmPassword}
        onChange={handleRegisterChange}
         id="confirmPassword" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Confirm your password" required />
      </div>

      <button type="submit" className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">Register</button>
    </form>

    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">Already have an account?</p>
      <p onClick={LoginCLick} className="text-blue-500 cursor-pointer dark:text-blue-400 hover:underline">Login here</p>
    </div>
  </div>
</div>

{/* Login Page Starts from Here */}
{session?<>
      {/* Button to open the drawer */}
      <div className="p-5">
        <button onClick={toggleDrawer} className="text-blue-600 hover:text-blue-700 transition-all duration-400">
          <h2 className="text-2xl font-bold mb-7">Open User Menu</h2>
        </button>
      </div>

      {/* Drawer - slides in from right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="p-5 flex flex-col space-y-6">
          {/* User Logo and Name */}
          <div className="flex items-center space-x-4">
            <img src="/path-to-user-logo.jpg" alt="User Logo" className="w-10 h-10 rounded-full" />
            <span className="text-lg font-semibold">Username</span>
          </div>

          {/* Order Icon */}
          <Link href="/orders" className="flex items-center space-x-4 hover:text-blue-700">
            <img src="/path-to-order-logo.jpg" alt="Order Logo" className="w-6 h-6" />
            <span>Your Orders</span>
          </Link>

          {/* Logout Button */}
          <button className="text-red-600 hover:text-red-700">Logout</button>
        </div>
      </div>
    </>:
<div className={`w-[400px] bg-white dark:bg-[#181C14] h-auto border dark:border-gray-700 z-[100] ${isUserClicked?"absolute":"hidden"} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg`}>
  <div className="relative p-8">
    <button onClick={()=>setisUserClicked(false)} className="absolute top-1 hover:text-red-500 dark:hover:text-red-400 right-3 text-xl">✕</button>
    
    <h2 className="text-2xl font-bold dark:text-white text-center mb-6">Login</h2>
    
    <form onSubmit={handleLoginSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Username</label>
        <input  name="username"
        value={loginData.username}
        onChange={handleLoginChange}
         type="text" id="username" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your username" />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
        <input type="password" name="password"
        value={loginData.password}
        onChange={handleLoginChange}
         id="password" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your password" />
      </div>

      <button type="submit" className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">Login</button>
    </form>

    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">New user?</p>
      <p onClick={registerClick} className="text-blue-500 cursor-pointer dark:text-blue-400 hover:underline">Register here</p>
    </div>

    <div className="my-4 flex items-center justify-center">
      <span className="border-t dark:border-gray-700 w-full"></span>
      <span className="px-4 text-gray-500 dark:text-gray-300">OR</span>
      <span className="border-t dark:border-gray-700 w-full"></span>
    </div>

    <button onClick={()=>signIn('google')} className="w-full hover:bg-black dark:hover:bg-gray-700 duration-300 hover:text-white py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-black dark:text-gray-300 transition-colors flex items-center justify-center">
      <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.3 0 6.3 1.3 8.6 3.7l6.3-6.3C34.8 3.3 29.7 1 24 1 14.9 1 7.1 6.7 4 14.6l7.3 5.7C13.5 14.3 18.3 9.5 24 9.5z" />
        <path fill="#34A853" d="M46.5 24c0-1.5-.1-3-.4-4.4H24v8.4h12.8c-.6 3.4-2.4 6.4-5.2 8.3l7.9 6.2c4.5-4.1 7-10.2 7-17.5z" />
        <path fill="#FBBC05" d="M7.3 28.3c-1.1-3.3-1.1-6.9 0-10.2l-7.3-5.7c-3.5 6.9-3.5 15.1 0 22l7.3-5.7z" />
        <path fill="#4285F4" d="M24 47c5.7 0 10.5-1.9 14-5.2l-7.9-6.2c-2.2 1.4-5 2.2-8 2.2-5.7 0-10.5-3.9-12.2-9.1l-7.3 5.7C7.1 41.3 14.9 47 24 47z" />
      </svg>
      Continue with Google
    </button>
  </div>
</div>
}

      {/* Main Header */}
      <div className="flex h-[100px] p-5 justify-between items-center">
        <CgMenuLeftAlt
          onClick={() => setIsMenuOpen(true)}
          className="cursor-pointer"
          size={30}
        />
        <p className="font-extrabold text-lg md:text-[30px]">SRI SK</p>
        <div className="flex gap-3 md:gap-4 cursor-pointer items-center relative">
          <ThemeSwitch />
          <div onClick={()=>setisUserClicked(!isUserClicked)} className="">
            <LuUser size={26} />
          </div>
          <div className="relative">
            <GoHeart size={26} />
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs flex justify-center items-center rounded-full">
              5
            </span>
          </div>
          <div className="relative">
            <LuShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs flex justify-center items-center rounded-full">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Slide-In Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-[300px] z-[100] dark:bg-[#1d1e1d] bg-white transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-5 right-5  text-2xl"
        >
          ✕
        </button> 
        <div className="p-5">
          <Link href='/' className="text-blue-600 hover:text-blue-700 transition-all duration-400"><h2 className="text-2xl font-bold mb-7">Home</h2></Link>
          <ul className="space-y-4">
           {data?.message?.categories?.map((category:Category)=>
           <div key={category._id}>
           <Link  href={`/categories/${category.name}`} >{category.name}</Link>
           <hr className="py-2" />
           </div>
        )}
          </ul>
        </div>
      </div>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-10"
        />
      )}
      {
        session?<h1>{JSON.stringify(session)}</h1>:<h1>Not Welcome</h1>
      }
    </div>
  );
}
