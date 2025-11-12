"use client";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiBox } from "react-icons/bi";
import { CiGlobe, CiMenuFries } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { GrCloudUpload } from "react-icons/gr";
import { ImBlog } from "react-icons/im";
import { IoMdClose, IoMdSync } from "react-icons/io";
import { IoChevronDownSharp, IoSearch, IoSettingsOutline } from "react-icons/io5";
import { PiBankLight, PiUsers } from "react-icons/pi";
import { TbShoppingBag } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { FaChartLine } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuWrench } from "react-icons/lu";
import { LiaMailBulkSolid } from "react-icons/lia";


import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.css";
import SettingsModal from "@/components/inventory/SettingsModal";

const mainRoute = "/inventory";

const initMenuItems = [
  {
    name: "Home", icon: <TiHomeOutline />, href: mainRoute
  },
  {
    name: "Parties",
    icon: <PiUsers />,
    subItems: [
      { name: "Party Details", href: mainRoute + "/parties/party-details" },
      { name: "Loyalty Points", href: mainRoute + "/parties/loyalty-points" },
    ],
  },
  {
    name: "Testing Pages",
    icon: <PiUsers />,
    subItems: [
      { name: "Purchase Form", href: mainRoute + "/testing/purchase-form" },
      { name: "Item Form", href: mainRoute + "/testing/item-form" },
      { name: "Add More Menu Col", href: mainRoute + "/testing/menucolumn" },
      { name: "Edit Profile", href: mainRoute + "/testing/edit-profile" },
      { name: "Notification", href: mainRoute + "/testing/notification" },
      { name: "Setting Modal", href: mainRoute + "/testing/setting-modal" },
      { name: "Change Company", href: "/change-company" },
    ],
  },
  {
    name: "Items",
    icon: <TbShoppingBag />, subItems: [
      { name: "Products", href: mainRoute + "/items/products" },
      { name: "Services", href: mainRoute + "/items/services" },
      { name: "Category", href: mainRoute + "/items/category" },
      { name: "Units", href: mainRoute + "/items/units" },
    ],
  },
  {
    name: "Sales",
    icon: <HiOutlineReceiptPercent />, subItems: [
      { name: "Sale Invoices", href: mainRoute + "/sales/sale-invoices" },
      { name: "Estimate/ Quotation", href: mainRoute + "/sales/estimate-quotation" },
      { name: "Proforma Invoice", href: mainRoute + "/sales/proforma-invoice" },
      { name: "Payment-In", href: mainRoute + "/sales/payment-in" },
      { name: "Sale Order", href: mainRoute + "/sales/sale-order" },
      { name: "Delivery Challange", href: mainRoute + "/sales/delivery-challange" },
      { name: "Sale Return", href: mainRoute + "/sales/sale-return" },
      { name: "Vypar POS", href: mainRoute + "/sales/inventory-pos" },
    ],
  },
  {
    name: "Purchase & Expense",
    icon: <IoCartOutline />, subItems: [
      { name: "Purchase Bils", href: mainRoute + "/purchase/purchase-bils" },
      { name: "Payment-Out", href: mainRoute + "/purchase/payment-out" },
      { name: "Expenses", href: mainRoute + "/purchase/expenses" },
      { name: "Purchase Order", href: mainRoute + "/purchase/purchase-order" },
      { name: "Purchase Return/ Dr. Note", href: mainRoute + "/purchase/purchase-return" },
    ],
  },
  {
    name: "Grow Your Business",
    icon: <FaChartLine />, subItems: [
      { name: "Google Profile Manager", href: mainRoute + "/business/google-profile" },
      { name: "Marketing Tools", href: mainRoute + "/business/marketing-tools" },
      { name: "Online Store", href: mainRoute + "/business/online-store" },
    ],
  },
  {
    name: "Cash & Bank",
    icon: <PiBankLight />, subItems: [
      { name: "Bank Accounts", href: mainRoute + "/cash-bank/bank-accounts" },
      { name: "Cash In Hand", href: mainRoute + "/cash-bank/cash-in-hand" },
      { name: "Cheques", href: mainRoute + "/cash-bank/cheques" },
      { name: "Loan Accounts", href: mainRoute + "/cash-bank/loan-accounts" },
    ],
  },
  {
    name: "Reports",
    icon: <HiOutlineDocumentReport />,
    href: mainRoute + "/reports",
  },
  {
    name: "Sync, Share & Backup",
    icon: <IoMdSync />, subItems: [
      { name: "Sync & Share", href: mainRoute + "/sync-share-backup/sync-share" },
      { name: "Auto Backup", href: mainRoute + "/sync-share-backup/auto-backup" },
      { name: "Backup To Computer", href: mainRoute + "/sync-share-backup/backup-to-computer" },
      { name: "Backup To Drive", href: mainRoute + "/sync-share-backup/backup-to-drive" },
      { name: "Restore Backup", href: mainRoute + "/sync-share-backup/restore-backup" },
    ],
  },
  {
    name: "Bulk GST Update",
    icon: <LiaMailBulkSolid />,
    href: mainRoute + "/bulk-gst-update",
  },
  {
    name: "Utilities",
    icon: <LuWrench />, subItems: [
      { name: "Import Items", href: mainRoute + "/utilities/import-items" },
      { name: "Barcode Generator", href: mainRoute + "/utilities/barcode-generator" },
      { name: "Update Items In Buk", href: mainRoute + "/utilities/update-bulk" },
      { name: "Import Parties", href: mainRoute + "/utilities/import-parties" },
      { name: "Exports To Tally", href: mainRoute + "/utilities/exports-tally" },
      { name: "Export Items", href: mainRoute + "/utilities/export-items" },
      { name: "Verify My Data", href: mainRoute + "/utilities/verify-data" },
      { name: "Recycle Bin", href: mainRoute + "/utilities/recycle-bin" },
      { name: "Close Financial Year", href: mainRoute + "/utilities/close-financial" },
    ],
  },
  {
    name: "Uploaded Files",
    icon: <GrCloudUpload />,
    href: mainRoute + "/uploaded-files",
  },
  {
    name: "Settings",
    icon: "⚙️",
    subItems: [
      { name: "GENERAL", href: mainRoute + "/settings/general" },
      { name: "TRANSACTION", href: mainRoute + "/settings/transaction" },
      { name: "PRINT", href: mainRoute + "/settings/print" },
      { name: "TAXES", href: mainRoute + "/settings/taxes" },
      { name: "TRANSACTION MESSAGE", href: mainRoute + "/settings/transaction-message" },
      { name: "PARTY", href: mainRoute + "/settings/party" },
      { name: "ITEM", href: mainRoute + "/settings/item" },
      { name: "SERVICE REMINDERS", href: mainRoute + "/settings/service-reminders" },
    ],
  },
  // {
  // 	name: "Reports",
  // 	icon: <HiOutlineDocumentReport />,
  // 	subItems: [
  // 		{
  // 			name: "In House Products Sale",
  // 			href: "/cms/reports/inhouse-product-sale",
  // 		},
  // 		{ name: "Products Stock", href: "/cms/reports/products-stock" },
  // 	],
  // },
  {
    name: "Blog System",
    icon: <ImBlog />,
    subItems: [
      { name: "Create Post", href: "/cms/blogs/create-post" },
      { name: "All Posts", href: "/cms/blogs/all-posts" },
      { name: "Categories", href: "/cms/blogs/blog-category" },
    ],
  },
  // {
  // 	name: "Marketing",
  // 	icon: <IoMegaphoneOutline />,
  // 	subItems: [
  // 		{ name: "Flash Deals", href: "/cms/marketing/flash-deals" },
  // 		{ name: "Newsletters", href: "/cms/marketing/newsletters" },
  // 		{ name: "Subscribers", href: "/cms/marketing/subscribers" },
  // 	],
  // },
  // {
  // 	name: "Support",
  // 	icon: <MdSupportAgent />,
  // 	subItems: [
  // 		{ name: "Ticket", href: "#" },
  // 		{ name: "Product Conversations", href: "#" },
  // 		{ name: "Product Queries", href: "#" },
  // 	],
  // },
  // {
  // 	name: "Shiping",
  // 	icon: <FaShippingFast />,
  // 	subItems: [
  // 		{ name: "Shiping Countries", href: "/cms/shiping-countries" },
  // 		{ name: "Shiping State", href: "/cms/shiping-state" },
  // 		{ name: "Shiping Cities", href: "/cms/shiping-cities" },
  // 	],
  // },
];

const Layout = (props) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);
  const [menuItems, setMenuItems] = useState(initMenuItems || []);
  const [searchValue, setSearchValue] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Start closed

  // Replaced with static data since Firebase auth is removed
  const defaultAvatar = `/default-avatar.png`; // Placeholder for a local or default avatar URL
  const pathName = usePathname();

  const boxRef = useRef(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      if (768 > screen.width) {
        setToggleSidebar(false); // Close the sidebar when clicking outside
      }
    }
  };

  useEffect(() => {
    setScreenWidth(screen.width);
    document.title = "Dashbaord";
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [screenWidth]);

  // find menu items in search box
  const filterMenuItems = (menu, searchTerm) => {
    return menu
      .map((item) => {
        // Check if the main item matches
        if (item.name.toLowerCase().includes(searchTerm?.toLowerCase())) {
          return item;
        }

        // If it has subItems, filter them
        if (item.subItems) {
          const filteredSubItems = item.subItems.filter((subItem) =>
            subItem.name
              .toLowerCase()
              .includes(searchTerm && searchTerm.toLowerCase())
          );

          // Return the parent with filtered subItems if any match
          if (filteredSubItems.length > 0) {
            return { ...item, subItems: filteredSubItems };
          }
        }

        return null;
      })
      .filter(Boolean); // Remove null values
  };

  // handle change seach box value
  const handleSearch = (e) => {
    if (e.length === 0) {
      setSearchValue("");
    } else {
      setSearchValue(e.toLowerCase());
    }
    const filteredMenu = filterMenuItems(initMenuItems, searchValue);
    setMenuItems(filteredMenu);
  };

  return (
    <div className={`flex ${toggleSidebar ? "gap-5" : "gap-0"}`}>
      {/* sidebar 	*/}
      <div
        ref={boxRef}
        className={`${toggleSidebar
          ? "w-[256px] visible fixed z-20"
          : "w-[0px] invisible fixed z-0"
          } transition-all overflow-hidden bg-gray-900 text-white p-4 h-screen`}
      >
        <Link href="/cms">
          <Image
            className="my-5 h-16 object-contain"
            width={200}
            height={100}
            alt="Dashboard Logo"
            src="/logo.png"
          />
        </Link>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search in menu"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-2 pl-4 pr-10 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          {searchValue ? (
            <IoMdClose
              onClick={() => {
                setSearchValue("");
                setMenuItems(initMenuItems);
              }}
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
            />
          ) : (
            <IoSearch className="absolute right-3 top-2.5 text-gray-400" />
          )}
        </div>
        <ul className="custom-scrollbox pb-10">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item?.href || "#"}
                className={`flex justify-between items-center w-full p-3 mb-1 ${item?.href == pathName && "bg-gray-700"
                  } rounded-lg transition-all hover:bg-gray-700 ${item?.subItems
                    ? item?.subItems.some(
                      (nested) => pathName === nested?.href
                    ) && "bg-gray-700"
                    : ""
                  }`}
                onClick={() => item.subItems && toggleDropdown(index)}
              >
                <span className="flex items-center gap-2">
                  {item.icon} {item.name}
                </span>
                {item.subItems && (
                  <IoChevronDownSharp
                    className={`transition-transform ${openDropdown === index ? "rotate-180" : "rotate-0"
                      }`}
                  />
                )}
              </Link>

              {/* DropDown 	*/}
              {item.subItems && (
                <ul
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openDropdown === index ? "opacity-100" : "opacity-0"
                    }`}
                  style={{
                    maxHeight:
                      openDropdown === index
                        ? `${item?.subItems.length * 4}rem`
                        : "0",
                  }}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`pl-8 py-2 hover:bg-gray-800 rounded-md mt-1 ${pathName === subItem?.href && "bg-gray-800"
                        }`}
                    >
                      <Link
                        href={subItem?.href}
                        className=" flex gap-2 items-center"
                      >
                        <span
                          className={`${pathName === subItem?.href &&
                            "bg-slate-100 w-[7px] h-[7px]"
                            } w-[5px] h-[5px] rounded-full border-slate-500 border-[1px]`}
                        ></span>
                        <span>{subItem?.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`mt-[70px] w-full transition-all ${toggleSidebar ? "md:ml-[256px] ml-0" : "ml-0"
          }`}
      >
        <div>{props.children}</div>
      </div>
      {/* Top Bar */}
      <div
        className={`fixed ${toggleSidebar
          ? "md:left-[256px] left-0 md:w-[calc(100%-256px)] w-full"
          : "left-0 w-full"
          } transition-all bg-white shadow-md p-4 flex justify-between items-center h-[70px] overflow-hidden z-10`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setToggleSidebar(!toggleSidebar);
            }}
          >
            <CiMenuFries className="text-gray-700 cursor-pointer" size={24} />
          </button>
          <CiGlobe className="text-gray-700 cursor-pointer" size={24} />
          <Link
            href="/cms"
            className="text-gray-700 font-semibold hover:text-blue-500"
          >
            Dashboard
          </Link>
          <Link
            href="/cms/all-Orders"
            className="text-gray-700 hover:text-blue-500"
          >
            Orders
          </Link>
          <Link
            href="/cms/website-setup/homepage"
            className="text-gray-700 hover:text-blue-500"
          >
            Homepage Settings
          </Link>
        </div>
        <div className="lg:flex hidden items-center gap-4">
          <Link
            href="/cms/create-product"
            className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-lg"
          >
            Add New <AiOutlinePlus size={16} />
          </Link>
          <GoBell className="text-gray-700 cursor-pointer" size={24} />
          <button onClick={() => setIsSettingsOpen(true)}> <IoSettingsOutline className="text-gray-700 cursor-pointer" size={24} /></button>
          <div onClick={() => setIsSettingsOpen(true)} className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
            <img
              width={30}
              height={30}
              alt="icon logo"
              src={defaultAvatar} // Using the static placeholder
              className="rounded-full"
            />
          </div>
          <div onClick={() => setIsSettingsOpen(true)} className="text-gray-700 flex flex-col cursor-pointer">
            <span className="block font-semibold">
              {/* Removed dynamic user data */}
              Admin User
            </span>
            <span className="text-sm">admin</span>
          </div>
        </div>
      </div>

      <SettingsModal
        isVisible={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
    // Removed <QueryClientProvider> closing tag
  );
};

export default Layout;