import React, { useState } from 'react'
import { motion } from 'motion/react'

function DateRangePicker({ checkIn, checkOut, onDateChange }) {
  const [nights, setNights] = useState(1)

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value
    if (newCheckIn && checkOut) {
      const checkInDate = new Date(newCheckIn)
      const checkOutDate = new Date(checkOut)
      const diffTime = Math.abs(checkOutDate - checkInDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setNights(diffDays)
    }
    onDateChange(newCheckIn, checkOut)
  }

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value
    if (checkIn && newCheckOut) {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(newCheckOut)
      const diffTime = Math.abs(checkOutDate - checkInDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setNights(diffDays)
    }
    onDateChange(checkIn, newCheckOut)
  }

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return (
    <>
      {/* Check In Date */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-yellow-400 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
          📅 Check In Date
        </label>
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="date"
              value={checkIn}
              onChange={handleCheckInChange}
              min={today}
              className="w-full px-4 py-4 border-2 border-red-500/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 hover:border-yellow-400/60 text-white font-medium bg-gradient-to-r from-gray-900/80 to-red-900/20 group-hover:shadow-lg backdrop-blur-sm"
              style={{ 
                boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)',
                colorScheme: 'dark'
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <motion.svg 
                className="h-5 w-5 text-red-400 group-hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ filter: 'drop-shadow(0 0 3px rgba(220, 38, 38, 0.7))' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </motion.svg>
            </div>
          </motion.div>
          {checkIn && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-xs text-yellow-400 font-medium"
              style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}
            >
              ⚡ {new Date(checkIn).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Check Out Date */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-yellow-400" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
            📅 Check Out Date
          </label>
          {nights > 0 && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="text-xs bg-gradient-to-r from-red-600 to-red-700 text-yellow-400 px-3 py-1 rounded-full font-bold border border-yellow-400/30"
              style={{ 
                textShadow: '0 0 5px rgba(251, 191, 36, 0.5)',
                boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)'
              }}
            >
              🌙 {nights} Night{nights > 1 ? 's' : ''}
            </motion.span>
          )}
        </div>
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="date"
              value={checkOut}
              onChange={handleCheckOutChange}
              min={checkIn || tomorrow}
              className="w-full px-4 py-4 border-2 border-red-500/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 hover:border-yellow-400/60 text-white font-medium bg-gradient-to-r from-gray-900/80 to-red-900/20 group-hover:shadow-lg backdrop-blur-sm"
              style={{ 
                boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)',
                colorScheme: 'dark'
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <motion.svg 
                className="h-5 w-5 text-red-400 group-hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: -10 }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ filter: 'drop-shadow(0 0 3px rgba(220, 38, 38, 0.7))' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </motion.svg>
            </div>
          </motion.div>
          {checkOut && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-xs text-yellow-400 font-medium"
              style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}
            >
              🚀 {new Date(checkOut).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default DateRangePicker