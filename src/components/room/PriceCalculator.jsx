import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculatePriceDetail, formatDate, formatPrice } from '../../utils/priceCalculator';

/**
 * 价格明细卡片组件 - 显示房间预订价格明细
 * @param {boolean} show - 是否显示明细
 */
function PriceCalculator({ show = false }) {
  // TODO: 这些数据后续从 zustand store 获取
  // const { roomPriceList, startDate, endDate, roomCount, roomName } = useBookingStore()
  // 暂时使用模拟数据
  const mockData = {
    roomPriceList: [
      { date: '2025-09-09', price: 1360 },
      { date: '2025-09-10', price: 1360 },
    ],
    startDate: '2025-09-09',
    endDate: '2025-09-11',
    roomCount: 1,
    roomName: '花园景观房'
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
