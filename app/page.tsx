'use client'

import React from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Typeahead from "@/components/Typeahead"
import DatePicker from "@/components/DatePicker"
import InputField from "@/components/inputbox"
import RadioGroupField from "@/components/RadioGroup"
import CheckboxField from "@/components/Checkbox"
import { ToastProvider, useToast } from "@/components/Toaster"
import { postApi } from "@/components/lib/api"

function HomeContent() {
  const { showToast } = useToast()
  const [date, setDate] = React.useState<Date>()
  const [selectedVehicles, setSelectedVehicles] = React.useState<any>(null)
  const [vehicleType, setVehicleType] = React.useState("car")
  const [isActive, setIsActive] = React.useState(false)

  const handleSubmit = async () => {
    try {
      const result = await postApi('vehicles/add', {
        type: vehicleType,
        active: isActive,
        date: date,
        vehicles: selectedVehicles
      })
      showToast('Vehicle added successfully!', 'success')
    } catch (error: any) {
      showToast(error.message, 'error')
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ padding: '40px', maxWidth: '448px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <Typeahead
            label="Select Vehicles"
            options={[
              { label: "Car", value: "car" },
              { label: "Bike", value: "bike" },
              { label: "Truck", value: "truck" },
              { label: "Bus", value: "bus" },
            ]}
            multiple
            onChange={setSelectedVehicles}
          />

          <DatePicker
            label="Purchase Date"
            value={date}
            onChange={setDate}
          />

          <RadioGroupField
            label="Vehicle Type"
            name="vehicleType"
            value={vehicleType}
            onChange={setVehicleType}
            options={[
              { label: "Car", value: "car" },
              { label: "Truck", value: "truck" },
              { label: "Bus", value: "bus" },
            ]}
          />

          <CheckboxField
            label="Active Vehicle"
            checked={isActive}
            onChange={setIsActive}
          />

          <button onClick={handleSubmit} className="btn-primary">
            Submit
          </button>

        </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  )
}
