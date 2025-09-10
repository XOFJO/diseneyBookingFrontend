import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faCalendarAlt, faUser, faPhone, faBed, faFileText, faIdCard, faChevronDown, faChevronUp, faMagic } from '@fortawesome/free-solid-svg-icons';

function OrderCard({ order, index }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'CONFIRMED':
                return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'CANCELLED':
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
            className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-yellow-400/30 relative overflow-hidden cursor-pointer"
            style={{
                boxShadow: "0 4px 20px rgba(139, 69, 19, 0.3), 0 0 30px rgba(251, 191, 36, 0.1)"
            }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Magical glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-50"></div>
            
            <div className="relative z-10">
                {/* Collapsed View - Always Visible */}
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="text-xs text-purple-300/80 mb-1">
                                    {order.orderDate}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faHotel} className="text-yellow-400 text-sm" />
                                    <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                        {order.hotelName}
                                    </h3>
                                </div>
                                <div className="text-purple-200 text-sm mt-1">{order.roomName}</div>
                            </div>
                            
                            <div className="text-right">
                                <div className={`inline-flex items-center px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </div>
                            </div>
                        </div>

                        {/* Basic Info Row */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2 text-purple-200 text-sm">
                                <FontAwesomeIcon icon={faCalendarAlt} className="text-pink-400 text-xs" />
                                <span>{order.checkIn} - {order.checkOut}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-yellow-300">
                                    ¥{order.totalPrice.toLocaleString()}
                                </span>
                                <FontAwesomeIcon 
                                    icon={isExpanded ? faChevronUp : faChevronDown} 
                                    className="text-purple-300 text-sm ml-2" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="border-t border-yellow-400/20 mt-3 pt-3">
                                {/* Order ID and Theme Name */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-3">
                                    <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faIdCard} className="text-yellow-400 text-sm" />
                                        <span className="text-sm text-purple-200">订单ID：{order.orderId}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faMagic} className="text-yellow-400 text-sm" />
                                        <span className="text-sm text-purple-200">主题：{order.themeName}</span>
                                    </div>
                                </div>

                                {/* Detailed Info Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-3">
                                    {/* 房间信息 */}
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-purple-200 text-sm">
                                            <FontAwesomeIcon icon={faBed} className="text-pink-400 text-xs" />
                                            <span>房间号：{order.roomNumbers.replace(/;/g, ', ')}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-purple-200 text-sm">
                                            <FontAwesomeIcon icon={faBed} className="text-pink-400 text-xs" />
                                            <span>房间数：{order.roomCount}间</span>
                                        </div>
                                    </div>

                                    {/* 客人信息 */}
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-purple-200 text-sm">
                                            <FontAwesomeIcon icon={faUser} className="text-pink-400 text-xs" />
                                            <span>入住人：{order.userName}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-purple-200 text-sm">
                                            <FontAwesomeIcon icon={faPhone} className="text-pink-400 text-xs" />
                                            <span>电话：{order.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 备注 */}
                                <div className="flex items-center space-x-2 text-purple-200 text-sm">
                                    <FontAwesomeIcon icon={faFileText} className="text-pink-400 text-xs" />
                                    <span>备注：{order.orderRemark || '无'}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default OrderCard;
