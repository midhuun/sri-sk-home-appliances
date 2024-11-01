"use client"
import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "../store/store";
import { ProductType } from '../types/ProductType';
import {selectTotalValue} from '../store/CartSlice'
import Image from "next/image";

const CartItems = () => {
    const cartItems = useAppSelector((state:any) => state.cart);
    const totalValue = useAppSelector(selectTotalValue);
    return (
        <div className="space-y-4">
            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-6 py-10 bg-gray-100 dark:bg-[#1F261B] rounded-lg shadow-md">
                    <FaShoppingCart className="text-7xl text-gray-400 dark:text-[#9AA68A] animate-pulse" />
                    <p className="text-gray-600 font-semibold dark:text-[#9AA68A] text-center text-lg">
                        Your cart is empty
                    </p>
                    <button
                        className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition dark:bg-[#485F41] dark:hover:bg-[#3D5138] shadow-lg"
                        onClick={() => window.location.href = '/'}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item: ProductType) => (
                        <div
                        key={item._id}
                        className="flex items-center space-x-4 border-b pb-4 border-gray-200 dark:border-[#2C3725]"
                    >
                        <Image
                            src={item.image[0]} // Assuming each item has an `image` property
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md shadow-sm"
                            height={200}
                            width={200}
                        />
                        <div className="flex-grow">
                            <h3 className="font-medium text-gray-800 dark:text-[#E5E5E5]">
                                {item.name}
                            </h3>
                            <p className="text-gray-500 dark:text-[#9AA68A]">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-[#E5E5E5]">${item.price}</p>
                    </div>
                    ))}
                    <div className="flex justify-between mt-6 font-semibold text-lg border-t pt-4 border-gray-200 dark:border-[#2C3725]">
                        <span className="text-gray-900 dark:text-[#E5E5E5]">Total</span>
                        <span className="text-gray-900 dark:text-[#E5E5E5]">₹{totalValue}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItems;
