"use client";
import { useDispatch } from "react-redux";
import { TbDoorExit } from "react-icons/tb";
import { CgMenuLeftAlt } from "react-icons/cg";
import ThemeSwitch from "../context/ThemeSwitch";
import { LuUser } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Category, ProductType } from "../types/ProductType";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, useSession,signOut } from "next-auth/react";
import { AppDispatch, useAppSelector } from "../store/store";
import { addToCart, removeFromCart, selectTotalValue } from "../store/CartSlice";
import {removeFromFavourite} from '../store/FavouriteSlice';
import { IoBagAddOutline, IoBagCheckOutline } from "react-icons/io5";

import Image from "next/image";
import { PiHeartStraightBreak } from "react-icons/pi";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
export default  function Header() {
  const [userData,setuserData] = useState<any>({});  
useEffect(()=>{
  const storedData = getCookie("data")
  
  if (storedData) {
      const user = JSON.parse(storedData);
      setuserData({"email":user.email,"name": user.name})
  } else {
      console.log("No user data found");
  }
},[])
    const total = useAppSelector(selectTotalValue);
   const cartItems = useAppSelector((state:any)=>state.cart);
   const favourite = useAppSelector((state:any)=>state.favourite);   
  const {data:session} =useSession(); 
  const [loginmsg,setloginmsg] = useState("Login");
  // Handling userClicks
  const [iscartOpen,setiscartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserClicked,setisUserClicked] = useState(false);
  const [isRegister,setIsregister] = useState(false);
  const [isFavouriteOpen,setisfavouriteOpen] = useState(false)  
  // Handling Login Data
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
  const dispatch =  useDispatch<AppDispatch>();
 function addProducttoCart(productdetails:ProductType){
  dispatch(addToCart(productdetails))
 }
 function deleteProductFromCart(productdetails:ProductType){
  dispatch(removeFromCart(productdetails))
 }
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
  const handleLoginSubmit = async(e:any) => {
    setloginmsg("Logging in")
    e.preventDefault();
    try{
    const res = await fetch('https://sri-sk-home-appliances.vercel.app/api/user/login',
      {
        method:'POST',
        body:JSON.stringify(loginData)
      }
    )
    const result = await res.json();
    if(result){
      setTimeout(() => {
        setloginmsg("Login Successful");
        setloginmsg("Login");  
    }, 2000);
    
    }
      const user = result.message;
      setCookie('usertoken',result.message.token,{ maxAge: 60 * 60 * 24});
      setCookie("data",JSON.stringify(user),{ maxAge: 60 * 60 * 24})
      setuserData({"email":user.email,"name": user.name})
    console.log(result.message);
    setLoginData({
      username: '',
      password: '',
    })
  }
  catch(err){
    console.log(err); 
  }
  };
   function logout(){
    if(session){
    signOut('google');
    setisUserClicked(false)
    }
    if(userData){
     deleteCookie('usertoken');
     deleteCookie("data");
      setuserData({});
      setisUserClicked(false)
    }
   }
  const handleRegisterSubmit = async(e:any) => {
    e.preventDefault();
      if(registerData.password !== registerData.confirmPassword){
        alert("Passwords do not match");
        return;
    }
    const res = await fetch('https://sri-sk-home-appliances.vercel.app/api/user/register',
      {
        method:'POST',
        body:JSON.stringify(registerData)
      }
    )
    const result = await res.json();
    if(result.status === 200){

      setisUserClicked(true);
      setuserData(result.message.user)
    }
    console.log(result.message);
    localStorage.setItem('token',result?.message);

  };
  return (
    <div>
      {/* Cart Page */}
      <div
  className={`fixed top-0 right-0 h-screen w-[300px] md:w-[500px] z-[100] dark:bg-gray-900 border-l border-l-slate-200 dark:border-l-gray-800 bg-white transition-transform duration-300 ${
    iscartOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <button
    onClick={() => setiscartOpen(false)}
    className="absolute top-5 right-5 text-2xl"
  >
    ✕
  </button>

  <div className="p-5">

    {/* Cart Section */}
    <h3 className="text-xl font-semibold mb-5">BAG</h3>
     <hr />
    <div className="space-y-4 mt-5">
      {cartItems?.map((item: ProductType) => (
        <div key={item._id} className="flex  justify-between p-3 border rounded-lg">
          {/* Image */}
          <Image
           width={200}
           height={200}
            src={item.image[0]}
            alt={item.name}
            className="w-16 h-16 md:h-[100px] md:w-[100px] object-cover rounded-lg"
          />
          {/* Name and Quantity Controls */}
          <div className="flex-1  ml-4">
            <h4 className="text-md ">{item.name.length>20 ?item.name.slice(0,20)+'...':item.name}</h4>
            <span className="text-[12px] my-2">₹ {item.price}</span>
            <div className="flex border justify-center w-[99px] items-center mt-2">
              <button
               onClick={()=>deleteProductFromCart(item)} className="w-[33px] flex justify-center items-center text-gray-600 rounded-md hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-lg flex justify-center items-center w-[33px]">{item.quantity}</span>
              <button onClick={()=>addProducttoCart(item)}
                className=" flex justify-center items-center w-[33px] text-gray-600 rounded-md hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Delete Button */}
          <span>₹ {item.quantity*item.price}</span>
        </div>
      ))}
    </div>

    {/* Total Section */}
    {total>0?<><div className="mt-5 flex justify-between items-center">
      <h4 className="text-lg font-semibold">Total:</h4>
      <span className="text-lg font-bold">₹{total}</span>
    </div>
    <Link href='/checkout'>
    <button
      onClick={()=>setiscartOpen(false)}
      className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Checkout
    </button>
    </Link>
    </>:<>
    <div className="mt-5 flex justify-between items-center p-2 rounded-lg ">
    <h4 className="text-sm font-semibold text-gray-500">Your cart is empty</h4>
  </div>
  
   </>
    }

   
  </div>
</div>
      {/* Favourite Page */}
      <div
  className={`fixed top-0 right-0 h-screen w-[300px] md:w-[500px] z-[100] dark:bg-gray-900 border-l border-l-slate-200 dark:border-l-gray-800 bg-white transition-transform duration-300 ${
    isFavouriteOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <button
    onClick={() => setisfavouriteOpen(false)}
    className="absolute top-5 right-5 text-2xl"
  >
    ✕
  </button>

  <div className="p-5">
    <h3 className="text-xl font-semibold mb-5">Favourites</h3>
     <hr />
    <div className="space-y-4 mt-5">
      {favourite.length==0 && <p className="space-y-2 text-gray-500">Your Favourites is Empty </p>}
      {favourite?.map((item: ProductType) => (
        <div key={item._id} className="flex  justify-start p-3 border rounded-lg">
          {/* Image */}
          <Image height={200} width={200}
            src={item.image[0]}
            alt={item.name}
            className="w-16 h-16 md:h-[100px] md:w-[100px] object-cover rounded-lg"
          />
          {/* Name and Quantity Controls */}
          <div className="mx-2">
            <h4 className="text-md ">{item.name.length>20 ?item.name.slice(0,40)+'...':item.name}</h4>
            <span className="text-[12px] my-2">₹ {item.price}</span>
            <button
              onClick={() => dispatch(removeFromFavourite(item))}
              className="text-white text-[12px] my-2 p-2 rounded-md flex hover:bg-red-600 bg-red-500 items-center  justify-center "
              aria-label="Remove from favourites"
            >
            <p className="ml-1">Remove</p>
              <PiHeartStraightBreak className="mx-[6px]" size={18} />
            </button>
          </div>

        </div>
      ))}
    </div>
  </div>
</div>
      {/* Register Page */}
{session || userData.name ? <div
  className={`fixed top-0 right-0 h-screen w-[250px] md:w-[300px] z-[100] dark:bg-gray-900 border-l border-l-slate-200 dark:border-l-gray-800 bg-white transition-transform duration-300 ${
    isUserClicked ? "translate-x-0" : "translate-x-full"
  }`}
>
<button onClick={()=>setisUserClicked(false)} className="absolute top-1 hover:text-red-500 dark:hover:text-red-400 right-3 text-2xl">✕</button>
<div className=" p-2">
  <div className="flex pt-5 pb-3 gap-3">
    {session?.user?.image && session?.user?.name &&
      <Image alt={session?.user.name} className="h-10 w-10 rounded-full border" width={200} height={100} src={session?.user?.image} />
    }
    {userData &&
      <Image alt={userData.name} className="h-10 w-10 rounded-full border" width={200} height={100} src='/profile.png' />
    }
  <div className="">
  <p className="text-[16px]">{session?.user?.name}  {userData?.name}</p>
  <p className="text-[12px]">{session?.user?.email}  {userData?.email}</p>
  </div>
  </div>
  <hr />
  <div className="">
    <p className="flex  py-4 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white cursor-pointer gap-3 items-center"><LuUser className="ml-4" size={24} />My Profile</p>
    <hr />
    <Link href='/orders'>
    <p  className="flex py-4 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white cursor-pointer gap-3 items-center"><IoBagCheckOutline className="ml-4" size={24} />My Orders</p>
    </Link>
  <hr />
  <p onClick={()=>{setiscartOpen(true); setisUserClicked(false)}} className="flex py-4 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white cursor-pointer gap-3 items-center"><IoBagAddOutline className="ml-4" size={24} />Cart</p>
  <hr />
  <p onClick={()=>{setisfavouriteOpen(true); setisUserClicked(false)}} className="flex py-4 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white cursor-pointer gap-3 items-center"><GoHeart className="ml-4" size={24} />Favourites</p>
  <hr />
  <p onClick={logout} className="flex py-4 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white cursor-pointer gap-3 items-center"><TbDoorExit className="ml-4" size={24} />Logout</p>

  </div>
</div>

</div>:<> 
<div 
    className={`fixed inset-0 bg-black z-[100] bg-opacity-50 backdrop-blur-sm transition-opacity ${isRegister || isUserClicked ? "block" : "hidden"}`} 
    onClick={() => { setIsregister(false); setisUserClicked(false); }} 
  >

  </div>
  <div className={`w-[250px] md:w-[400px] h-auto bg-white dark:bg-[#181C14] border z-[100] ${isRegister?"absolute":"hidden"} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg`}>
  <div className="p-8 relative">
    <button onClick={()=>setIsregister(false)} className="absolute top-1 hover:text-red-500 dark:hover:text-red-400 right-3 text-xl">✕</button>

    <h2 className="text-2xl font-bold dark:text-white text-center mb-6">Register</h2>
    
    <form onSubmit={handleRegisterSubmit}>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Full Name</label>
        <input type="text" required name="fullName"
        value={registerData.fullName}
        onChange={handleRegisterChange}
         id="fullName" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your full name"  />
      </div>

      <div className="mb-4">
        <label htmlFor="email"  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Email</label>
        <input type="email"  name="email"
         value={registerData.email}
         onChange={handleRegisterChange}
         id="email" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your email" required />
      </div>

      <div className="mb-4">
        <label htmlFor="phone"  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Phone Number</label>
        <input type="tel" required  name="phone"
        value={registerData.phone}
        onChange={handleRegisterChange}
        id="phone" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your phone number"  />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
        <input type="password" required name="password"
         value={registerData.password}
         onChange={handleRegisterChange}
          className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your password"  />
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Confirm Password</label>
        <input type="password" required name="confirmPassword"
        value={registerData.confirmPassword}
        onChange={handleRegisterChange}
         id="confirmPassword" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Confirm your password"  />
      </div>

      <button  type="submit" className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">Register</button>
    </form>

    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">Already have an account?</p>
      <p onClick={LoginCLick} className="text-blue-500 cursor-pointer dark:text-blue-400 hover:underline">Login here</p>
    </div>
  </div>
</div>
<div className={`w-[400px] bg-white dark:bg-[#181C14] h-auto border dark:border-gray-700 z-[100] ${isUserClicked?"absolute":"hidden"} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg`}>
  <div className="relative p-8">
    <button onClick={()=>setisUserClicked(false)} className="absolute top-1 hover:text-red-500 dark:hover:text-red-400 right-3 text-xl">✕</button>
    
    <h2 className="text-2xl font-bold dark:text-white text-center mb-6">Login</h2>
    
    <form onSubmit={handleLoginSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Mobile or Email</label>
        <input  name="username"
        value={loginData.username}
        onChange={handleLoginChange}
         type="text" id="username" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your mobile or email" />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
        <input type="password" name="password"
        value={loginData.password}
        onChange={handleLoginChange}
         id="password" className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-[#181C14] focus:outline-none focus:border-blue-500" placeholder="Enter your password" />
      </div>

      <button type="submit" className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">{loginmsg}</button>
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
</div></>}
     

      {/* Main Header */}
      <div className="flex h-[60px] md:h-[100px] md:p-5 p-2 justify-between items-center">
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
          <div onClick={()=>setisfavouriteOpen(!isFavouriteOpen)}  className="relative">
            <GoHeart size={26} />
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs flex justify-center items-center rounded-full">
              {favourite.length}
            </span>
          </div>
          <div onClick={()=>setiscartOpen(!iscartOpen)} className="relative cursor-pointer">
            <LuShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs flex justify-center items-center rounded-full">
              {cartItems.length}
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
    </div>
  );
}
