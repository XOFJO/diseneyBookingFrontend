import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faCalendarAlt, faUser, faClock } from '@fortawesome/free-solid-svg-icons';

function OrderCard({ order, index }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'paid':
                return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'cancelled':
                return 'text-red-400 bg-red-400/20 border-red-400/30';
            default:
                return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 relative overflow-hidden"
            style={{
                boxShadow: "0 4px 20px rgba(139, 69, 19, 0.3), 0 0 30px rgba(251, 191, 36, 0.1)"
            }}
        >
            {/* Magical glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-50"></div>
            
            <div className="relative z-10">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="text-xs text-purple-300/80 mb-1">
                            订单日期：{order.orderDate}
                        </div>
                        <div className="flex items-center space-x-3">
                            <FontAwesomeIcon icon={faHotel} className="text-yellow-400" />
                            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                {order.hotelName}
                            </h3>
                        </div>
                        <div className="text-purple-200 mt-1">{order.roomType}</div>
                    </div>
                    
                    <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.statusText}
                        </div>
                        {order.remainingTime && (
                            <div className="text-xs text-blue-300 mt-2 flex items-center">
                                <FontAwesomeIcon icon={faClock} className="mr-1" />
                                待支付 {order.remainingTime}
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-purple-200">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-pink-400" />
                        <span>{order.checkIn} - {order.checkOut}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-200">
                        <FontAwesomeIcon icon={faUser} className="text-pink-400" />
                        <span>{order.guests}位客人</span>
                    </div>
                    <div className="text-right md:text-left">
                        <span className="text-lg font-bold text-yellow-300">
                            ¥{order.amount.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                    {order.status === 'paid' && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg border border-yellow-400/30 transition-all duration-200"
                            style={{
                                boxShadow: "0 0 15px rgba(251, 191, 36, 0.3)",
                                textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                                fontFamily: 'Georgia, serif'
                            }}
                        >
                            查看详情
                        </motion.button>
                    )}
                    {order.status === 'cancelled' && (
                        <span className="text-gray-400 text-sm">已取消订单</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default OrderCard;
