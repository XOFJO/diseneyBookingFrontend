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
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Room and Guest
      </label>
      
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="relative w-full cursor-pointer rounded-xl bg-white border-2 border-gray-100 py-4 pl-4 pr-10 text-left shadow-sm hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="text-2xl">🛏️</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{rooms} Room</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-gray-900">
                    {totalGuests} Guest{totalGuests > 1 ? 's' : ''}
                    {children > 0 && (
                      <span className="text-blue-600">, {children} Children</span>
                    )}
                  </span>
                </div>
              </motion.div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <motion.svg
                  className="h-5 w-5 text-gray-400 group-hover:text-blue-500"
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
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
                    className="mt-4 bg-gray-50 rounded-xl p-6 space-y-6"
                  >
                    {/* Rooms */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🏨</span>
                        <div>
                          <span className="font-medium text-gray-900">Rooms</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateRooms(Math.max(1, rooms - 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 shadow-sm"
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
                          className="w-12 text-center font-bold text-lg text-gray-900"
                        >
                          {rooms}
                        </motion.span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateRooms(Math.min(5, rooms + 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 shadow-sm"
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
                          <span className="font-medium text-gray-900">Adults</span>
                          <p className="text-sm text-gray-500">Ages 18+</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateGuests(Math.max(1, guests - 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 shadow-sm"
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
                          className="w-12 text-center font-bold text-lg text-gray-900"
                        >
                          {guests}
                        </motion.span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateGuests(Math.min(8, guests + 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 shadow-sm"
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
                          <span className="font-medium text-gray-900">Children</span>
                          <p className="text-sm text-gray-500">Ages 0-17</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateChildren(Math.max(0, children - 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 shadow-sm"
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
                          className="w-12 text-center font-bold text-lg text-gray-900"
                        >
                          {children}
                        </motion.span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => updateChildren(Math.min(4, children + 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 shadow-sm"
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