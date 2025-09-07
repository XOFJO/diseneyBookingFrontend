import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
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
      className="rounded-3xl shadow-2xl p-10 max-w-5xl mx-auto backdrop-blur-xl border border-white/20 relative overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}
    >
      {/* Arc Reactor Effect */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-80 animate-pulse shadow-lg shadow-blue-400/50"></div>
      <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 animate-pulse"></div>
      

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
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
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
          <span className="text-lg relative z-10"><FontAwesomeIcon icon={faSearch} className="mr-2" />Search for prices</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default SearchForm