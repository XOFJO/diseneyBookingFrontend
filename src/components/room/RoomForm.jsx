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
      {/* Main Magical Glass Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-purple-900/30 overflow-hidden relative">
        {/* Magical glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
        
        {/* Booking Preferences Section */}
        <div className="p-8 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 backdrop-blur-sm">
          <motion.h2 
            className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-8 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'Georgia, serif',
              textShadow: '0 0 15px rgba(251, 191, 36, 0.3)'
            }}
          >
            ✨ Choose Your Magic ✨
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
                  className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold rounded-xl border border-white/20 backdrop-blur-sm transition-all shadow-xl"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)",
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    fontFamily: 'Georgia, serif',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  ✨ Search Magic ✨
                </motion.button>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Results Section */}
        <div className="p-8 bg-gradient-to-r from-purple-500/3 via-transparent to-pink-500/3">
          <motion.h3 
            className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'Georgia, serif',
              textShadow: '0 0 15px rgba(251, 191, 36, 0.3)'
            }}
          >
            🏰 Your Enchanted Choices 🏰
          </motion.h3>
          
          {/* Room Cards */}
          {mockRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden mb-6 relative"
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(251, 191, 36, 0.4)',
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.2)'
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
                        className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                        style={{
                          fontFamily: 'Georgia, serif',
                          textShadow: '0 0 10px rgba(251, 191, 36, 0.3)'
                        }}
                      >
                        ✨ {room.name}
                      </motion.h4>
                      <div className="text-right">
                        <motion.div 
                          className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"
                          whileHover={{ scale: 1.1 }}
                          style={{
                            textShadow: '0 0 15px rgba(251, 191, 36, 0.4)'
                          }}
                        >
                          💰 {room.price.toFixed(2)} $
                        </motion.div>
                      </div>
                    </div>
                    
                    <p className="text-purple-100 leading-relaxed mb-6 opacity-90" style={{ textShadow: '0 0 5px rgba(255,255,255,0.2)' }}>
                      {room.description}
                    </p>
                    
                    {/* Key Features */}
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-yellow-200 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.3)' }}>✨ Magical Features</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {room.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="bg-white/10 text-yellow-100 px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-md border border-white/20"
                            whileHover={{ 
                              scale: 1.05, 
                              backgroundColor: 'rgba(251, 191, 36, 0.1)',
                              borderColor: 'rgba(251, 191, 36, 0.3)',
                              boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)'
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
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold rounded-xl hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 transition-all shadow-xl border border-white/20 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)",
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      fontFamily: 'Georgia, serif',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    ✨ Book Your Magic ✨
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Magical Bottom Navigation */}
        <div className="p-4 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 border-t border-white/20 backdrop-blur-sm">
          <div className="flex justify-center space-x-8">
            {[
              { icon: faSearch, label: 'Room Search', emoji: '🔍' },
              { icon: faHeart, label: 'My Bookings', emoji: '💼' },
              { icon: faHeart, label: 'My Favourites', emoji: '❤️' },
              { icon: faUser, label: 'My Account', emoji: '🧙' }
            ].map((item, index) => (
              <motion.button
                key={index}
                className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                whileHover={{ 
                  scale: 1.08, 
                  borderColor: 'rgba(251, 191, 36, 0.3)',
                  boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-xl text-yellow-300">{item.emoji}</div>
                <span className="text-xs text-purple-200 font-medium" style={{ fontFamily: 'Georgia, serif' }}>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RoomForm