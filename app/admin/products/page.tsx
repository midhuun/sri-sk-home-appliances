"use client";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import useSWR from "swr";
import { Category } from '@/app/types/ProductType';
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Image from "next/image";
const Product = () => {
  const [iscategoryAdd, setiscategoryAdd] = useState(false);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState("");
  const [stock,setStock] = useState<number|undefined>(undefined);
  const [file, setFile] = useState<any>(undefined); // Handle file state
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number|undefined>(undefined);
  const [subcategoryId, setsubcategoryId] = useState("");
  const [colors, setColors] = useState<string[]>([""]); // Initialize with one empty color input
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Error state
  const [actualPrice,setactualPrice] = useState<number|undefined>(undefined);
  const [isAdded,setisAdded] = useState(false);
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/admin", fetcher);
  async function deleteCategory(id:any){
    setTimeout(() => {
      setisLoading(true);
    }, 5000);
    const res = await fetch('/api/admin',{
      method:'DELETE',
      body:JSON.stringify({"product":id})
    })
    const result = await res.json();
    setisLoading(false)
    window.location.reload();
    console.log(result);
  } 
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent form submission
  
    const uploadedUrls:any = [];
    setisLoading(true); // Start loading state
  
    // Loop through each image and upload it to get URLs
    for (const image of images) {
      const formData = new FormData();
      formData.append('image', image);
  
      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=f3145a10e034400f4b912f8123f851b1`, {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        
        // If upload was successful, add the URL to the list
        if (result.success) {
          uploadedUrls.push(result.data.display_url);
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
    
    setUrls(uploadedUrls); // Update the state with uploaded URLs
    console.log("Uploaded Image URLs:", uploadedUrls); // Log URLs after upload
  
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Name is required";

    if (!description) newErrors.description = "Description is required";
    if (!subcategoryId) newErrors.categoryId = "SubCategory is required";
    if (colors.some(color => !color)) newErrors.colors = "All colors must be filled";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const formData:any = new FormData();
    formData.append("name", name);
    formData.append("images",uploadedUrls); // Append the file
    formData.append("description", description);
    formData.append("colors", colors); // Append colors
    formData.append("price",price)
    formData.append("subcategoryProduct",subcategoryId)
    formData.append("actualPrice",actualPrice)
    formData.append("stock",stock);
    console.log(file);
    
    const response = await fetch('/api/admin', {
      method: 'POST',
      body: formData,
    });
    const results = await response.json();
    console.log(results);
    window.location.reload();
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  };

  if (error) return <Error />;
  if (!data) return <Loading />;

  const addColorInput = () => {
    setColors([...colors, ""]);
  };

  const removeColorInput = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index: number, value: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    setColors(updatedColors);
  };

  return (
    <div className="relative overflow-x-hidden">
      <div
        className={`absolute z-[1000] inset-0 transition-transform duration-500 ease-in-out flex justify-end px-[5%] md:px-0 ${iscategoryAdd ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="bg-white flex flex-col gap-6 relative min-h-full shadow-lg w-full dark:bg-[#23271e] lg:w-[30%]">
          <IoMdClose onClick={() => setiscategoryAdd(false)} size={26} className="cursor-pointer absolute top-3 right-5" />
          <p className="text-[16px] py-3 border-b-2 w-full text-center">Add Product</p>
          <div className="inputGroup flex flex-col gap-5 px-[5%]">
            <input
              type="text"
              className={`border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter Name:"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
               multiple
              className={`border text-[14px] p-0 rounded-md w-full file:bg-white file:dark:bg-[#23271e] file:text-[14px] file:py-2 file:px-4 file:rounded-md file:text-slate-700 dark:file:text-slate-300 file:border-r file:focus:ring-0 ${errors.file ? 'border-red-500' : ''}`}
              onChange={(e:any)=>setImages(Array.from(e.target.files))}
            />
            {errors.file && <p className="text-red-500">{errors.file}</p>}

            <textarea
              className={`border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full h-[100px] lg:h-[100px] resize-none placeholder:text-slate-300 dark:placeholder:text-slate-300 ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
            <input
              type="number"
              className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300"
              placeholder="Enter Price:"
              value={price}
              onChange={(e:any) => setPrice((e.target.value))}
            />
             <input
              type="number"
              className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300"
              placeholder="Actual Price:"
              value={actualPrice}
              onChange={(e:any) => setactualPrice((e.target.value))}
            />
            <input
              type="number"
              className="border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300"
              placeholder="Number of Stocks"
              value={stock}
              onChange={(e:any) => setStock((e.target.value))}
            />
            <select
              required
              className={`border dark:bg-[#23271e] text-[14px] px-2 appearance-none p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300 ${errors.categoryId ? 'border-red-500' : ''}`}
              value={subcategoryId}
              onChange={(e) => setsubcategoryId(e.target.value)}
            >
              <option value="" disabled>Select SubCategory</option>
              {data?.message?.subcategories.length > 0 &&
                data.message.subcategories.map((category: Category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.categoryId && <p className="text-red-500">{errors.categoryId}</p>}

            <div className="flex flex-col gap-2">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2 border p-2 rounded-md dark:bg-[#23271e] bg-white">
                  <input
                    type="text"
                    className={`border dark:bg-[#23271e] text-[14px] p-2 rounded-md w-full placeholder:text-slate-300 dark:placeholder:text-slate-300 ${errors.colors ? 'border-red-500' : ''}`}
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                  />
                  {colors.length > 1 && (
                    <IoMdClose
                      onClick={() => removeColorInput(index)}
                      size={20}
                      className="cursor-pointer text-red-500"
                    />
                  )}
                </div>
              ))}
              {errors.colors && <p className="text-red-500">{errors.colors}</p>}
              <button
                type="button"
                onClick={addColorInput}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <IoAddOutline size={16} className="inline" />
                Add Color
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>

      <div className="shadow-md bg-[#fcfbfb] dark:text-white dark:bg-[#1a1e16] min-h-screen rounded-md">
        <div className="flex px-1 lg:px-[5%] py-2 lg:py-7 justify-between gap-3 lg:gap-7">
          <input
            placeholder="Search"
            className="dark:bg-[#23271e] w-[30%] px-4 font-light placeholder:text-slate-300 dark:placeholder:text-slate-500 border lg:h-[35px] dark:border-[#272b23]"
            type="text"
            name=""
            id=""
          />
          <div className="">
            <button
              onClick={() => setiscategoryAdd(true)}
              className="px-3 cursor-pointer text-[12px] lg:text-md flex items-center justify-center bg-blue-600 font-semibold text-white gap-2 py-2 rounded-md"
            >
              <IoAddOutline fontWeight={800} />
              Add Product
            </button>
          </div>
        </div>
        <div className="flex lg:text-sm text-[12px] py-2 dark:bg-[#282d22] bg-[#f5f6fb] md:justify-between px-2 md:px-[5%]">
          <p className="md:w-[60%] uppercase">Product</p>
          <div className="flex justify-center md:w-[40%] text-center lg:text-sm text-[12px] uppercase gap-5">
            <p className='md:w-1/4'>category</p>
            <p className='md:w-1/4'>stock</p>
            <p className='md:w-1/4'>price</p>
            <p className='md:w-1/4'>quantity</p>
          </div>
        </div>
        {data?.message?.subcategories.length > 0 && data?.message?.product.map((product:any) =>
          <div key={product._id} className="flex relative items-center w-full lg:text-sm text-[12px] py-2 justify-between px-2 md:px-[5%]">
            <div className="absolute right-5 top-5 flex justify-center  items-center">
        <button onClick={()=>deleteCategory(product._id)} className="relative p-2 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-full shadow-md transition-all duration-300 ease-in-out group">
           <RiDeleteBin7Fill size={18} className="group-hover:scale-110 transition-transform duration-200 ease-in-out" />
           </button>
        </div>
            <div className="md:w-[60%]">
              <div className="flex items-center gap-1 md:gap-5">
                <Image width={40} height={40} className='hidden md:block object-cover h-10 w-10 border p-1' alt="image" src={product.image[0]} />
                <div>
                  <p className="text-[12px] md:text-sm ">{product.name.split(" ").slice(0,5).join("")}</p>
                  <p className="text-[12px] hidden md:block text-slate-400">{product.description.split(" ").slice(0,5).join("")}  ....</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-center md:w-[40%] text-slate-400 lg:text-sm text-[12px]  gap-5">
              <p className="md:w-1/4 text-[12px]">{product.subcategory?.name}</p>
              <p className="md:w-1/4">1234</p>
              <p className="md:w-1/4">321</p>
              <p className="md:w-1/4">1234</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
