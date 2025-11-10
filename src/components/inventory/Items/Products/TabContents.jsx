import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import TransactionsTable from './TransactionsTable';
import { LuSlidersHorizontal } from 'react-icons/lu';
import { BiShare } from 'react-icons/bi';

// Mock data structure
const productData = {
    name: "PRODUCT NAME",
    salePrice: 100.00,
    purchasePrice: 80.00,
    availableForSale: 8,
    stockQuantity: 9,
    stockValue: 720.00,
    reservedQuantity: 1,
    currencySymbol: '৳'
};


const DetailItem = ({ label, value, isMonetary = false, isQuantity = false, currencySymbol = '' }) => {
    let displayValue = value;
    let valueColorClass = 'text-gray-900 font-medium'; // Default color

    if (isMonetary) {
        displayValue = `${value.toFixed(2)} ${currencySymbol}`;
        valueColorClass = 'text-green-600 font-semibold'; // Green for monetary
    } else if (isQuantity) {
        valueColorClass = 'text-green-600 font-semibold'; // Green for stock quantity
    } else {
        // For Stock Quantity / Reserved Quantity (right column), the image shows them as standard text color (or dark grey)
        valueColorClass = 'text-gray-900 font-medium';
    }

    // Adjust specific colors to match the image better (green for prices, available, and stock value)
    // Let's refine based strictly on the image: prices, available, stock value are green. The others are dark.
    if (label === 'SALE PRICE' || label === 'PURCHASE PRICE' || label === 'Available for Sale' || label === 'STOCK VALUE') {
        valueColorClass = 'text-green-600 font-semibold';
        if (label !== 'Available for Sale') {
            displayValue = `${value.toFixed(2)} ${currencySymbol}`;
        }
    } else {
        // Ensure text is correctly formatted for the right side labels that need to be bold/dark
        valueColorClass = 'text-gray-700 font-medium';
        if (label === 'STOCK QUANTITY' || label === 'RESERVED QUANTITY') {
            valueColorClass = 'text-gray-900 font-medium';
        }
    }


    return (
        <div className="flex justify-between py-1 text-sm">
            <span className="text-gray-600 pr-2">{label}:</span>
            <span className='border-dashed border-b flex-1'></span>
            <span className={valueColorClass}>
                {displayValue}
            </span>
        </div>
    );
};





const TabContents = () => {
    const { name, currencySymbol, ...details } = productData;

  // Split details into left and right columns for desktop view
  const leftDetails = [
    { label: 'SALE PRICE', value: details.salePrice },
    { label: 'PURCHASE PRICE', value: details.purchasePrice },
    { label: 'Available for Sale', value: details.availableForSale, isQuantity: true },
  ];

  const rightDetails = [
    { label: 'STOCK QUANTITY', value: details.stockQuantity },
    { label: 'STOCK VALUE', value: details.stockValue },
    { label: 'RESERVED QUANTITY', value: details.reservedQuantity },
  ];

    return (
        <div className="font-inter antialiased">
            {/* Main Card Container */}
            <div className="w-full bg-white border border-gray-300 rounded-xl shadow-md">

                <div className="p-4 bg-white shadow-lg rounded-tl-lg rounded-tr-lg mx-auto border border-gray-200 mb-5">

                    {/* Header Section */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-4">

                        {/* Product Name and Icon */}
                        <div className="flex items-center text-sm sm:text-lg font-semibold text-gray-800 tracking-wider">
                            <span className="uppercase mr-2">{name}</span>
                            <BiShare className="w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
                        </div>

                        {/* Adjust Item Button */}
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out">
                            <LuSlidersHorizontal className="w-4 h-4 mr-2" />
                            ADJUST ITEM
                        </button>
                    </div>

                    {/* Details Grid Section - Responsive Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">

                        {/* Left Column Details */}
                        <div className="space-y-1">
                            {leftDetails.map(item => (
                                <DetailItem
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                    currencySymbol={currencySymbol}
                                />
                            ))}
                        </div>

                        {/* Right Column Details - Separated by an empty div for clean grid alignment on smaller screens */}
                        <div className="sm:hidden">
                            <div className="w-full h-px bg-gray-100 my-4"></div> {/* Separator for Mobile */}
                        </div>

                        <div className="space-y-1 sm:mt-0">
                            {rightDetails.map(item => (
                                <DetailItem
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                    currencySymbol={currencySymbol}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subtle Bottom Border (Matching the bottom line in the image) */}
                <div className="h-0.5 bg-gray-200 border-t border-b border-gray-300"></div>
                <TransactionsTable />
            </div>
        </div>
    )
}

export default TabContents