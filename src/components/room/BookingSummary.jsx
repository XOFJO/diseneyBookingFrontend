import React, { useState } from 'react'
import PriceCalculator from './PriceCalculator'

const BookingSummary = ({
  checkIn,
  checkOut,
  rooms,
  guests,
  children,
  calculateNights,
  formatDateForDisplay,
  showPriceDetail = false, // 新增props来控制价格明细显示
  onBookNowClick, // 新增回调函数
  selectedRoom // 新增选中的房间信息
}) => {
  const [showDetail, setShowDetail] = useState(showPriceDetail);
  const [totalPrice, setTotalPrice] = useState(0); // 新增总价状态

  // 当外部的showPriceDetail变化时，更新内部状态
  React.useEffect(() => {
    setShowDetail(showPriceDetail);
  }, [showPriceDetail]);

  // 处理价格更新的回调函数
  const handlePriceUpdate = (price) => {
    setTotalPrice(price);
  };

  return (
    <div className="w-80 bg-gray-50 p-6 rounded-lg">
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

        <PriceCalculator show={showDetail} selectedRoom={selectedRoom} onPriceUpdate={handlePriceUpdate} />

        <div className="border-t mt-6 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-blue-600">¥{totalPrice.toLocaleString()}</span>
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