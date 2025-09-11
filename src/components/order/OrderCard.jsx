import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faCalendarAlt, faUser, faPhone, faBed, faFileText, faIdCard, faChevronDown, faChevronUp, faMagic, faPaperPlane, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import useComments from '../../hooks/useComments';
import { useCancelOrder } from '../../hooks/useCancelOrder';

function OrderCard({ order, index, onRefreshOrders }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // 使用评论hook
    const { submitComment, loading, error } = useComments();

    // 使用取消订单hook
    const { cancelOrderById, isLoading: isCanceling, error: cancelError, clearError } = useCancelOrder();

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

    const handleSendComment = async () => {
        if (comment.trim() && rating > 0) {
            const success = await submitComment(order.orderId, {
                rating: rating,
                comment: comment.trim()
            });

            if (success) {
                // 发送成功，清空输入框
                setComment('');
                setRating(0);
                // 刷新订单列表获取最新数据
                if (onRefreshOrders) {
                    onRefreshOrders();
                }
                console.log('评论发送成功，正在刷新订单列表');
            } else {
                // 发送失败，显示alert
                alert(error || '发送评论失败，请重试');
            }
        }
    };

    const handleCancelOrder = async (e) => {
        e.stopPropagation();

        if (window.confirm('确定要取消这个订单吗？取消后不可恢复。')) {
            const success = await cancelOrderById(order.orderId);

            if (success) {
                // 取消成功，刷新订单列表
                if (onRefreshOrders) {
                    onRefreshOrders();
                }
                alert('订单已成功取消');
            } else {
                // 取消失败，显示错误信息
                alert(cancelError || '取消订单失败，请重试');
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (comment.trim() && rating > 0 && !loading) {
                handleSendComment();
            }
        }
    };

    const handleStarHover = (starIndex, event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const width = rect.width;
        const isLeftHalf = x < width / 2;
        const rating = isLeftHalf ? starIndex - 0.5 : starIndex;
        setHoverRating(rating);
    };

    const handleStarClick = (starIndex, event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const width = rect.width;
        const isLeftHalf = x < width / 2;
        const newRating = isLeftHalf ? starIndex - 0.5 : starIndex;
        setRating(newRating);
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
                        <div className="flex justify-between items-start mb-0.5">
                            <div>
                                <div className="text-xs text-purple-300/80 mb-0.5">
                                    {order.orderDate}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faHotel} className="text-yellow-400 text-sm" />
                                    <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                        {order.hotelName}
                                    </h3>
                                </div>
                                <div className="text-purple-200 text-sm mt-0.5">{order.roomName}</div>
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

                                {/* 备注和取消订单按钮在同一行 */}
                                <div className="flex justify-between items-center text-purple-200 text-sm mb-3">
                                    <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faFileText} className="text-pink-400 text-xs" />
                                        <span>备注：{order.orderRemark || '无'}</span>
                                    </div>
                                    
                                    {/* 取消订单按钮 - 只有状态为CONFIRMED的订单才显示 */}
                                    {order.status === 'CONFIRMED' && (
                                        <motion.button
                                            onClick={handleCancelOrder}
                                            disabled={isCanceling}
                                            className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1.5 ml-4 ${isCanceling
                                                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-lg'
                                                }`}
                                            style={{
                                                fontFamily: 'Georgia, serif',
                                                boxShadow: !isCanceling ? "0 0 15px rgba(239, 68, 68, 0.3)" : "none",
                                                marginRight: '8px' // 往左移动避免被切掉
                                            }}
                                            whileHover={!isCanceling ? { scale: 1.05 } : {}}
                                            whileTap={!isCanceling ? { scale: 0.95 } : {}}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                className={`text-xs ${isCanceling ? 'animate-pulse' : ''}`}
                                            />
                                            <span className="text-xs">
                                                {isCanceling ? '取消中...' : '取消订单'}
                                            </span>
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Comment Input - Only show for CONFIRMED orders */}
                {order.status === 'CONFIRMED' && (
                    <div className="border-t border-yellow-400/20 mt-3 pt-3" onClick={(e) => e.stopPropagation()}>
                        {/* Check if order has any existing rating/comment data */}
                        {order.rating || order.comment || order.ratingDate ? (
                            // Display existing rating and comment
                            <div>
                                {/* Existing Rating Section */}
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-xs text-purple-200" style={{ fontFamily: 'Georgia, serif' }}>评分：</span>
                                    <div className="flex items-center space-x-1">
                                        {[1, 2, 3, 4, 5].map((starIndex) => {
                                            const isFull = (order.rating || 0) >= starIndex;
                                            const isHalf = (order.rating || 0) >= starIndex - 0.5 && (order.rating || 0) < starIndex;

                                            return (
                                                <div key={starIndex} className="relative inline-block">
                                                    {/* Background star (gray) */}
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        className="text-sm text-gray-500 block"
                                                    />

                                                    {/* Foreground star (yellow) - full or half */}
                                                    {(isFull || isHalf) && (
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className="text-sm text-yellow-400 absolute inset-0"
                                                            style={{
                                                                clipPath: isHalf ? 'inset(0 50% 0 0)' : 'none'
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <span className="text-xs text-purple-200 ml-2" style={{ fontFamily: 'Georgia, serif' }}>
                                            {order.rating ? order.rating.toFixed(1) : '未评分'}
                                        </span>
                                    </div>
                                </div>

                                {/* Existing Comment */}
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-xs text-purple-200 bg-black/20 rounded-lg px-3 py-2" style={{ fontFamily: 'Georgia, serif' }}>
                                            {order.comment || '暂无评论'}
                                        </p>
                                    </div>
                                    <div className="ml-3 text-xs text-purple-300/70" style={{ fontFamily: 'Georgia, serif' }}>
                                        {order.ratingDate || ''}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Show input form for new rating/comment
                            <div>
                                {/* Rating Section */}
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-xs text-purple-200" style={{ fontFamily: 'Georgia, serif' }}>评分：</span>
                                    <div className="flex items-center space-x-1">
                                        {[1, 2, 3, 4, 5].map((starIndex) => {
                                            const currentRating = hoverRating || rating;
                                            const isFull = currentRating >= starIndex;
                                            const isHalf = currentRating >= starIndex - 0.5 && currentRating < starIndex;

                                            return (
                                                <div key={starIndex} className="relative inline-block">
                                                    <motion.button
                                                        onClick={(e) => handleStarClick(starIndex, e)}
                                                        onMouseMove={(e) => handleStarHover(starIndex, e)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="focus:outline-none bg-transparent border-none p-0 relative block"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        style={{ background: 'none' }}
                                                    >
                                                        {/* Background star (gray) */}
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className="text-sm text-gray-500 transition-colors duration-200 block"
                                                            style={{ background: 'transparent' }}
                                                        />

                                                        {/* Foreground star (yellow) - full or half */}
                                                        {(isFull || isHalf) && (
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className="text-sm text-yellow-400 transition-colors duration-200 absolute inset-0"
                                                                style={{
                                                                    background: 'transparent',
                                                                    clipPath: isHalf ? 'inset(0 50% 0 0)' : 'none'
                                                                }}
                                                            />
                                                        )}
                                                    </motion.button>
                                                </div>
                                            );
                                        })}
                                        {rating > 0 && (
                                            <span className="text-xs text-purple-200 ml-2" style={{ fontFamily: 'Georgia, serif' }}>
                                                {rating.toFixed(1)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Comment Input */}
                                <div className="flex items-start space-x-3">
                                    <div className="flex-1 relative">
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="添加评论..."
                                            className="w-full bg-black/30 backdrop-blur-sm border border-purple-400/30 rounded-lg px-3 py-2 text-purple-200 placeholder-purple-300/50 resize-none focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/50 transition-all duration-200 text-xs"
                                            style={{
                                                fontFamily: 'Georgia, serif',
                                                height: '36px',
                                                overflow: 'hidden'
                                            }}
                                            rows={1}
                                        />
                                    </div>
                                    <motion.button
                                        onClick={handleSendComment}
                                        disabled={!comment.trim() || rating === 0 || loading}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${comment.trim() && rating > 0 && !loading
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg'
                                                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                            }`}
                                        style={{
                                            fontFamily: 'Georgia, serif',
                                            height: '36px',
                                            width: '44px',
                                            boxShadow: (comment.trim() && rating > 0 && !loading) ? "0 0 15px rgba(251, 191, 36, 0.3)" : "none"
                                        }}
                                        whileHover={(comment.trim() && rating > 0 && !loading) ? { scale: 1.05 } : {}}
                                        whileTap={(comment.trim() && rating > 0 && !loading) ? { scale: 0.95 } : {}}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPaperPlane}
                                            className={`text-sm ${loading ? 'animate-pulse' : ''}`}
                                        />
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default OrderCard;
