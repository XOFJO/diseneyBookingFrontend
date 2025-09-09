import React from 'react'
import RoomCard from './RoomCard'

const RoomDetails = ({ 
  activeTab, 
  setActiveTab, 
  mockRooms, 
  onViewDetails, 
  onBookNow 
}) => {
  return (
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
        
        {mockRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onViewDetails={onViewDetails}
            onBookNow={onBookNow}
          />
        ))}
      </div>
    </div>
  )
}

export default RoomDetails