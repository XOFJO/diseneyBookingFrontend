import React, { useState } from 'react'
import PriceCalculator from './PriceCalculator'
const BookingSummary = ({
  checkIn,
  checkOut,
  rooms,
  guests,
  children,
  calculateNights,
  formatDateForDisplay
}) => {
  const [showDetail] = useState(true); // 保留字段但始终展开

  return (
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
            <span>{formatDateForDisplay(checkIn)} - {formatDateForDisplay(checkOut)}</span>
          </div>
          
          <div className="text-xs text-gray-500">
            {calculateNights()} Night(s)
          </div>
          
          <div className="flex items-center space-x-2">
            <span>🛏️</span>
            <span>{rooms} Room</span>
            <span>👥</span>
            <span>{guests} Guests, {children} Children</span>
          </div>
        </div>

        <PriceCalculator show={showDetail} onClose={() => {}} />

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
  )
}

export default BookingSummary