"use client"

import ItemForm from "@/components/ItemForm/ItemForm"
import PurchaseList from "@/components/ItemForm/PurchaseList"
import { useState } from "react"
import { BiPlus } from "react-icons/bi"
import { FaPlus } from "react-icons/fa"
import { ImImages } from "react-icons/im"

export default function Page() {
    const [showForm, setShowForm] = useState(false)
    const [items, setItems] = useState([])
    const [activeType, setActiveType] = useState("product")

    const handleAddItem = (item) => {
        setItems([...items, { ...item, id: Date.now(), type: activeType }])
        setShowForm(false)
    }



    return (
        <div className="sm:p-4 p-2">
            <ItemForm
                type={activeType}
                onTypeChange={setActiveType}
                onSubmit={handleAddItem}
                onClose={() => setShowForm(false)}
            />
        </div>
    )
}
