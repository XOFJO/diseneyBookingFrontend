import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel, faChevronDown, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import useHotelNames from '../../hooks/useHotelName'

function SelectHotel({ selectedHotel, onHotelChange }) {
  const { hotels, loading, error } = useHotelNames()
  const selected = selectedHotel || (hotels.length > 0 ? hotels[0] : { id: 'all', name: 'All Hotels', icon: faHotel })

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <label className="block text-sm font-medium text-yellow-400 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
          <FontAwesomeIcon icon={faHotel} className="mr-2" />Select Hotel
        </label>
        <div className="text-red-400 p-4 rounded-xl bg-red-900/20 border border-red-500/40">
          Error loading hotels. Please try again later.
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="block text-sm font-medium text-yellow-400 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
        <FontAwesomeIcon icon={faHotel} className="mr-2" />Select Hotel
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
                <FontAwesomeIcon icon={loading ? faSpinner : selected.icon} className={loading ? 'animate-spin' : ''} />
              </motion.span>
              <span className="block truncate font-medium text-white group-hover:text-yellow-400 transition-colors" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                {loading ? 'Loading hotels...' : selected.name}
              </span>
            </motion.div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
                className="h-5 w-5 text-red-400 group-hover:text-yellow-400"
                style={{ filter: 'drop-shadow(0 0 3px rgba(220, 38, 38, 0.7))' }}
              >
                <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5" />
              </motion.div>
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
              {loading ? (
                <div className="py-3 px-4 text-gray-400 text-center">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Loading hotels...
                </div>
              ) : hotels.length === 0 ? (
                <div className="py-3 px-4 text-gray-400 text-center">
                  No hotels available
                </div>
              ) : (
                hotels.map((hotel, hotelIdx) => (
                  <Listbox.Option
                    key={hotel.id}
                    value={hotel}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-3 px-4 transition-all duration-150 border-l-2 ${
                        active ? 'bg-gradient-to-r from-red-900/50 to-red-800/30 text-yellow-300 border-l-yellow-400 shadow-lg' : 'text-gray-200 border-l-transparent hover:border-l-red-400'
                      }`
                    }
                  >
                    {({ selected: isSelected }) => (
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
                            <FontAwesomeIcon icon={hotel.icon} />
                          </motion.span>
                          <span className={`block truncate font-medium ${isSelected ? 'text-yellow-400' : ''}`} style={{ textShadow: isSelected ? '0 0 5px rgba(251, 191, 36, 0.5)' : '0 0 3px rgba(255, 255, 255, 0.2)' }}>
                            {hotel.name}
                          </span>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            className="h-5 w-5 text-yellow-400"
                            style={{ filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.7))' }}
                          >
                            <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </Listbox.Option>
                ))
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </motion.div>
  )
}

export default SelectHotel