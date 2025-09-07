import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { motion } from 'motion/react'

const hotels = [
  { id: 'all', name: 'All Hotels', icon: '🏨' },
  { id: 'stark-tower', name: 'Stark Tower Hotel', icon: '🏢' },
  { id: 'avengers-compound', name: 'Avengers Compound Resort', icon: '🛡️' },
  { id: 'malibu-mansion', name: 'Malibu Tech Mansion', icon: '🏖️' },
  { id: 'arc-reactor-suite', name: 'Arc Reactor Premium Suite', icon: '⚡' },
]

function SelectHotel({ selectedHotel, onHotelChange }) {
  const selected = selectedHotel || hotels[0]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="block text-sm font-medium text-yellow-400 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
        🏨 Select Hotel
      </label>
      
      <Listbox value={selected} onChange={onHotelChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-gradient-to-r from-gray-900/80 to-red-900/20 border-2 border-red-500/40 py-4 pl-4 pr-10 text-left shadow-lg hover:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 group backdrop-blur-sm" style={{ boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)' }}>
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.span 
                className="text-2xl filter drop-shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {selected.icon}
              </motion.span>
              <span className="block truncate font-medium text-white group-hover:text-yellow-400 transition-colors" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                {selected.name}
              </span>
            </motion.div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <motion.svg
                className="h-5 w-5 text-red-400 group-hover:text-yellow-400"
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{ filter: 'drop-shadow(0 0 3px rgba(220, 38, 38, 0.7))' }}
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
            <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-gradient-to-b from-gray-900 to-black py-2 shadow-xl border-2 border-red-500/30 focus:outline-none backdrop-blur-lg" style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)' }}>
              {hotels.map((hotel, hotelIdx) => (
                <Listbox.Option
                  key={hotel.id}
                  value={hotel}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-3 px-4 transition-all duration-150 border-l-2 ${
                      active ? 'bg-gradient-to-r from-red-900/50 to-red-800/30 text-yellow-300 border-l-yellow-400 shadow-lg' : 'text-gray-200 border-l-transparent hover:border-l-red-400'
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
                          className="text-xl filter drop-shadow-lg"
                          whileHover={{ scale: 1.3, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          {hotel.icon}
                        </motion.span>
                        <span className={`block truncate font-medium ${isSelected ? 'text-yellow-400' : ''}`} style={{ textShadow: isSelected ? '0 0 5px rgba(251, 191, 36, 0.5)' : '0 0 3px rgba(255, 255, 255, 0.2)' }}>
                          {hotel.name}
                        </span>
                      </div>
                      {isSelected && (
                        <motion.svg
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          style={{ filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.7))' }}
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