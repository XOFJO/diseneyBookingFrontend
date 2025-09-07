import React from 'react'
import { Disclosure } from '@headlessui/react'
import { motion, AnimatePresence } from 'motion/react'

function GuestSelector({ guests, children, rooms, onGuestChange }) {
  const updateGuests = (newGuests) => {
    onGuestChange(newGuests, children, rooms)
  }

  const updateChildren = (newChildren) => {
    onGuestChange(guests, newChildren, rooms)
  }

  const updateRooms = (newRooms) => {
    onGuestChange(guests, children, newRooms)
  }

  const totalGuests = guests + children

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <label className="block text-sm font-medium text-yellow-400 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
        👥 Room and Guest
      </label>
      
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="relative w-full cursor-pointer rounded-xl bg-gradient-to-r from-gray-900/80 to-red-900/20 border-2 border-red-500/40 py-4 pl-4 pr-10 text-left shadow-lg hover:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 group backdrop-blur-sm" style={{ boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)' }}>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.span 
                  className="text-2xl filter drop-shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  🛏️
                </motion.span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white group-hover:text-yellow-400 transition-colors" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>{rooms} Room</span>
                  <span className="text-red-400">•</span>
                  <span className="font-medium text-white group-hover:text-yellow-400 transition-colors" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                    {totalGuests} Guest{totalGuests > 1 ? 's' : ''}
                    {children > 0 && (
                      <span className="text-yellow-400" style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}>, {children} Children</span>
                    )}
                  </span>
                </div>
              </motion.div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <motion.svg
                  className="h-5 w-5 text-red-400 group-hover:text-yellow-400"
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(220, 38, 38, 0.7))' }}
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </span>
            </Disclosure.Button>
            
            <AnimatePresence>
              {open && (
                <Disclosure.Panel static>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 bg-gradient-to-br from-gray-900/90 to-red-900/40 rounded-xl p-6 space-y-6 border border-red-500/30 backdrop-blur-sm"
                    style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.3)' }}
                  >
                    {/* Rooms */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🏨</span>
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
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
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
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>

                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">👥</span>
                        <div>
                          <span className="font-medium text-yellow-400" style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}>Adults</span>
                          <p className="text-sm text-red-400/80" style={{ textShadow: '0 0 3px rgba(220, 38, 38, 0.3)' }}>Ages 18+</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateGuests(Math.max(1, guests - 1))}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-red-900/50 border-2 border-red-500/40 hover:border-yellow-400/60 flex items-center justify-center text-red-400 hover:text-yellow-400 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)' }}
                          disabled={guests <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </motion.button>
                        <motion.span 
                          key={guests}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="w-12 text-center font-bold text-lg text-yellow-400"
                          style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}
                        >
                          {guests}
                        </motion.span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateGuests(Math.min(8, guests + 1))}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-red-900/50 border-2 border-red-500/40 hover:border-yellow-400/60 flex items-center justify-center text-red-400 hover:text-yellow-400 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)' }}
                          disabled={guests >= 8}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">👶</span>
                        <div>
                          <span className="font-medium text-yellow-400" style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}>Children</span>
                          <p className="text-sm text-red-400/80" style={{ textShadow: '0 0 3px rgba(220, 38, 38, 0.3)' }}>Ages 0-17</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateChildren(Math.max(0, children - 1))}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-red-900/50 border-2 border-red-500/40 hover:border-yellow-400/60 flex items-center justify-center text-red-400 hover:text-yellow-400 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)' }}
                          disabled={children <= 0}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </motion.button>
                        <motion.span 
                          key={children}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="w-12 text-center font-bold text-lg text-yellow-400"
                          style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}
                        >
                          {children}
                        </motion.span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateChildren(Math.min(4, children + 1))}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-red-900/50 border-2 border-red-500/40 hover:border-yellow-400/60 flex items-center justify-center text-red-400 hover:text-yellow-400 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)' }}
                          disabled={children >= 4}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </Disclosure.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>
    </motion.div>
  )
}

export default GuestSelector