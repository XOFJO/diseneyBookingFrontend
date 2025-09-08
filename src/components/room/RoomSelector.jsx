import React, { useState } from 'react'
import { motion } from 'framer-motion'

function RoomSelector() {
  const [checkInDate, setCheckInDate] = useState('11 August 2025')
  const [checkOutDate, setCheckOutDate] = useState('1 September 2025')
  const [rooms, setRooms] = useState('01')
  const [adults, setAdults] = useState('02')
  const [children, setChildren] = useState('00')

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900/95 via-yellow-600/90 to-red-900/95 backdrop-blur-lg border-b border-yellow-400/30"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div 
          className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20 shadow-2xl shadow-red-900/50"
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.5)" }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center tracking-wide">
            Booking Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Check-in date</label>
              <motion.input
                type="text"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-red-600/30 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                whileFocus={{ scale: 1.05, borderColor: "#fbbf24" }}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Check-out date</label>
              <motion.input
                type="text"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-red-600/30 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                whileFocus={{ scale: 1.05, borderColor: "#fbbf24" }}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Rooms</label>
              <motion.select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-red-600/30 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                whileFocus={{ scale: 1.05 }}
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
              </motion.select>
            </div>
            
            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Adults</label>
              <motion.select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-red-600/30 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                whileFocus={{ scale: 1.05 }}
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
              </motion.select>
            </div>
            
            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Children</label>
              <motion.select
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-red-600/30 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                whileFocus={{ scale: 1.05 }}
              >
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
              </motion.select>
            </div>
          </div>
          
          <motion.button
            className="mt-6 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-lg hover:from-red-500 hover:to-yellow-400 transition-all shadow-lg shadow-red-900/50"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(239, 68, 68, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default RoomSelector