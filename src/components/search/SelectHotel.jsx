import React, { useState } from 'react'

const hotels = [
  { id: 'all', name: 'All Hotels', icon: '🏨' },
  { id: 'disneyland-hotel', name: '上海迪士尼乐园酒店', icon: '🏰' },
  { id: 'toy-story-hotel', name: '玩具总动员酒店', icon: '🧸' },
  { id: 'grand-hotel', name: '迪士尼世界度假酒店', icon: '⭐' },
]

function SelectHotel({ selectedHotel, onHotelChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(selectedHotel || hotels[0])

  const handleSelect = (hotel) => {
    setSelected(hotel)
    setIsOpen(false)
    if (onHotelChange) {
      onHotelChange(hotel)
    }
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Hotel
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <div className="flex items-center space-x-3">
            <span className="text-gray-400 text-lg">🏨</span>
            <span className="text-gray-900 font-medium">{selected.name}</span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {hotels.map((hotel) => (
              <button
                key={hotel.id}
                type="button"
                onClick={() => handleSelect(hotel)}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                  selected.id === hotel.id ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                }`}
              >
                <span className="text-lg">{hotel.icon}</span>
                <span className="font-medium">{hotel.name}</span>
                {selected.id === hotel.id && (
                  <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default SelectHotel