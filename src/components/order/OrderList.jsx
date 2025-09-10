import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import OrderCard from './OrderCard';

function OrderList() {
    // 模拟订单数据
    const mockOrders = [
        {
            id: 'ORD001',
            hotelName: '上海迪士尼乐园酒店',
            roomType: '豪华花园景观房',
            checkIn: '2025-09-10',
            checkOut: '2025-09-11',
            guests: 2,
            status: 'paid',
            statusText: '已付款',
            amount: 3220,
            orderDate: '2025-09-10 09:49:41',
            remainingTime: '23:17'
        },
        {
            id: 'ORD002',
            hotelName: '迪士尼好莱坞酒店',
            roomType: '标准双床房',
            checkIn: '2025-09-15',
            checkOut: '2025-09-16',
            guests: 2,
            status: 'cancelled',
            statusText: '已取消',
            amount: 2680,
            orderDate: '2025-09-08 14:22:15',
            remainingTime: null
        }
    ];

    return (
        <div className="space-y-6">
            {mockOrders.map((order, index) => (
                <OrderCard 
                    key={order.id} 
                    order={order} 
                    index={index}
                />
            ))}

            {/* Empty State */}
            {mockOrders.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <FontAwesomeIcon icon={faHotel} className="text-6xl text-purple-400/50 mb-4" />
                    <p className="text-purple-200 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                        暂无订单记录
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default OrderList;