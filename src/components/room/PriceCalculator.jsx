import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculatePriceDetail, formatDate, formatPrice } from '../../utils/priceCalculator';
import useSearchStore from '../../store/searchStore';

/**
 * 价格明细卡片组件 - 显示房间预订价格明细
 * @param {boolean} show - 是否显示明细
 * @param {Object} selectedRoom - 选中的房间信息
 */
function PriceCalculator({ show = false, selectedRoom }) {
  // 从 zustand store 获取入住日期和房间数
  const { checkIn, checkOut, rooms } = useSearchStore();
  
  // 生成价格列表数据 - 基于实际的入住天数和选中房间的价格
  const generatePriceList = (startDate, endDate, roomPrice) => {
    const priceList = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // 计算入住期间的每一天（不包括退房日）
    const currentDate = new Date(start);
    while (currentDate < end) {
      priceList.push({
        date: currentDate.toISOString().split('T')[0],
        price: roomPrice || 1360 // 使用房间价格，如果没有则使用默认价格
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return priceList;
  };

  // 生成模拟数据
  const mockData = {
    roomPriceList: checkIn && checkOut ? generatePriceList(checkIn, checkOut, selectedRoom?.price) : [
      { date: '2025-09-09', price: selectedRoom?.price || 1360 },
      { date: '2025-09-10', price: selectedRoom?.price || 1360 },
    ],
    startDate: checkIn || '2025-09-09',
    endDate: checkOut || '2025-09-11',
    roomCount: rooms || 1,
    roomName: selectedRoom?.name || '花园景观房'
  };

  const { roomPriceList, startDate, endDate, roomCount, roomName } = mockData;
  const { detail, totalPrice } = calculatePriceDetail(roomPriceList, startDate, endDate, roomCount);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: 'hidden' }}
          className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto"
        >
          {/* 头部 */}
          <div className="mb-4">
            <div className="text-base font-semibold text-gray-800">房间明细</div>
          </div>
          {/* 房型信息 */}
          <div className="mb-4">
            <div className="font-bold text-gray-900">{roomName}</div>
          </div>
          {/* 价格明细 */}
          <div className="mb-4">
            <ul className="space-y-2">
              {detail.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{formatDate(item.date)}</span>
                  <span className="text-gray-900 font-medium">
                    {formatPrice(item.price)} × {item.roomCount} = <span className="font-bold">{formatPrice(item.total)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* 分割线 */}
          <div className="border-t border-gray-200 mb-4"></div>
          {/* 总计 */}
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-900">合计</span>
            <span className="text-lg font-bold text-blue-700">{formatPrice(totalPrice)}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PriceCalculator;
