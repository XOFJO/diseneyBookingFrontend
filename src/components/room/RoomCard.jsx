import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const RoomCard = ({ room, onBookNow, onViewDetails }) => {
  return (
    <div className="border rounded-lg overflow-hidden mb-6">
      <div className="flex">
        {/* Room Image */}
        <div className="w-80 h-64 flex-shrink-0 relative">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => onViewDetails?.(room.id)}
            className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
          >
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

          <button 
            onClick={() => onViewDetails?.(room.id)}
            className="text-blue-500 hover:underline text-sm mt-3"
          >
            View More Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard