"use"
import React, { useState } from "react";

const DeleteWithAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteClick = () => {
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const confirmDelete = () => {
    // Handle the delete logic here
    console.log("Item deleted!");
    setShowAlert(false);
  };

  return (
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center space-y-4 max-w-sm w-full mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Are you sure?</h2>
            <p className="text-gray-600 dark:text-gray-300">Do you really want to delete this item? This process cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeAlert}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default DeleteWithAlert;
