import { useState, useEffect, useCallback } from 'react';
import { getOrders, filterOrdersByStatus, formatOrdersList } from '../services/orderService.js';

/**
 * 订单管理Hook
 * @param {number} userId - 用户ID，默认为1
 * @returns {Object} 包含订单数据和操作方法的对象
 */
export const useOrders = (userId = 1) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('ALL');

  /**
   * 获取订单数据
   */
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getOrders(userId);
      const formattedOrders = formatOrdersList(response);
      setOrders(formattedOrders);
      
      // 应用当前筛选条件
      const filtered = filterOrdersByStatus(formattedOrders, currentFilter);
      setFilteredOrders(filtered);
    } catch (err) {
      setError(err.message || '获取订单失败');
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  }, [userId, currentFilter]);

  /**
   * 筛选订单
   * @param {string} status - 订单状态 ('CONFIRMED' | 'CANCELLED' | 'ALL')
   */
  const filterOrders = useCallback((status) => {
    setCurrentFilter(status);
    const filtered = filterOrdersByStatus(orders, status);
    setFilteredOrders(filtered);
  }, [orders]);

  /**
   * 刷新订单数据
   */
  const refreshOrders = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  /**
   * 根据订单ID查找订单
   * @param {number} orderId - 订单ID
   * @returns {Object|null} 订单对象或null
   */
  const getOrderById = useCallback((orderId) => {
    return orders.find(order => order.orderId === orderId) || null;
  }, [orders]);

  /**
   * 获取订单统计信息
   * @returns {Object} 统计信息
   */
  const getOrderStats = useCallback(() => {
    const total = orders.length;
    const confirmed = orders.filter(order => order.status === 'CONFIRMED').length;
    const cancelled = orders.filter(order => order.status === 'CANCELLED').length;
    
    return {
      total,
      confirmed,
      cancelled
    };
  }, [orders]);

  // 初始化时获取订单数据
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 当筛选条件改变时重新筛选
  useEffect(() => {
    const filtered = filterOrdersByStatus(orders, currentFilter);
    setFilteredOrders(filtered);
  }, [orders, currentFilter]);

  return {
    // 数据
    orders: filteredOrders,
    allOrders: orders,
    loading,
    error,
    currentFilter,
    
    // 操作方法
    filterOrders,
    refreshOrders,
    getOrderById,
    getOrderStats,
    
    // 便捷的状态检查
    hasOrders: orders.length > 0,
    hasFilteredOrders: filteredOrders.length > 0,
  };
};

export default useOrders;
