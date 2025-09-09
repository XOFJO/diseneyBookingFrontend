
import {  Menu, Transition } from '@headlessui/react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEye, 
  faCalendarCheck, 
  faHeart, 
  faShare,
  faBed,
  faUsers,
  faLeaf
} from '@fortawesome/free-solid-svg-icons'

const RoomCard = ({ room, onBookNow }) => {
  // Debug log
  const handleBookNowClick = () => {
    console.log("RoomCard - Book Now clicked for room:", { id: room.id, name: room.name });
    onBookNow?.(room.id);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="flex">
          {/* Room Image */}
          <div className="w-80 h-64 flex-shrink-0 relative overflow-hidden">
            <motion.img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Image Overlay Buttons */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 hover:bg-white/30 transition-colors"
              >
                <FontAwesomeIcon icon={faEye} />
                <span>View Details</span>
              </motion.button>
              
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-500/60 transition-colors"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-blue-500/60 transition-colors"
                >
                  <FontAwesomeIcon icon={faShare} />
                </motion.button>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {room.available} Available
            </div>
          </div>

          {/* Room Details */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-xl font-bold text-gray-800">{room.name}</h4>
                  {/* Rating Score */}
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-semibold">
                    {room.rating || '4.2'}
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">¥{room.price.toFixed(2)}</p>
              </div>
              
              {/* Action Menu */}
              <Menu as="div" className="relative">
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Options className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none z-10">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleBookNowClick}
                          className={`${
                            active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          } group flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors`}
                        >
                          <FontAwesomeIcon icon={faCalendarCheck} className="mr-3" />
                          Book Now
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                          } group flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors`}
                        >
                          <FontAwesomeIcon icon={faEye} className="mr-3" />
                          View Details
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-red-50 text-red-600' : 'text-gray-700'
                          } group flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors`}
                        >
                          <FontAwesomeIcon icon={faHeart} className="mr-3" />
                          Add to Wishlist
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Options>
                </Transition>
              </Menu>
            </div>

            {/* Room Info - Compact View */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              {/* Split and display description parts */}
              {room.description && room.description.split(';').map((part, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <FontAwesomeIcon 
                    icon={index === 0 ? faLeaf : index === 1 ? faBed : faUsers} 
                    className={`mt-0.5 ${index === 0 ? 'text-green-500' : index === 1 ? 'text-blue-500' : 'text-purple-500'}`} 
                  />
                  <span className="flex-1">{part.trim()}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4">
              <motion.button
                onClick={handleBookNowClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors shadow-md"
              >
                Book Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-colors"
              >
                Client Reviews
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

    </>
  )
}

export default RoomCard