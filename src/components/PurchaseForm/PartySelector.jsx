"use client"

import { useState } from "react"
import { FiChevronDown, FiPlus } from "react-icons/fi"
import AddPartyModal from "./AddPartyModal"
import useOutsideClick from "@/hook/useOutsideClick"

export default function PartySelector({ selectedParty, onSelect }) {
  const [parties, setParties] = useState([
    { id: 1, name: "atesting 2", balance: 100, status: "active" },
    { id: 2, name: "I dont know", balance: 300, status: "pending" },
    { id: 3, name: "testing party", balance: 248, status: "active" },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [newPartyName, setNewPartyName] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAddPartyModal, setShowAddPartyModal] = useState(false)

  const partySelectorRef = useOutsideClick(() => setIsOpen(false));
  const partyModalRef = useOutsideClick(() => setShowAddPartyModal(false));

  const handleAddParty = () => {
    if (newPartyName.trim()) {
      const newParty = {
        id: Math.max(...parties.map((p) => p.id), 0) + 1,
        name: newPartyName,
        balance: 0,
        status: "active",
      }
      setParties([...parties, newParty])
      onSelect(newParty)
      setNewPartyName("")
      setShowAddForm(false)
      setIsOpen(false)
    }
  }

  const handleAddPartyClick = () => {
    setShowAddPartyModal(true)
  }

  const handleSaveParty = (formData) => {
    if (formData.partyName.trim()) {
      const newParty = {
        id: Math.max(...parties.map((p) => p.id), 0) + 1,
        name: formData.partyName,
        balance: formData.creditBalance.openingBalance || 0,
        status: "active",
        ...formData,
      }
      setParties([...parties, newParty])
      onSelect(newParty)
      setNewPartyName("")
      setShowAddForm(false)
      setIsOpen(false)
      setShowAddPartyModal(false)
    }
  }

  return (
    <>
      <div ref={partySelectorRef} className="relative">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Party</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <span className="text-sm">{selectedParty ? selectedParty.name : "Select party"}</span>
          <FiChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="max-h-60 overflow-y-auto">
              {parties.map((party) => (
                <button
                  key={party.id}
                  onClick={() => {
                    onSelect(party)
                    setIsOpen(false)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{party.name}</p>
                      <p className="text-xs text-gray-500">{party.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">${party.balance}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          party.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {party.status}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t border-gray-100">
              <button
                onClick={handleAddPartyClick}
                className="w-full px-4 py-3 text-left text-blue-600 font-medium text-sm hover:bg-blue-50 flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Add Party
              </button>
            </div>
          </div>
        )}
      </div>

      <AddPartyModal partyModalRef={partyModalRef} isOpen={showAddPartyModal} onClose={() => setShowAddPartyModal(false)} onSave={handleSaveParty} />
    </>
  )
}
