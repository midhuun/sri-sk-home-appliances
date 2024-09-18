import React from 'react'

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
      <svg
        className="mx-auto h-12 w-12 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.994-1.85l.007-.15V7c0-1.054-.816-1.918-1.85-1.994L18.75 5H5.25C4.196 5 3.332 5.816 3.256 6.85L3.25 7v11c0 1.054.816 1.918 1.85 1.994L5.25 20z"
        />
      </svg>
      <h1 className="text-xl font-semibold text-gray-800 mt-4">Failed to Load</h1>
      <p className="text-gray-600 mt-2">
        Oops! Something went wrong. Please try again later.
      </p>
    </div>
  </div>
  )
}

export default Error
