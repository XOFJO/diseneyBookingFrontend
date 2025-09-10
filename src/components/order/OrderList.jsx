import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import OrderCard from './OrderCard';
import useOrderStore from '../../store/orderStore';

function OrderList() {
    const { activeFilter, getFilteredOrders } = useOrderStore();
    // 模拟订单数据
    const mockOrders = [
        {
            orderId: 1,
            hotelName: '上海迪士尼梦幻奇缘酒店',
            themeName: 'Frozen Magic',
            roomName: '豪华花园景观房',
            roomNumbers: '1208',
            roomCount: 1,
            checkIn: '2025-08-01',
            checkOut: '2025-09-01',
            userName: 'Li Hua',
            phone: '138****8888',
            orderRemark: '蜜月旅行，希望安排高层房间',
            status: 'CONFIRMED',
            totalPrice: 3220,
            orderDate: '2025-09-10 09:49:41'
        },
        {
            orderId: 2,
            hotelName: '上海迪士尼梦幻奇缘酒店',
            themeName: 'Princess Dream',
            roomName: '标准双床房',
            roomNumbers: '806;808',
            roomCount: 2,
            checkIn: '2025-09-15',
            checkOut: '2025-09-16',
            userName: 'Zhang San',
            phone: '159****6666',
            orderRemark: '',
            status: 'CANCELLED',
            totalPrice: 2680,
            orderDate: '2025-09-08 14:22:15'
        }
    ];

    // 使用store中的筛选方法
    const filteredOrders = getFilteredOrders(mockOrders, activeFilter);

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
                        暂无{activeFilter === 'ALL' ? '' : activeFilter === 'CONFIRMED' ? '已确认' : '已取消'}订单记录
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default OrderList;