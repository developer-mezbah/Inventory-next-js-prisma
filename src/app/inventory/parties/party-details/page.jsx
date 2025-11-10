"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa"; // Import FaTimes for the close button
import HeaderSection from "../../../../components/inventory/Parties/HeaderSectionOfTabs";
import TabContents from "@/components/inventory/Parties/TabContents";

const PartDetails = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. New state for the search input value
    const [searchTerm, setSearchTerm] = useState("");

    // Get the current active tab from the URL search parameters, default to "general"
    const activeTab = searchParams.get('tab') || 'general';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile view

    const tabs = [
        { id: "general", label: "General", amount: 100 },
        { id: "files-media", label: "Files & Media", amount: 200 },
        { id: "price-stock", label: "Price & Stock", amount: 500 },
        { id: "seo", label: "SEO", amount: 300 },
        { id: "frequently-bought", label: "Frequently Brought", amount: 100 },
    ];

    // 2. Filtered Tabs based on search term
    const filteredTabs = useMemo(() => {
        if (!searchTerm) {
            return tabs;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return tabs.filter(tab =>
            // Search by label (Party Name) or amount
            tab.label.toLowerCase().includes(lowerCaseSearchTerm) ||
            String(tab.amount).includes(lowerCaseSearchTerm)
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
            <HeaderSection />
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
                    <div className="mx-auto">
                        {/* 1. Search Input Field with Close Button */}
                        <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm mb-0">
                            {/* Search Icon */}
                            <FaSearch className="h-5 w-5 text-gray-400" />

                            {/* Input Field */}
                            <input
                                type="text"
                                placeholder="Search Party Name or Amount"
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
                                <span className="truncate">Party Name</span>
                                <FaFilter className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-600 transition-colors" />
                            </div>
                            <div className="w-28 p-3 flex items-center justify-start bg-blue-50">
                                <span>Amount</span>
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

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        // Added a transition class for the smooth effect on appearance/disappearance
                                        className={`py-2 px-4 text-left rounded-md font-medium transition-all duration-300 ease-in-out flex justify-between items-center flex-wrap ${activeTab === tab.id
                                            ? "bg-blue-100 text-blue-600"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {tab.label}
                                        <span
                                            className={`${colorStyle.bg} ${colorStyle.text} px-2 py-0.5 ml-2 rounded-full text-xs font-semibold`}
                                        >
                                            {tab?.amount + ".00"}
                                        </span>
                                    </button>
                                );
                            })
                        ) : (
                            // No results message
                            <div className="p-4 text-center text-gray-500 italic">
                                No parties found for "{searchTerm}".
                            </div>
                        )}
                    </div>
                </div>

                {/* 📄 Content Area (Page Code) */}
                <div className="w-full md:w-3/4 pl-0 md:pl-6">
                    {/* Conditional rendering based on the activeTab read from the URL */}
                    {/* You can add a transition here for content as well if needed */}
                    <div className="transition-opacity duration-300 ease-in-out">
                        {activeTab === "general" && <TabContents/>}
                        {activeTab === "files-media" && "Files & Media Tab Content Here"}
                        {activeTab === "price-stock" && "Price & Stock Tab Content Here"}
                        {activeTab === "seo" && "SEO Tab Content Here"}
                        {activeTab === "frequently-bought" && "Frequently Bought Tab Content Here"}
                    </div>

                    {/* Placeholder for any content not tied to a specific tab, like the submission buttons */}
                    <div className="pt-8">
                        <p className="text-gray-500 italic">
                            *The rest of your form submission buttons/logic would follow here, outside the main tab content area.*
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PartDetails;