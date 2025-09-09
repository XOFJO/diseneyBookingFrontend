import React from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faHotel } from '@fortawesome/free-solid-svg-icons'
import useSearchStore from '../../store/searchStore'

function GuestSelector() {
  const { rooms, setRooms } = useSearchStore()
  
  const updateRooms = (newRooms) => {
    setRooms(newRooms)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-yellow-400 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
        <FontAwesomeIcon icon={faHotel} className="mr-2" />
        Rooms
      </label>
      
      <div className="flex items-center gap-3">
        {/* Minus Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => updateRooms(Math.max(1, rooms - 1))}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 flex items-center justify-center text-yellow-500 hover:text-yellow-400 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rooms <= 1}
        >
          <FontAwesomeIcon icon={faMinus} className="text-lg" />
        </motion.button>

        {/* Room Display */}
        <div className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/25 transition-all shadow-lg text-center">
          <motion.span 
            key={rooms}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-yellow-400"
            style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
          >
            {String(rooms).padStart(2, '0')}
          </motion.span>
        </div>

        {/* Plus Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => updateRooms(Math.min(5, rooms + 1))}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 flex items-center justify-center text-yellow-500 hover:text-yellow-400 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rooms >= 5}
        >
          <FontAwesomeIcon icon={faPlus} className="text-lg" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default GuestSelector