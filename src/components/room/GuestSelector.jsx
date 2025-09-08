import React from 'react'
import { motion } from 'motion/react'
import { Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faUsers, faChild, faHotel, faChevronDown } from '@fortawesome/free-solid-svg-icons'

function GuestSelector({ guests = 2, children = 0, rooms = 1, onGuestChange = () => {} }) {
  
  const updateGuests = (newGuests) => {
    onGuestChange(newGuests, children, rooms)
  }

  const updateChildren = (newChildren) => {
    onGuestChange(guests, newChildren, rooms)
  }

  const updateRooms = (newRooms) => {
    onGuestChange(guests, children, newRooms)
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Rooms Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-gray-700">Rooms</label>
        <Popover className="relative">
          <Popover.Button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-3 text-center hover:bg-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {String(rooms).padStart(2, '0')}
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-600 text-sm" />
            </div>
          </Popover.Button>
          
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute z-50 bg-white/95 backdrop-blur-lg rounded-xl border border-white/40 p-4 shadow-xl top-full mt-2 w-64">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faHotel} className="text-indigo-600 text-lg" />
                    <div>
                      <span className="font-medium text-gray-900">Rooms</span>
                      <p className="text-xs text-gray-600">How many rooms do you need?</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => updateRooms(Math.max(1, rooms - 1))}
                      className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={rooms <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-sm" />
                    </motion.button>
                    <span className="w-8 text-center font-bold text-lg text-gray-900">
                      {rooms}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => updateRooms(Math.min(5, rooms + 1))}
                      className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={rooms >= 5}
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-sm" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </motion.div>

      {/* Adults Selector */}


      {/* Children Selector */}

    </div>
  )
}

export default GuestSelector