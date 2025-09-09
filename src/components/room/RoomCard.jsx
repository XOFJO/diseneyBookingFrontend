import React, { useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEye, 
  faEllipsisV, 
  faCalendarCheck, 
  faHeart, 
  faShare, 
  faChevronDown,
  faTimes,
  faBed,
  faUsers,
  faLeaf
} from '@fortawesome/free-solid-svg-icons'

const RoomCard = ({ room, onViewDetails, onBookNow }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
              onClick={() => setIsDialogOpen(true)}
            />
            
            {/* Image Overlay Buttons */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <motion.button 
                onClick={() => setIsDialogOpen(true)}
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
                <h4 className="text-xl font-bold text-gray-800 mb-1">{room.name}</h4>
                <p className="text-2xl font-bold text-blue-600">${room.price.toFixed(2)}</p>
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
                          onClick={() => onBookNow?.(room.id)}
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
                          onClick={() => setIsDialogOpen(true)}
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
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faLeaf} className="text-green-500" />
                <span>{room.description}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBed} className="text-blue-500" />
                <span>{room.bedInfo}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUsers} className="text-purple-500" />
                <span>{room.occupancy}</span>
              </div>
            </div>

            {/* Expandable Details */}
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full text-left text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    <span className="font-medium">
                      {open ? 'Show Less' : 'Show More Details'}
                    </span>
                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FontAwesomeIcon icon={faChevronDown} />
                    </motion.div>
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-150 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="mt-3 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                      <div className="space-y-2">
                        <p><strong>Room Size:</strong> 35 sqm</p>
                        <p><strong>Amenities:</strong> WiFi, Air Conditioning, TV, Mini Bar</p>
                        <p><strong>Check-in:</strong> 3:00 PM</p>
                        <p><strong>Check-out:</strong> 11:00 AM</p>
                        <p><strong>Cancellation:</strong> Free cancellation until 24 hours before check-in</p>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <motion.button
                          onClick={() => onBookNow?.(room.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                          Book Now - ${room.price}
                        </motion.button>
                        <motion.button
                          onClick={() => setIsDialogOpen(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                        >
                          Full Details
                        </motion.button>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </motion.div>

      {/* Detailed Dialog Modal */}
      <Transition appear show={isDialogOpen}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsDialogOpen(false)}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                  {/* Dialog Header */}
                  <div className="relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <motion.button
                        onClick={() => setIsDialogOpen(false)}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white hover:text-gray-200 transition-colors p-2"
                      >
                        <FontAwesomeIcon icon={faTimes} className="text-xl" />
                      </motion.button>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                      <span className="text-2xl font-bold">${room.price.toFixed(2)}</span>
                      <span className="text-sm opacity-80 ml-1">/ night</span>
                    </div>
                  </div>

                  {/* Dialog Content */}
                  <div className="p-8">
                    <Dialog.Title className="text-3xl font-bold text-gray-900 mb-2">
                      {room.name}
                    </Dialog.Title>
                    
                    <div className="flex items-center space-x-4 mb-6 text-sm">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        {room.available} Available
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {room.category.charAt(0).toUpperCase() + room.category.slice(1)}
                      </span>
                    </div>

                    {/* Room Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Room Details</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <FontAwesomeIcon icon={faLeaf} className="text-green-500 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">View</p>
                              <p className="text-gray-600 text-sm">{room.description}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <FontAwesomeIcon icon={faBed} className="text-blue-500 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">Sleeping Arrangement</p>
                              <p className="text-gray-600 text-sm">{room.bedInfo}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <FontAwesomeIcon icon={faUsers} className="text-purple-500 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">Occupancy</p>
                              <p className="text-gray-600 text-sm">{room.occupancy}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Room Service', 'Safe Box', 'Balcony', 'Coffee Maker'].map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Policies */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Hotel Policies</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-900">Check-in</p>
                          <p className="text-gray-600">3:00 PM onwards</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Check-out</p>
                          <p className="text-gray-600">Until 11:00 AM</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Cancellation</p>
                          <p className="text-gray-600">Free until 24h before</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <motion.button
                        onClick={() => {
                          onBookNow?.(room.id)
                          setIsDialogOpen(false)
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors shadow-lg"
                      >
                        Book Now - ${room.price.toFixed(2)}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-4 border-2 border-red-300 text-red-600 hover:border-red-400 rounded-xl font-semibold transition-colors"
                      >
                        <FontAwesomeIcon icon={faHeart} className="mr-2" />
                        Add to Wishlist
                      </motion.button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default RoomCard