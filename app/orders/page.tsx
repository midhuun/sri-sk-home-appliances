// pages/my-orders.js

import React from 'react';

const orders = [
  {
    id: "1",
    date: "Oct 15, 2023",
    items: 3,
    total: "$120.00",
    status: "Delivered",
    imageUrl: "/images/sample-product.jpg", // Replace with actual images
  },
  {
    id: "2",
    date: "Sep 30, 2023",
    items: 2,
    total: "$80.00",
    status: "Shipped",
    imageUrl: "/images/sample-product.jpg", // Replace with actual images
  },
  // Add more orders as needed
];

const MyOrders = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 px-4 sm:px-6 lg:px-8">
   
    <h1 className="text-3xl font-semibold mb-6 text-center">My Orders</h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-lg transition duration-200"
        >
          <img
            src={order.imageUrl}
            alt="Product Image"
            className="h-40 w-full object-cover rounded-lg mb-4"
          />
          <div className="mb-2">
            <h3 className="text-lg font-medium">Order #{order.id}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Date: {order.date}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Items: {order.items}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total: {order.total}
            </p>
            <p
              className={`text-sm font-semibold ${
                order.status === "Delivered"
                  ? "text-green-600 dark:text-green-400"
                  : "text-blue-600 dark:text-blue-400"
              }`}
            >
              Status: {order.status}
            </p>
          </div>
          <button className="w-full bg-gray-800 dark:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition duration-200">
            View Details
          </button>
        </div>
      ))}
    </div>
  </div>
  );
};

export default MyOrders;
