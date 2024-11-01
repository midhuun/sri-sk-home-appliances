"use client";

import { useState } from "react";

const PincodeFetch = () => {
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  async function getPinCode(value: string) {
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

  return (
    <>
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
          onChange={(e) => getPinCode(e.target.value)}
          type="text"
          className="w-full p-3 border border-gray-300 dark:border-[#2C3725] rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-[#485F41] dark:bg-[#1F261B] dark:text-[#E5E5E5]"
          placeholder="Enter Postal Code"
        />
      </div>
    </>
  );
};

export default PincodeFetch;
