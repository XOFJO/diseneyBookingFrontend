import React from 'react'
import { motion } from 'framer-motion'

/**
 * Room Details Component with Iron Man theme
 * @param {Object} room - Room data object
 * @param {function} onClose - Close modal function
 */
const RoomDetails = ({ room, onClose, isOpen }) => {
  if (!isOpen || !room) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900 via-red-950/50 to-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-yellow-400/30 shadow-2xl shadow-red-900/50"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <motion.h2 
            className="text-3xl font-bold text-yellow-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {room.name}
          </motion.h2>
          <motion.button
            className="text-yellow-400 hover:text-red-400 text-2xl p-2 hover:bg-red-900/30 rounded-lg transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            
          </motion.button>
        </div>

        {/* Image Gallery */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-80 object-cover rounded-xl border border-yellow-400/20 shadow-lg"
          />
        </motion.div>

        {/* Price and Availability */}
        <motion.div 
          className="flex justify-between items-center mb-6 p-4 bg-black/40 rounded-xl border border-red-600/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <div className="text-3xl font-bold text-yellow-400">${room.price}</div>
            <div className="text-gray-300">per night</div>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-semibold">Available: {room.available}</div>
            <div className="text-gray-400 text-sm">rooms left</div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-yellow-300 mb-3">Description</h3>
          <p className="text-gray-300 leading-relaxed">{room.description}</p>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">Room Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {room.features?.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 p-3 bg-red-800/20 rounded-lg border border-red-600/20"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(239, 68, 68, 0.3)",
                  borderColor: "rgba(251, 191, 36, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-200">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-4 justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            Close
          </motion.button>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-lg hover:from-red-500 hover:to-yellow-400 transition-all shadow-lg shadow-red-900/50"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px -12px rgba(239, 68, 68, 0.6)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book This Room
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default RoomDetails