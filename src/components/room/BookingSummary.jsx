import React, { useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHotel,
  faCalendarAlt,
  faBed,
  faUsers,
  faChevronDown,
  faCreditCard,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-xl border border-blue-200/50">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 text-lg" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Your Selection & Price</h3>
          </div>

          {/* Hotel Info Section */}
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 mb-4">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faHotel} className="text-blue-600" />
                    <span className="font-semibold text-gray-800">Hotel Details</span>
                  </div>
                  <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
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
                  <Disclosure.Panel className="mb-6">
                    <div className="space-y-4 bg-blue-50/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FontAwesomeIcon icon={faHotel} className="text-blue-600 text-sm" />
                        </div>
                        <span className="font-medium text-gray-800">Shanghai Disneyland Hotel</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-green-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">
                            {formatDateForDisplay(checkIn)} - {formatDateForDisplay(checkOut)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {calculateNights()} Night{calculateNights() > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <FontAwesomeIcon icon={faBed} className="text-purple-600 text-sm" />
                          </div>
                          <div className="text-sm">
                            <div className="font-medium text-gray-800">{rooms}</div>
                            <div className="text-xs text-gray-500">Room{rooms > 1 ? 's' : ''}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <FontAwesomeIcon icon={faUsers} className="text-orange-600 text-sm" />
                          </div>
                          <div className="text-sm">
                            <div className="font-medium text-gray-800">{guests + children}</div>
                            <div className="text-xs text-gray-500">
                              {guests} Adult{guests > 1 ? 's' : ''}{children > 0 && `, ${children} Child${children > 1 ? 'ren' : ''}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>

          {/* Price Calculator */}
          <PriceCalculator show={showDetail} selectedRoom={selectedRoom} onPriceUpdate={handlePriceUpdate} />

          {/* Total Section */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-lg text-white mb-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faCreditCard} />
                  <span className="text-lg font-bold">Total:</span>
                </div>
                <span className="text-2xl font-bold">¥{totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-blue-100 text-xs mt-2">Prices in Chinese Yuan (CNY)</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BookingSummary;