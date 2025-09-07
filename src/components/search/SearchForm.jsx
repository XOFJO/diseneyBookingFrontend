import React, { useState } from 'react'
import { motion } from 'motion/react'
import SelectHotel from './SelectHotel'
import DateRangePicker from './DateRangePicker'
import GuestSelector from './GuestSelector'

function SearchForm() {
  const [activeTab, setActiveTab] = useState('Hotels')
  const [formData, setFormData] = useState({
    selectedHotel: null,
    checkIn: '',
    checkOut: '',
    guests: 2,
    children: 0,
    rooms: 1
  })

  const handleFormUpdate = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = () => {
    console.log('Search with data:', formData)
    // Handle search logic here
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto backdrop-blur-lg bg-white/95"
    >
      {/* Tab Navigation */}
      <div className="flex mb-8 bg-gray-50 rounded-xl p-1">
        {['Tickets & Packages', 'Hotels'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 relative ${
              activeTab === tab
                ? 'text-blue-600 bg-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Hotel Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SelectHotel
          selectedHotel={formData.selectedHotel}
          onHotelChange={(hotel) => handleFormUpdate('selectedHotel', hotel)}
        />
      </motion.div>

      {/* Date Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <DateRangePicker
          checkIn={formData.checkIn}
          checkOut={formData.checkOut}
          onDateChange={(checkIn, checkOut) => {
            handleFormUpdate('checkIn', checkIn)
            handleFormUpdate('checkOut', checkOut)
          }}
        />
      </motion.div>

      {/* Guest Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <GuestSelector
          guests={formData.guests}
          children={formData.children}
          rooms={formData.rooms}
          onGuestChange={(guests, children, rooms) => {
            handleFormUpdate('guests', guests)
            handleFormUpdate('children', children)
            handleFormUpdate('rooms', rooms)
          }}
        />
      </motion.div>

      {/* Search Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-xl"
        >
          <span className="text-lg">Search for prices</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2 transition-colors duration-200"
        >
          <span>View all products</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default SearchForm