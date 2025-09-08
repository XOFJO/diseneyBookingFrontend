import React from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faHotel, faUsers } from '@fortawesome/free-solid-svg-icons'

function GuestSelector({ guests, children, rooms, onGuestChange }) {


  const updateRooms = (newRooms) => {
    onGuestChange(guests, children, newRooms)
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <label className="block text-sm font-medium text-yellow-400 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
        <FontAwesomeIcon icon={faUsers} className="mr-2" />Room
      </label>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-gradient-to-r from-gray-900/80 to-red-900/20 border-2 border-red-500/40 py-4 px-4 shadow-lg backdrop-blur-sm"
        style={{ boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)' }}
      >
        {/* Rooms */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faHotel} className="text-xl text-yellow-400" style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }} />
            <div>
              <span className="font-medium text-yellow-400" style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}>Rooms</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => updateRooms(Math.max(1, rooms - 1))}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-red-900/50 border-2 border-red-500/40 hover:border-yellow-400/60 flex items-center justify-center text-red-400 hover:text-yellow-400 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)' }}
              disabled={rooms <= 1}
            >
              <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
            </motion.button>
            <motion.span 
              key={rooms}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="w-12 text-center font-bold text-lg text-yellow-400"
              style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}
            >
              {rooms}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => updateRooms(Math.min(5, rooms + 1))}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-red-900/50 border-2 border-red-500/40 hover:border-yellow-400/60 flex items-center justify-center text-red-400 hover:text-yellow-400 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)' }}
              disabled={rooms >= 5}
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GuestSelector