"use client";
import EditUserFormModal from '@/components/inventory/sync/SyncShare/EditUserFormModal';
import React, { useState, useRef, useEffect } from 'react';
import {
    FaCrown, FaRegTrashAlt, FaPlus, FaQuestionCircle, FaEnvelope, FaPhoneAlt, FaCheckCircle, FaEdit, FaChevronDown, FaEllipsisV
} from 'react-icons/fa';

// We need to map the generic/library-agnostic names used previously 
// (e.g., IoMdAdd) to the Fa-prefixed names we just imported.
const IoMdAdd = FaPlus;
const IoMdHelpCircleOutline = FaQuestionCircle;
const IoMdMail = FaEnvelope;
const IoMdCall = FaPhoneAlt;
const IoMdCheckmarkCircleOutline = FaCheckCircle;
const FiEdit2 = FaEdit;
const FiChevronDown = FaChevronDown;
const HiOutlineDotsVertical = FaEllipsisV;


// --- Mock Data ---

const ROLES = [
    'Secondary Admin',
    'Salesman',
    'Biller',
    'Biller and Salesman',
    'CA/Accountant',
    'Stock Keeper',
    'CA/Account (Edit Access)',
];

const mockUsers = [
    {
        id: 1,
        fullName: 'Masud Khan',
        contact: 'callback991@gmail.com',
        type: 'email',
        status: 'Joined',
        role: 'Biller',
        canChangeRole: true,
    },
    {
        id: 2,
        fullName: 'Masud Khan',
        contact: '+880 2934294',
        type: 'phone',
        status: 'Removed',
        role: 'CA/Accountant',
        canChangeRole: false,
        actionText: 'Restore',
    },
    {
        id: 3,
        fullName: 'Jane Doe',
        contact: 'jane.doe@example.com',
        type: 'email',
        status: 'Joined',
        role: 'Stock Keeper',
        canChangeRole: true,
    },
];

// --- Sub-Components ---

const StatusBadge = ({ status }) => {
    const color = status === 'Joined' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
    const dotColor = status === 'Joined' ? 'bg-green-500' : 'bg-red-500';

    return (
        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${color}`}>
            <span className={`w-2 h-2 mr-2 rounded-full ${dotColor}`}></span>
            {status}
        </span>
    );
};

// --- MODIFIED RoleDropdown Component ---
const RoleDropdown = ({ currentRole, userId, onRoleChange, rowRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);

    // Calculate position when dropdown opens or when scrolling/resizing occurs
    const calculatePosition = () => {
        if (buttonRef.current && rowRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            // Position the top edge of the dropdown just below the button
            const top = buttonRect.bottom + 4;
            // Position the left edge of the dropdown to align with the start of the button
            const left = buttonRect.left;

            setPosition({ top, left });
        }
    };

    useEffect(() => {
        if (isOpen) {
            calculatePosition();
            // Recalculate position on scroll and resize events
            window.addEventListener('scroll', calculatePosition);
            window.addEventListener('resize', calculatePosition);
        } else {
            window.removeEventListener('scroll', calculatePosition);
            window.removeEventListener('resize', calculatePosition);
        }

        // Cleanup listeners
        return () => {
            window.removeEventListener('scroll', calculatePosition);
            window.removeEventListener('resize', calculatePosition);
        };
    }, [isOpen]);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the button and outside the dropdown menu itself
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                !event.target.closest('[data-dropdown-id="role-dropdown"]')
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        if (!isOpen) {
            // Recalculate position right before opening
            calculatePosition();
        }
        setIsOpen(!isOpen);
    };

    const handleChange = (newRole) => {
        onRoleChange(userId, newRole);
        setIsOpen(false);
    };

    // Only render the button here. The actual dropdown will be rendered at the root level (body/App container) using fixed position.
    return (
        <>
            <div className="relative inline-block text-left">
                <button
                    type="button"
                    ref={buttonRef}
                    className="inline-flex justify-center items-center text-blue-600 hover:text-blue-700 text-sm font-medium focus:outline-none"
                    onClick={handleToggle}
                    aria-expanded={isOpen}
                >
                    <span className="mr-1 py-1 px-2 bg-blue-50 rounded-lg">{currentRole}</span>
                    Change Role
                    <FiChevronDown className="-mr-1 ml-1 h-4 w-4" aria-hidden="true" />
                </button>
            </div>

            {/* Dropdown rendered outside the flow, using fixed positioning relative to the viewport */}
            {isOpen && (
                <div
                    data-dropdown-id="role-dropdown" // Custom attribute for click-outside logic
                    className="fixed z-50 w-56 origin-top-left rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform scale-100"
                    style={{ top: position.top, left: position.left }}
                    role="menu"
                >
                    <div className="py-1 max-h-60 overflow-y-auto" role="none">
                        {ROLES.map((role) => (
                            <button
                                key={role}
                                onClick={() => handleChange(role)}
                                className={`block w-full text-left px-4 py-2 text-sm transition duration-150 ease-in-out ${role === currentRole
                                    ? 'bg-blue-100 text-blue-800 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                role="menuitem"
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
// --- END MODIFIED RoleDropdown Component ---


// --- MODIFIED UserTableRow Component ---
const UserTableRow = ({ user, onAction, currentOpenDropdown, setCurrentOpenDropdown, onEdit }) => {
    const isDropdownOpen = currentOpenDropdown === user.id;
    const rowRef = useRef(null); // Reference to the table row

    return (
        <tr className="border-b hover:bg-gray-50 transition duration-150" ref={rowRef}>
            <td className="px-4 py-3 text-gray-800 font-medium">
                {user.fullName}
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">
                <div className="flex items-center">
                    {user.type === 'email' ? <IoMdMail className="mr-2 text-gray-500" /> : <IoMdCall className="mr-2 text-gray-500" />}
                    <a href={user.type === 'email' ? `mailto:${user.contact}` : `tel:${user.contact}`} className="hover:underline">
                        {user.contact}
                    </a>
                </div>
            </td>
            <td className="px-4 py-3">
                <StatusBadge status={user.status} />
            </td>
            <td className="px-4 py-3 min-w-[200px] relative">
                {user.canChangeRole ? (
                    <RoleDropdown
                        currentRole={user.role}
                        userId={user.id}
                        onRoleChange={onAction}
                        rowRef={rowRef} // Pass rowRef to RoleDropdown
                    // Removed internal state management props since RoleDropdown manages its own open state based on fixed position
                    />
                ) : (
                    <div className="flex items-center space-x-2">
                        <span className="py-1 px-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg">{user.role}</span>
                        <button
                            onClick={() => onAction(user.id, user.actionText)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition duration-150"
                        >
                            {user.actionText}
                        </button>
                    </div>
                )}
            </td>
            <td className="px-4 py-3">
                <div className="flex space-x-3 text-lg">
                    <button
                        onClick={() => onEdit(user.id, 'Edit')}
                        className="text-gray-500 hover:text-blue-600 transition duration-150 p-1 rounded-full hover:bg-blue-50"
                        aria-label="Edit User"
                    >
                        <FiEdit2 />
                    </button>
                    <button
                        onClick={() => onAction(user.id, 'Delete')}
                        className="text-gray-500 hover:text-red-600 transition duration-150 p-1 rounded-full hover:bg-red-50"
                        aria-label="Delete User"
                    >
                        <FaRegTrashAlt />
                    </button>
                </div>
            </td>
        </tr>
    );
};
// --- END MODIFIED UserTableRow Component ---


const UserCard = ({ user, onAction }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 space-y-3">
            <div className="flex justify-between items-start">
                <div className="text-lg font-semibold text-gray-800">{user.fullName}</div>
                <div className="text-sm">
                    <StatusBadge status={user.status} />
                </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center">
                    {user.type === 'email' ? <IoMdMail className="mr-2 text-gray-500" /> : <IoMdCall className="mr-2 text-gray-500" />}
                    <a href={user.type === 'email' ? `mailto:${user.contact}` : `tel:${user.contact}`} className="hover:underline">
                        {user.contact}
                    </a>
                </div>
            </div>

            <div>
                <div className="text-xs font-medium text-gray-500 mb-1 uppercase">Role</div>
                {user.canChangeRole ? (
                    // Use a simplified inline RoleDropdown for mobile cards, as clipping is less likely here.
                    // Note: If you want fixed positioning on mobile cards too, you would need to adjust this component's props.
                    <RoleDropdown
                        currentRole={user.role}
                        userId={user.id}
                        onRoleChange={onAction}
                        // Mock rowRef for mobile, or use a separate simplified dropdown component
                        rowRef={{ current: null }}
                    />
                ) : (
                    <div className="flex items-center space-x-2">
                        <span className="py-1 px-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg">{user.role}</span>
                        <button
                            onClick={() => onAction(user.id, user.actionText)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition duration-150"
                        >
                            {user.actionText}
                        </button>
                    </div>
                )}
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end space-x-3">
                <button
                    onClick={() => onAction(user.id, 'Edit')}
                    className="text-gray-500 hover:text-blue-600 transition duration-150 p-2 rounded-full hover:bg-blue-50 text-xl"
                    aria-label="Edit User"
                >
                    <FiEdit2 />
                </button>
                <button
                    onClick={() => onAction(user.id, 'Delete')}
                    className="text-gray-500 hover:text-red-600 transition duration-150 p-2 rounded-full hover:bg-red-50 text-xl"
                    aria-label="Delete User"
                >
                    <FaRegTrashAlt />
                </button>
            </div>
        </div>
    );
};


// --- Main Component ---

const App = () => {
    const [users, setUsers] = useState(mockUsers);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // Removed currentOpenDropdown state as the fixed position dropdowns manage their own state

    const handleRoleChange = (userId, newRole) => {
        // Logic to update the role in the state
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
        // In a real app, you would also call an API here.
        console.log(`User ${userId} role changed to: ${newRole}`);
    };

    const handleAction = (userId, action) => {
        if (action === 'Restore') {
            // Logic for restoring a user
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId ? { ...user, status: 'Joined', actionText: undefined } : user
                )
            );
            console.log(`User ${userId} restored.`);
        } else if (action === 'Edit') {
            setIsOpen(true)
        }
        else {
            // Generic action handler (Edit/Delete)
            console.log(`Action: ${action} for User ID: ${userId}`);
        }
    };

    const handleMoreOptions = (option) => {
        console.log(`Selected option: ${option}`);
        setIsMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="mx-auto">

                {/* Top Header Section */}
                <header className="flex sm:flex-nowrap flex-wrap gap-2 justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        Sync & Share
                        <FaCrown className="ml-2 text-yellow-500 text-xl" />
                    </h1>
                    <div className="flex space-x-3">
                        <button className="flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition duration-150 text-sm">
                            <IoMdHelpCircleOutline className="mr-1 text-lg" />
                            Know More
                        </button>
                        <button onClick={() => setIsOpen(true)} className="flex cursor-pointer items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-150 text-sm">
                            <IoMdAdd className="mr-1 text-lg" />
                            Add Users
                        </button>
                    </div>
                </header>

                {/* Current User & More Options */}
                <div className="flex justify-between items-start mb-8">
                    <p className="text-sm text-gray-600">
                        Currently logged in with the following number:
                        <br />
                        <span className="font-medium text-gray-800 flex items-center mt-0.5">
                            developer.mezbah@gmail.com
                            <IoMdCheckmarkCircleOutline className="ml-1 text-green-500" />
                            <IoMdMail className="ml-1 text-green-500" />
                        </span>
                    </p>

                    <div className="relative">
                        <button
                            className="p-2 rounded-full bg-white text-gray-500 shadow-md hover:bg-gray-100 transition duration-150 border border-gray-200"
                            aria-label="More options"
                        >
                            <HiOutlineDotsVertical className="text-xl" />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                    <button onClick={() => handleMoreOptions('Disable Sync')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150">
                                        Disable Sync
                                    </button>
                                    <button onClick={() => handleMoreOptions('Logout from Sync')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150">
                                        Logout from Sync
                                    </button>
                                    <button onClick={() => handleMoreOptions('See User Activity')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150">
                                        See User Activity
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Roles Section Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">User Roles</h2>
                    <button className="px-3 py-1.5 bg-white text-blue-600 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition duration-150 text-sm">
                        See User Activity
                    </button>
                </div>


                {/* Desktop Table View (lg screens and up) */}
                <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['FULL NAME', 'PHONE/E-MAIL', 'STATUS', 'ROLE', 'ACTIONS'].map((header) => (
                                        <th
                                            key={header}
                                            className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <UserTableRow
                                        key={user.id}
                                        user={user}
                                        onAction={handleRoleChange}
                                        onEdit={handleAction}
                                    // Removed currentOpenDropdown props as state is now internal
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View (sm to md screens) */}
                <div className="lg:hidden space-y-4">
                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onAction={user.canChangeRole ? handleRoleChange : handleAction}
                        />
                    ))}
                </div>
                <EditUserFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </div>
    );
};

export default App;