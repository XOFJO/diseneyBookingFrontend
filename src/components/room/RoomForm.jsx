import React, { useState } from 'react'
import { motion } from 'framer-motion'
import DateRangePicker from './DateRangePicker'
import GuestSelector from './GuestSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faChild, faSearch, faHeart, faUser, faMapMarkerAlt, faEye, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const RoomForm = () => {
  // State for booking preferences
  const [checkIn, setCheckIn] = useState('Tue, Sep 09')
  const [checkOut, setCheckOut] = useState('Wed, Sep 10')
  const [guests, setGuests] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  
  // State for room results
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [activeTab, setActiveTab] = useState('standard')

  // Disney themed room data
  const mockRooms = [
    {
      id: 1,
      name: 'Fairytale Dream Room',
      price: 0.00,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Views of Garden',
      bedInfo: '2 Double Beds and 1 Child Murphy Bed • Murphy bed sized 1.64m x 0.95m',
      occupancy: 'Sleeps up to 2 Adults and 1 Child aged 3-11 years old (both inclusive)',
      available: 5,
      category: 'deluxe'
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
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="bg-white rounded-t-lg p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img src="/disney-logo.png" alt="Shanghai Disney Resort" className="h-12" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Shanghai Disneyland Hotel</h1>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div>
              <span className="text-gray-600">Check In Date</span>
              <div className="font-semibold">{checkIn}</div>
              <div className="text-xs text-gray-500">1 Night(s)</div>
            </div>
            <div>
              <span className="text-gray-600">Check Out Date</span>
              <div className="font-semibold">{checkOut}</div>
            </div>
            <div>
              <span className="text-gray-600">Room and Guest</span>
              <div className="font-semibold">{rooms} Room</div>
              <div className="text-xs text-gray-500">{guests} Guests, {children} Children</div>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Search
            </button>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex bg-white">
        {/* Left Side - Room Selection */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Room</h2>
            <p className="text-gray-600">Personalize an unforgettable accommodation experience for your Disney journey!</p>
          </div>


          {/* Room Type Tabs */}
          <div className="flex border-b mb-6">
            <button 
              onClick={() => setActiveTab('standard')}
              className={`px-6 py-3 font-medium border-b-2 ${
                activeTab === 'standard' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Iron man themes
            </button>
            <button 
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-3 font-medium border-b-2 ${
                activeTab === 'packages' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Hotel Packages
            </button>
          </div>


          {/* Deluxe Rooms Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Deluxe Rooms</h3>
            
            {/* Room Card */}
            {mockRooms.map((room) => (
              <div key={room.id} className="border rounded-lg overflow-hidden mb-6">
                <div className="flex">
                  {/* Room Image */}
                  <div className="w-80 h-64 flex-shrink-0 relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
                      <FontAwesomeIcon icon={faEye} />
                      <span>View</span>
                    </button>
                  </div>

                  {/* Room Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-gray-800">{room.name}</h4>
                      <button className="text-blue-500 hover:underline flex items-center space-x-1">
                        <span>Hide</span>
                        <FontAwesomeIcon icon={faChevronUp} />
                      </button>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <span>🌿</span>
                        <span>{room.description}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span>🛏️</span>
                        <span>{room.bedInfo}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span>👥</span>
                        <span>{room.occupancy}</span>
                      </div>
                    </div>

                    <button className="text-blue-500 hover:underline text-sm mt-3">
                      View More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Booking Summary */}
        <div className="w-80 bg-gray-50 p-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-gray-800 mb-4">Your Selection and Price</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span>🏨</span>
                <span>Shanghai Disneyland Hotel</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span>📅</span>
                <span>September 9, 2025 - September 10, 2025</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span>🛏️</span>
                <span>{rooms} Room</span>
                <span>👥</span>
                <span>{guests} Guests, {children} Children</span>
              </div>
            </div>

            <div className="border-t mt-6 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">¥ 0.00</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Prices in Chinese Yuan(CNY)</p>
              
              <button className="w-full bg-gray-300 text-gray-500 py-3 rounded font-medium cursor-not-allowed">
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomForm