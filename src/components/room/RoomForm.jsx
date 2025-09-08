import React, { useState } from 'react'
import { motion } from 'framer-motion'
import DateRangePicker from './DateRangePicker'
import GuestSelector from './GuestSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faChild, faSearch, faHeart, faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const RoomForm = () => {
  // State for booking preferences
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  
  // State for room results
  const [selectedRoom, setSelectedRoom] = useState(null)

  // Iron Man themed mock room data
  const mockRooms = [
    {
      id: 1,
      name: 'Signature Guest Room',
      price: 2130.40,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Unwind in a thoughtfully designed space featuring plush bedding, curated amenities, and just the right touch of elegance for a restful stay',
      features: ['Climate Control', 'Foam Mattress', 'Convertible beds', 'Smart Lock', 'Fast WiFi', '+more'],
      available: 5
    }
  ]

  const handleDateChange = (newCheckIn, newCheckOut) => {
    setCheckIn(newCheckIn)
    setCheckOut(newCheckOut)
  }

  const handleGuestChange = (newGuests, newChildren, newRooms) => {
    setGuests(newGuests)
    setChildren(newChildren)
    setRooms(newRooms)
  }

  const handleSearch = () => {
    console.log('Searching with:', { checkIn, checkOut, guests, children, rooms })
  }

  const handleBookNow = (roomId) => {
    console.log('Booking room:', roomId)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-7xl mx-auto"
    >
      {/* Main Glass Morphism Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl shadow-black/50 overflow-hidden">
        
        {/* Booking Preferences Section */}
        <div className="p-8 bg-gradient-to-r from-white/5 to-white/10">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Booking Preferences
          </motion.h2>
          
          <div className="space-y-6">
            {/* Date Range Picker */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <DateRangePicker
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDateChange={handleDateChange}
                />
              </div>
            </div>
            
            {/* Guest Selectors and Search Button side by side */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              {/* Guest Selectors - spans 8 columns */}
              <div className="md:col-span-8">
                <GuestSelector
                  guests={guests}
                  children={children}
                  rooms={rooms}
                  onGuestChange={handleGuestChange}
                />
              </div>
              
              {/* Search Button - spans 4 columns */}
              <div className="md:col-span-4">
                <motion.button
                  onClick={handleSearch}
                  className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  Search
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Available rooms indicator */}
          <motion.div 
            className="flex justify-end mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-sm text-gray-600">
              <span className="font-medium">Available</span>
              <span className="ml-2 font-bold text-2xl text-gray-900">05</span>
            </div>
          </motion.div>
        </div>
        
        {/* Results Section */}
        <div className="p-8 bg-gradient-to-r from-white/0 to-white/5">
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Results based on your preferences
          </motion.h3>
          
          {/* Room Cards */}
          {mockRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden mb-4"
              whileHover={{ 
                scale: 1.01, 
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderColor: 'rgba(255,255,255,0.3)' 
              }}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Room Image */}
                <div className="lg:w-80 h-64 lg:h-auto flex-shrink-0 relative">
                  <motion.img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Image overlay dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === 0 ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Room Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <motion.h4 
                        className="text-2xl font-bold text-gray-900"
                        whileHover={{ color: '#4f46e5' }}
                      >
                        {room.name}
                      </motion.h4>
                      <div className="text-right">
                        <motion.div 
                          className="text-3xl font-bold text-gray-900"
                          whileHover={{ scale: 1.1, color: '#4f46e5' }}
                        >
                          {room.price.toFixed(2)} $
                        </motion.div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {room.description}
                    </p>
                    
                    {/* Key Features */}
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {room.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="bg-white/20 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/30"
                            whileHover={{ 
                              scale: 1.05, 
                              backgroundColor: 'rgba(255,255,255,0.3)',
                              borderColor: 'rgba(255,255,255,0.5)'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Book Now Button */}
                  <motion.button
                    onClick={() => handleBookNow(room.id)}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now !
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Navigation */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="flex justify-center space-x-8">
            {[
              { icon: faSearch, label: 'Room Search' },
              { icon: faHeart, label: 'My Bookings' },
              { icon: faHeart, label: 'My Favourites' },
              { icon: faUser, label: 'My Account' }
            ].map((item, index) => (
              <motion.button
                key={index}
                className="flex flex-col items-center space-y-1 p-3 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={item.icon} className="text-xl text-gray-600" />
                <span className="text-xs text-gray-600 font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RoomForm