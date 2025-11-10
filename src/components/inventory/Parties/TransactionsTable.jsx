"use client"

import { useState } from "react"
import { FaSearch, FaPrint, FaDownload, FaFilter } from "react-icons/fa"
import TransactionRow from "./TransactionRow"
import MobileTransactionAccordion from "./MobileTransactionAccordion"
import { PiFileXlsBold } from "react-icons/pi"

const TRANSACTIONS = [
    {
        id: 1,
        type: "Sale",
        number: "1",
        date: "09/11/2025",
        total: 100.0,
        balance: 0.0,
    },
    {
        id: 2,
        type: "Purchase Order",
        number: "1",
        date: "09/11/2025",
        total: 150.0,
        balance: 50.0,
    },
    {
        id: 3,
        type: "Debit Note",
        number: "",
        date: "09/11/2025",
        total: 300.0,
        balance: 300.0,
    },
]

export default function TransactionsTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
    const [filteredTransactions, setFilteredTransactions] = useState(TRANSACTIONS)

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)

        const filtered = TRANSACTIONS.filter(
            (transaction) =>
                transaction.type.toLowerCase().includes(term) ||
                transaction.number.toLowerCase().includes(term) ||
                transaction.date.includes(term),
        )
        setFilteredTransactions(filtered)
    }

    const handleSort = (key) => {
        let direction = "asc"
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }

        const sorted = [...filteredTransactions].sort((a, b) => {
            if (key === "total" || key === "balance") {
                return direction === "asc" ? a[key] - b[key] : b[key] - a[key]
            }
            return direction === "asc"
                ? String(a[key]).localeCompare(String(b[key]))
                : String(b[key]).localeCompare(String(a[key]))
        })

        setSortConfig({ key, direction })
        setFilteredTransactions(sorted)
    }

    return (
        <div className="w-full p-4">
            {/* Header with title and actions */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                <div className="flex items-center gap-2">
                    <button className="rounded-lg bg-gray-100 p-2.5 text-gray-700 hover:bg-gray-200 transition-colors">
                        <FaPrint size={18} />
                    </button>
                    <button>
                        <PiFileXlsBold className=" text-green-500 text-2xl font-medium hover:bg-green-600 transition-colors flex items-center gap-2" />
                    </button>
                </div>
            </div>

            {/* Search bar */}
            <div className="mb-6">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-6 py-3 text-left">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</span>
                                    <button onClick={() => handleSort("type")} className="text-gray-400 hover:text-gray-600">
                                        <FaFilter size={16} />
                                    </button>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Number</span>
                                    <button onClick={() => handleSort("number")} className="text-gray-400 hover:text-gray-600">
                                        <FaFilter size={16} />
                                    </button>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</span>
                                    <button onClick={() => handleSort("date")} className="text-gray-400 hover:text-gray-600">
                                        <FaFilter size={16} />
                                    </button>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</span>
                                    <button onClick={() => handleSort("total")} className="text-gray-400 hover:text-gray-600">
                                        <FaFilter size={16} />
                                    </button>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Balance</span>
                                    <button onClick={() => handleSort("balance")} className="text-gray-400 hover:text-gray-600">
                                        <FaFilter size={16} />
                                    </button>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-center">
                                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction, index) => (
                            <TransactionRow key={transaction.id} transaction={transaction} isAlternate={index % 2 === 0} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden space-y-3">
                {filteredTransactions.map((transaction) => (
                    <MobileTransactionAccordion key={transaction.id} transaction={transaction} />
                ))}
            </div>

            {/* Empty state */}
            {filteredTransactions.length === 0 && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center">
                    <p className="text-gray-500">No transactions found</p>
                </div>
            )}
        </div>
    )
}
