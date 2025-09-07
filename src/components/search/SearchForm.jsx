import React, { useState } from 'react'
import { motion } from 'motion/react'
import SelectHotel from './SelectHotel'
import DateRangePicker from './DateRangePicker'
import GuestSelector from './GuestSelector'

function SearchForm() {
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
      className="rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto backdrop-blur-lg border-2 border-red-500/30 relative overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #1a1a1a, #dc2626, #f59e0b, #ef4444)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease-in-out infinite',
        boxShadow: '0 0 50px rgba(220, 38, 38, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Arc Reactor Effect */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-80 animate-pulse shadow-lg shadow-blue-400/50"></div>
      <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 animate-pulse"></div>
      
      {/* Tab Navigation */}
      {/* <div className="flex mb-8 bg-black/40 rounded-xl p-1 border border-red-500/20">
        {['Tickets & Packages', 'Hotels'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 relative ${
              activeTab === tab
                ? 'text-yellow-400 bg-gradient-to-r from-red-600/50 to-red-700/50 shadow-lg border border-red-400/30'
                : 'text-gray-300 hover:text-yellow-300 hover:bg-red-900/20'
            }`}
            style={{
              textShadow: activeTab === tab ? '0 0 10px rgba(251, 191, 36, 0.5)' : 'none'
            }}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full shadow-lg shadow-yellow-400/50"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div> */}

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
          className="w-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-xl border border-yellow-400/30 relative overflow-hidden"
          style={{
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="text-lg relative z-10">🔍 Search for prices</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center space-x-2 transition-colors duration-200 relative"
          style={{
            textShadow: '0 0 5px rgba(251, 191, 36, 0.5)'
          }}
        >
          <span>⚡ View all products</span>
          <motion.svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default SearchForm