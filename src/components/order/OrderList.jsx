import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import OrderCard from './OrderCard';
import useOrderStore from '../../store/orderStore';
import useOrders from '../../hooks/useOrders';

function OrderList() {
    const { activeFilter, getFilteredOrders } = useOrderStore();
    const { orders: allOrders, loading, error, refreshOrders } = useOrders();
    
    // 使用store中的筛选方法
    const filteredOrders = getFilteredOrders(allOrders, activeFilter);

    // 加载状态
    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <FontAwesomeIcon 
                    icon={faSpinner} 
                    className="text-4xl text-purple-400 animate-spin" 
                />
                <span className="ml-3 text-purple-200 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                    正在加载订单...
                </span>
            </div>
        );
    }

    // 错误状态
    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
            >
                <div className="text-red-400 text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    {error}
                </div>
                <button
                    onClick={refreshOrders}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    重新加载
                </button>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            {filteredOrders.map((order, index) => (
                <OrderCard 
                    key={order.orderId} 
                    order={order} 
                    index={index}
                />
            ))}

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <FontAwesomeIcon icon={faHotel} className="text-6xl text-purple-400/50 mb-4" />
                    <p className="text-purple-200 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                        暂无订单，
                        <Link 
                            to="/" 
                            className="text-yellow-400 hover:text-yellow-300 underline transition-colors duration-200"
                            style={{ 
                                fontFamily: 'Georgia, serif',
                                textShadow: "0 0 10px rgba(251, 191, 36, 0.5)"
                            }}
                        >
                            点击订房
                        </Link>
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default OrderList;