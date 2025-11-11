"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { FaFilter, FaRegFileAlt, FaSearch, FaTimes } from "react-icons/fa";
import { FaPlus, FaChevronDown } from 'react-icons/fa';
import { BiDotsVerticalRounded } from "react-icons/bi";
import TabContents from "@/components/inventory/Items/Units/TabContents";
import CustomModal from "@/components/inventory/Items/Units/CustomModal";




const tabs = [
  { id: "bags", label: "BAGS", shortName: "Bag", conversion: ["1 Bag = variable quantity depending on item (e.g., 50 kg of rice)"] },
  { id: "bottles", label: "BOTTLES", shortName: "Btl", conversion: ["1 Bottle = variable volume (e.g., 500 ml, 1 L)"] },
  { id: "box", label: "BOX", shortName: "Box", conversion: ["1 Box = multiple pieces/items (e.g., 12 pcs, 24 pcs)"] },
  { id: "bundles", label: "BUNDLES", shortName: "Bdl", conversion: ["1 Bundle = variable count (e.g., 10 units, 100 sheets)"] },
  { id: "cans", label: "CANS", shortName: "Can", conversion: ["1 Can = variable volume (e.g., 330 ml, 500 ml)"] },
  { id: "cartons", label: "CARTONS", shortName: "Ctn", conversion: ["1 Carton = multiple boxes or pieces (e.g., 12 boxes, 24 pcs)"] },
  { id: "dozens", label: "DOZENS", shortName: "Dzn", conversion: ["1 Dozen = 12 pieces","1 DOZENS = 12 NUMBERS"] },
  { id: "grammes", label: "GRAMMES", shortName: "Gm", conversion: ["1 Gram = 0.001 Kilogram", "1000 Gram = 1 Kilogram"] },
  { id: "kilograms", label: "KILOGRAMS", shortName: "Kg", conversion: ["1 Kilogram = 1000 Grams", "1 Kilogram = 2.20462 Pounds","KILOGRAMS = 0.01 QUINTAL"] },
  { id: "litre", label: "LITRE", shortName: "Ltr", conversion: ["1 Litre = 1000 Millilitres", "1 Litre = 1.0567 Quarts"] },
  { id: "meters", label: "METERS", shortName: "Mtr", conversion: ["1 Meter = 100 Centimeters", "1 Meter = 3.28084 Feet"] },
  { id: "mililitre", label: "MILILITRE", shortName: "Ml", conversion: ["1000 Millilitres = 1 Litre","1 MILILITRE = 0.001 LITRE"] },
  { id: "numbers", label: "NUMBERS", shortName: "Nos", conversion: ["1 Number = 1 Unit/Piece"] },
  { id: "packs", label: "PACKS", shortName: "Pac", conversion: ["1 Pack = multiple units (e.g., 6 pcs, 12 pcs)"] },
  { id: "pairs", label: "PAIRS", shortName: "Prs", conversion: ["1 Pair = 2 Pieces"] },
  { id: "pieces", label: "PIECES", shortName: "Pcs", conversion: ["1 Piece = 1 Unit"] },
  { id: "quintal", label: "QUINTAL", shortName: "Qtl", conversion: ["1 Quintal = 100 Kilograms"] },
  { id: "rolls", label: "ROLLS", shortName: "Rol", conversion: ["1 Roll = variable length (e.g., 10 meters, 100 meters)"] },
  { id: "squarefeet", label: "SQUARE FEET", shortName: "Sqf", conversion: ["1 Square Foot = 0.092903 Square Meter", "1 Square Meter = 10.7639 Square Feet"] },
  { id: "squaremeters", label: "SQUARE METERS", shortName: "Sqm", conversion: ["1 Square Meter = 10.7639 Square Feet", "1 Square Foot = 0.092903 Square Meter"] },
  { id: "tablets", label: "TABLETS", shortName: "Tbs", conversion: ["1 Tablet = 1 Unit (medicine or compressed item)","1 TABLETS = 10 ROLLS"] }
];



const Units = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [threeDotDD, setThreeDotDD] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);


  // 1. New state for the search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Get the current active tab from the URL search parameters, default to "general"
  const activeTab = searchParams.get('tab') || 'general';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile view

  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Placeholder functions for dropdown actions
  const handleView = (tabId) => { console.log('Viewing tab:', tabId); /* Your view logic */ setOpenDropdownId(null); };
  const handleDelete = (tabId) => { console.log('Deleting tab:', tabId); /* Your delete logic */ setOpenDropdownId(null); };


  // 2. Filtered Tabs based on search term
  const filteredTabs = useMemo(() => {
    if (!searchTerm) {
      return tabs;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return tabs.filter(tab =>
      // Search by label (Party Name) or shortName
      tab.label.toLowerCase().includes(lowerCaseSearchTerm) ||
      String(tab.shortName).includes(lowerCaseSearchTerm)
    );
  }, [tabs, searchTerm]);

  // Function to clear the search input
  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  // Function to update the URL when a tab is clicked
  const handleTabChange = useCallback((tabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    // Use replace() to update the URL without adding a new entry to browser history
    router.replace(`?${params.toString()}`);
    // Auto-close sidebar on mobile
    setIsSidebarOpen(false);
  }, [router, searchParams]);

  // Ensure a default 'tab' parameter exists in the URL on initial load
  useEffect(() => {
    if (!searchParams.get('tab')) {
      handleTabChange('general');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Define a palette of professional text and background color utility classes.
  const colorPalette = [
    { bg: 'bg-indigo-100', text: 'text-indigo-800' }, // Soft Indigo
    { bg: 'bg-teal-100', text: 'text-teal-800' }, // Muted Teal
    { bg: 'bg-orange-100', text: 'text-orange-800' }, // Warm Orange
    { bg: 'bg-pink-100', text: 'text-pink-800' },  // Subtle Pink
    { bg: 'bg-purple-100', text: 'text-purple-800' }, // Light Purple
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row p-4 md:p-6 w-full mx-auto bg-white shadow rounded-lg">
        {/* 📱 Mobile Sidebar Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            {isSidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
        </div>

        {/* 🧭 Sidebar Navigation (Tabs) */}
        <div
          className={`md:w-1/5 min-w-[200px] w-full overflow-x-hidden md:border-r pr-4 transition-all ${isSidebarOpen ? "block" : "hidden md:block"
            }`}
        >
          <div className="mb-3 flex justify-between items-center">
            <div className="relative">
              <button
                onClick={openModal} className="flex cursor-pointer items-center rounded-lg shadow-md overflow-hidden">
                {/* Plus icon and text section */}
                <div className="flex items-center px-4 h-9 text-white font-medium text-base bg-[#F3A33A] hover:bg-[#F5B358] transition duration-150 ease-in-out">
                  <FaPlus className="mr-2" />
                  Add Units
                </div>
              </button>
            </div>
            <div className="relative">
              <button onClick={() => setThreeDotDD(!threeDotDD)} className="cursor-pointer"><BiDotsVerticalRounded className="text-2xl" /></button>

              {threeDotDD && <div className="fixed inset-0 z-10" onClick={() => setThreeDotDD(!threeDotDD)} />}
              <div className="absolute z-20 right-0 top-5">
                <ul className={`flex-col bg-white border rounded-lg shadow-md mt-2 w-48 justify-start p-2 ${threeDotDD ? "animate-in flex" : "hidden"}`}>
                  <li className="whitespace-nowrap p-1 hover:bg-gray-200 transition-all rounded">No Options available</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            {/* 1. Search Input Field with Close Button */}
            <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm mb-0">
              {/* Search Icon */}
              <FaSearch className="h-5 w-5 text-gray-400" />

              {/* Input Field */}
              <input
                type="text"
                placeholder="Search Full or Short Name"
                className="w-full text-base text-gray-600 placeholder-gray-400 focus:outline-none"
                value={searchTerm} // Controlled component
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
              />

              {/* Close Button (Conditional Rendering) */}
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="text-gray-500 hover:text-red-600 transition-colors p-1"
                  aria-label="Clear Search"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* 2. Table Header / Column Row */}
            <div className="flex mt-4 text-gray-700 font-semibold text-sm border-t border-b border-gray-300">
              <div className="flex-1 p-3 flex items-center justify-between border-r border-gray-200 bg-blue-50">
                <span className="truncate">Full Name</span>
                <FaFilter className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-600 transition-colors" />
              </div>
              <div className="w-28 p-3 flex items-center justify-start bg-blue-50">
                <span>Short Name</span>
              </div>
            </div>
          </div>

          {/* Tab List with Smooth Effect */}
          <div className="flex flex-col space-y-2 mt-2">
            {filteredTabs.length > 0 ? (
              filteredTabs.map((tab, index) => {
                // Find the original index for color styling
                const originalIndex = tabs.findIndex(t => t.id === tab.id);
                const colorStyle = colorPalette[originalIndex % colorPalette.length];
                // Check if the current tab's dropdown is open
                const isDropdownOpen = openDropdownId === tab.id;

                return (
                  <div
                    key={tab.id}
                    // The main item is now a div or a list item to contain the button and the dropdown
                    // The button will handle the main tab click, and the dropdown button will handle the menu
                    className={`py-2 px-4 text-left rounded-md font-medium transition-all duration-300 ease-in-out flex justify-between items-center ${activeTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {/* Left side: Tab Label */}
                    <button
                      onClick={() => handleTabChange(tab.id)}
                      className="flex-grow text-left focus:outline-none cursor-pointer"
                    >
                      {tab.label}
                    </button>

                    {/* Right side: shortName and Dropdown Menu (Flex container for alignment) */}
                    <div className="flex items-center space-x-3 relative">
                      {/* Tab shortName */}
                      <span
                        className={`${colorStyle.bg} ${colorStyle.text} px-2 py-0.5 rounded-full text-xs font-semibold`}
                      >
                        {tab?.shortName}
                      </span>

                      {/* Three Dots Button for Dropdown */}
                      <button
                        onClick={(e) => {
                          // Stop event propagation to prevent the main tab click
                          e.stopPropagation();
                          // Toggle the dropdown state for this tab
                          setOpenDropdownId(isDropdownOpen ? null : tab.id);
                        }}
                        className={`p-1 rounded-full hover:bg-gray-200 focus:outline-none ${isDropdownOpen ? 'bg-gray-200' : ''}`}
                        aria-expanded={isDropdownOpen}
                        aria-label="More options"
                      >
                        {/* Three Dots Icon (Horizontal ellipsis) */}
                        <span className="text-xl leading-none cursor-pointer">...</span>
                      </button>

                      {/* Dropdown Content */}
                      {isDropdownOpen && <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />}
                      {isDropdownOpen && (
                        <div className="absolute right-0 md:top-full -top-[80px] mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleView(tab.id); // Call your view function
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(tab.id); // Call your delete function
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              // No results message
              <div className="p-4 text-center text-gray-500 italic">
                No result found for &quot;{searchTerm}&quot;.
              </div>
            )}
          </div>
        </div>

        {/* 📄 Content Area (Page Code) */}
        <div className="w-full md:w-3/4 pl-0 md:pl-6">
          {/* Conditional rendering based on the activeTab read from the URL */}
          {/* You can add a transition here for content as well if needed */}
          <div className="transition-opacity duration-300 ease-in-out">
            {tabs.map(tab => (
              activeTab === tab.id && <TabContents key={tab.id} content={tab} />
            ))}
          </div>

          {/* Placeholder for any content not tied to a specific tab, like the submission buttons */}
          <div className="pt-8">
            <p className="text-gray-500 italic">
              *The rest of your form submission buttons/logic would follow here, outside the main tab content area.*
            </p>
          </div>

        </div>
      </div>
      {/* The Custom Modal component */}
      {/* Create Category Modal */}
      <CustomModal isOpen={showModal} onClose={closeModal}>
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">New Unit</h2>
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="p-1 text-gray-400 rounded-full hover:bg-gray-50 hover:text-gray-600 transition"
          >
            {/* FaTimes (X icon) is used for the close button */}
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body (Input Field) */}
        <div className="p-6">
          <label htmlFor="unitName" className="block text-sm font-medium text-gray-700 mb-2">
            Unit Name
          </label>
          <input
            id="unitName"
            type="text"
            placeholder="Unit Name e.g., Kilogram"
            className="w-full px-4 py-3 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-inner"
          />
          <label htmlFor="shortName" className="block text-sm font-medium text-gray-700 my-2">
            Short Name
          </label>
          <input
            id="shortName"
            type="text"
            placeholder="Short Name e.g., Kg"
            className="w-full px-4 py-3 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-inner"
          />
        </div>

        {/* Modal Footer (Action Button) */}
        <div className="p-6 pt-0">
          <button
            onClick={() => {
              // Simulate category creation logic
              console.log('Category created!');
              closeModal();
            }}
            className="w-full py-3 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-red-700 transition duration-150 ease-in-out transform hover:scale-[1.01]"
          >
            Create
          </button>
        </div>
      </CustomModal>

    </div>
  );
};

export default Units;