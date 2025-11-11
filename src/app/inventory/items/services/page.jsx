import React from 'react'
import { FaClipboardList, FaShoppingBasket, FaTruck, FaHome } from 'react-icons/fa';

// A component to simulate the clustered illustration style
const ServiceIllustration = () => (
  <div className="relative w-52 h-52 mx-auto mb-8">
    {/* Soft, clustered background shape (mimics the original light blue/cream blob) */}
    <div className="absolute inset-0 m-auto w-40 h-40 bg-blue-100 rounded-full opacity-60 filter blur-lg"></div>

    {/* Central main element (The checklist/invoice) */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-2xl shadow-2xl z-10 border border-gray-100">
      {/* Used FaClipboardList */}
      <FaClipboardList className="w-12 h-12 text-blue-600" />
    </div>

    {/* Smaller, decorative service icons around the main cluster */}
    <div className="absolute top-4 left-10 p-2 bg-yellow-100 rounded-full shadow-md z-20">
      {/* Used FaShoppingBasket */}
      <FaShoppingBasket className="w-5 h-5 text-yellow-600" />
    </div>
    <div className="absolute top-8 right-8 p-2 bg-red-100 rounded-full shadow-md z-20">
      {/* Used FaHome (equivalent to FaHouse in the older set) */}
      <FaHome className="w-5 h-5 text-red-600" />
    </div>
    <div className="absolute bottom-6 left-6 p-2 bg-green-100 rounded-full shadow-md z-20">
      {/* Used FaTruck */}
      <FaTruck className="w-5 h-5 text-green-600" />
    </div>
  </div>
);

const page = () => {
  return (
  <div className="min-h-[80vh] flex items-center justify-center bg-white p-4 font-sans antialiased">
      <div className="max-w-xl text-center p-8 rounded-xl">
        
        {/* The Illustration */}
        <ServiceIllustration />
        
        {/* The Text Description */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-md mx-auto leading-relaxed px-4">
          Add services you provide to your customers and create **Sale invoices** for them faster.
        </p>
        
        {/* The Action Button */}
        <button
          className="
            inline-flex items-center justify-center
            px-10 py-4
            text-lg font-bold text-white
            bg-orange-500
            hover:bg-orange-600
            transition duration-300 ease-in-out
            rounded-full
            shadow-xl shadow-orange-400/50
            transform active:scale-95
            focus:outline-none focus:ring-4 focus:ring-orange-200
            w-auto
          "
        >
          Add Your First Service
        </button>
      </div>
    </div>
  )
}

export default page