import React, { useState, useEffect } from 'react'
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
  faInfoCircle,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import PriceCalculator from './PriceCalculator'
import PayMethod from './PayMethod'
import useHotelStore from '../../store/hotelStore'
import useSearchStore from '../../store/searchStore'
import { getHotels } from '../../services/hotelService'
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
  const [hotelName, setHotelName] = useState('Loading...'); // 新增酒店名称状态
  const [bookingRooms, setBookingRooms] = useState(rooms || 1); // 实际预订的房间数
  const [maxRooms, setMaxRooms] = useState(rooms || 1); // 最大可预订房间数
  const [showPayMethod, setShowPayMethod] = useState(false); // 支付方式弹窗状态
  
  const { selectedHotelId } = useHotelStore();
  const { selectedHotel } = useSearchStore();

  // 获取酒店名称
  useEffect(() => {
    const fetchHotelName = async () => {
      console.log('BookingSummary - Fetching hotel name:', { selectedHotel, selectedHotelId });
      
      // 优先使用 searchStore 中的 selectedHotel
      if (selectedHotel && selectedHotel.name && selectedHotel.id !== 'all') {
        console.log('BookingSummary - Using selectedHotel name:', selectedHotel.name);
        setHotelName(selectedHotel.name);
        return;
      }
      
      // 如果有 selectedHotelId，从API获取酒店名称
      if (selectedHotelId && selectedHotelId !== 'all') {
        try {
          console.log('BookingSummary - Fetching hotel by ID:', selectedHotelId);
          const hotels = await getHotels();
          const hotel = hotels.find(h => h.id === selectedHotelId);
          if (hotel && hotel.name) {
            console.log('BookingSummary - Found hotel by ID:', hotel.name);
            setHotelName(hotel.name);
            return;
          }
        } catch (error) {
          console.error('Failed to fetch hotel name:', error);
        }
      }
      
      // 默认值
      console.log('BookingSummary - Using default hotel name');
      setHotelName('Shanghai Disneyland Hotel');
    };

    fetchHotelName();
  }, [selectedHotelId, selectedHotel]);

  // 当外部的showPriceDetail变化时，更新内部状态
  React.useEffect(() => {
    setShowDetail(showPriceDetail);
  }, [showPriceDetail]);

  // 当搜索房间数变化时，更新本地状态
  useEffect(() => {
    setBookingRooms(rooms || 1);
    setMaxRooms(rooms || 1);
  }, [rooms]);

  // 当选中房间变化时，更新最大房间数
  useEffect(() => {
    if (selectedRoom && selectedRoom.available) {
      console.log('BookingSummary - Updating max rooms from selected room:', selectedRoom.available);
      setMaxRooms(selectedRoom.available);
      // 如果当前预订房间数超过了可用房间数，调整到最大可用数
      if (bookingRooms > selectedRoom.available) {
        setBookingRooms(selectedRoom.available);
      }
    }
  }, [selectedRoom, bookingRooms]);

  // 房间数调节函数
  const adjustRooms = (increment) => {
    const newRooms = Math.max(1, Math.min(maxRooms, bookingRooms + increment));
    setBookingRooms(newRooms);
  };

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
          className="bg-white rounded-xl shadow-lg border border-gray-100 max-h-[70vh] overflow-hidden flex flex-col"
        >
          {/* Scrollable Content Area */}
          <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 #f1f5f9'
            }}
          >
            <div className="p-6"
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
              <div>
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
                        <span className="font-medium text-gray-800">{hotelName}</span>
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
                          <div className="flex items-center space-x-2 flex-1">
                            <div className="text-sm">
                              <div className="text-xs text-gray-500 mb-1">Rooms</div>
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => adjustRooms(-1)}
                                  disabled={bookingRooms <= 1}
                                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <FontAwesomeIcon icon={faMinus} className="h-2 w-2 text-gray-500" />
                                </motion.button>
                                <span className="font-medium text-gray-800 w-8 text-center">{bookingRooms}</span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => adjustRooms(1)}
                                  disabled={bookingRooms >= maxRooms}
                                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <FontAwesomeIcon icon={faPlus} className="h-2 w-2 text-gray-500" />
                                </motion.button>
                              </div>
                              {selectedRoom && (
                                <div className="text-xs text-gray-400 mt-1">
                                  Max: {maxRooms} available
                                </div>
                              )}
                            </div>
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
              </div>
            )}
          </Disclosure>

          {/* Price Calculator */}
          <PriceCalculator 
            show={showDetail} 
            selectedRoom={selectedRoom} 
            onPriceUpdate={handlePriceUpdate}
            roomCount={bookingRooms}
          />
            </div>
          </div>

          {/* Fixed Total Section */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-lg text-white cursor-pointer"
              onClick={() => setShowPayMethod(true)}
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
      
      {/* PayMethod Modal */}
      <PayMethod 
        isOpen={showPayMethod}
        onClose={() => setShowPayMethod(false)}
        totalPrice={totalPrice}
      />
    </motion.div>
  )
}

export default BookingSummary;