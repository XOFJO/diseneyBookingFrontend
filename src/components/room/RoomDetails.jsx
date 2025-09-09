import React from 'react'
import RoomCard from './RoomCard'

const RoomDetails = ({ 
  mockRooms, 
  onViewDetails, 
  onBookNow 
}) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Room</h2>
        <p className="text-gray-600">Personalize an unforgettable accommodation experience for your Disney journey!</p>
      </div>

      {/* Deluxe Rooms Section - Scrollable */}
      <div className="mb-8 max-h-screen overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Theme Rooms</h3>
        
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