import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { motion } from 'motion/react'

const hotels = [
  { id: 'all', name: 'All Hotels', icon: '🏨' },
  { id: 'disneyland-hotel', name: 'Shanghai Disneyland Hotel', icon: '🏰' },
  { id: 'toy-story-hotel', name: 'Toy Story Hotel', icon: '🧸' },
  { id: 'grand-hotel', name: 'Disney Grand Hotel', icon: '⭐' },
]

function SelectHotel({ selectedHotel, onHotelChange }) {
  const selected = selectedHotel || hotels[0]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select Hotel
      </label>
      
      <Listbox value={selected} onChange={onHotelChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white border-2 border-gray-100 py-4 pl-4 pr-10 text-left shadow-sm hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-2xl">{selected.icon}</span>
              <span className="block truncate font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {selected.name}
              </span>
            </motion.div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <motion.svg
                className="h-5 w-5 text-gray-400 group-hover:text-blue-500"
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </span>
          </Listbox.Button>
          
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 shadow-xl border border-gray-100 focus:outline-none backdrop-blur-lg">
              {hotels.map((hotel, hotelIdx) => (
                <Listbox.Option
                  key={hotel.id}
                  value={hotel}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-3 px-4 transition-all duration-150 ${
                      active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected: isSelected, active }) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: hotelIdx * 0.05 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.span 
                          className="text-xl"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          {hotel.icon}
                        </motion.span>
                        <span className={`block truncate font-medium ${isSelected ? 'text-blue-600' : ''}`}>
                          {hotel.name}
                        </span>
                      </div>
                      {isSelected && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          className="h-5 w-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      )}
                    </motion.div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </motion.div>
  )
}

export default SelectHotel