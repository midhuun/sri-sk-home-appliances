"use client";
import { useState } from 'react';
import { useAppSelector } from '../store/store';
import CartItems from './CartItems';
import { selectTotalValue } from '../store/CartSlice';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Checkout = () => {
  const { data: session } = useSession();
  const cartItems = useAppSelector((state) => state.cart);
  const totalValue = useAppSelector(selectTotalValue);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData,setuserData] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  
  async function handlePincodeFetch(value:any) {
    setPincode(value);
    setError(""); // Reset any previous error
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
      const result = await response.json();
      if (result[0].Status === "Success" && result[0].PostOffice) {
        const district = result[0].PostOffice[0]?.District || "N/A";
        const circle = result[0].PostOffice[0]?.Circle || "N/A";
        setState(`${district}, ${circle}`);
      } else {
        setState("");
      }
    } catch (err) {
      setError("Error fetching location");
    }
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setPopupMessage("Add products to proceed!");
      setTimeout(() => setPopupMessage(""), 3000);
      return;
    }
    const data = localStorage.getItem("Data");
    if(data){
      const user = JSON.parse(data);
      setuserData({"email":user.email});
    }
    console.log(userData);
    
    const orderData = {
      cartItems,
      user: session?.user || userData?.email,
      totalValue,
      address: {
        fullName,
        phoneNumber,
        address,
        pincode,
        state,
      },
    };

    try {
      const response = await fetch("/api/admin/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Order submission failed");
      }
      setIsOrderConfirmed(true);
      setPopupMessage("Order confirmed!");
      setTimeout(() => setPopupMessage(""), 3000);

    } catch (error) {
      console.error("Error during order confirmation:", error);
      setPopupMessage("Order confirmation failed. Please try again.");
      setTimeout(() => setPopupMessage(""), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-12">
      {popupMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg z-50">
          {popupMessage}
        </div>
      )}

      {isOrderConfirmed ? (
        <div className="w-full bg-white dark:bg-[#1F261B] p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-[#E5E5E5]">Thank you!</h2>
          <p className="text-lg text-gray-700 dark:text-[#9AA68A]">
            Your order has been confirmed and is being processed. You’ll receive a confirmation email soon.
          </p>
          <Link href='/'
           
            className="mt-6 py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300 dark:bg-[#485F41] dark:hover:bg-[#3D5138]"
          >
            Back to Shop
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Summary Section */}
          <div className="w-full lg:w-1/3 bg-gray-50 dark:bg-[#1F261B] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-[#E5E5E5]">Cart Summary</h2>
            <CartItems />
          </div>

          {/* Address Form Section */}
          <div className="w-full lg:w-2/3 bg-white dark:bg-[#181C14] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-[#E5E5E5]">Delivery Address</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-[#9AA68A]">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-[#2C3725] rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-[#485F41] dark:bg-[#1F261B] dark:text-[#E5E5E5]"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-[#9AA68A]">Phone Number</label>
                  <input
                    required
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-[#2C3725] rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-[#485F41] dark:bg-[#1F261B] dark:text-[#E5E5E5]"
                    placeholder="+91"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-[#9AA68A]">Address</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 dark:border-[#2C3725] rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-[#485F41] dark:bg-[#1F261B] dark:text-[#E5E5E5]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-[#9AA68A]">City</label>
                  <input
                    type="text"
                    disabled
                    className="w-full cursor-not-allowed p-3 border border-gray-300 dark:border-[#2C3725] rounded-lg focus:ring-0 dark:bg-[#1F261B] dark:text-[#E5E5E5]"
                    value={state}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-[#9AA68A]">Postal Code</label>
                  <input
                    required
                    onChange={(e) => handlePincodeFetch(e.target.value)}
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-[#2C3725] rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-[#485F41] dark:bg-[#1F261B] dark:text-[#E5E5E5]"
                    placeholder="Enter Postal Code"
                    value={pincode}
                  />
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300 dark:bg-[#485F41] dark:hover:bg-[#3D5138]"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
