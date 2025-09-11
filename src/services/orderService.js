import apiClient from './api.js';

/**
 * 通用API错误处理函数
 * @param {Error} error - axios错误对象
 * @param {string} defaultMessage - 默认错误消息
 * @returns {string} 格式化的错误消息
 */
export const handleApiError = (error, defaultMessage = '操作失败') => {
  console.error('API错误:', error);
  
  if (error.response) {
    // 服务器响应了状态码，但不是2xx
    const status = error.response.status;
    const statusText = error.response.statusText;
    let errorMessage = `${defaultMessage} (状态码: ${status} ${statusText})`;
    
    // 根据不同状态码提供更具体的错误信息
    switch (status) {
      case 400:
        errorMessage += ' - 请求参数错误';
        break;
      case 401:
        errorMessage += ' - 未授权，请重新登录';
        break;
      case 403:
        errorMessage += ' - 无权限访问';
        break;
      case 404:
        errorMessage += ' - 资源不存在';
        break;
      case 500:
        errorMessage += ' - 服务器内部错误';
        break;
      case 502:
        errorMessage += ' - 网关错误';
        break;
      case 503:
        errorMessage += ' - 服务暂时不可用';
        break;
      default:
        errorMessage += ' - 请稍后重试';
    }
    
    return errorMessage;
  } else if (error.request) {
    // 请求已发出但没有收到响应
    return '网络连接失败，请检查网络连接';
  } else {
    // 其他错误
    return `请求配置错误: ${error.message}`;
  }
}

/**
 * 获取用户订单列表
 * @param {number} userId - 用户ID
 * @returns {Promise<Array>} 订单列表
 */
export const getOrders = async (userId = 1) => {
  try {
    const response = await apiClient.get(`/api/users/${userId}/orders`);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error, '获取订单失败');
    throw new Error(errorMessage);
  }
};

/**
 * 根据状态筛选订单
 * @param {Array} orders - 订单列表
 * @param {string} status - 订单状态 ('CONFIRMED' | 'CANCELLED' | 'ALL')
 * @returns {Array} 筛选后的订单列表
 */
export const filterOrdersByStatus = (orders, status) => {
  if (!orders || !Array.isArray(orders)) {
    return [];
  }
  
  if (status === 'ALL') {
    return orders;
  }
  
  return orders.filter(order => order.status === status);
};

/**
 * 格式化订单数据
 * @param {Object} order - 原始订单数据
 * @returns {Object} 格式化后的订单数据
 */
export const formatOrderData = (order) => {
  return {
    ...order,
    // 确保日期格式统一
    checkIn: order.checkIn,
    checkOut: order.checkOut,
    orderDate: order.orderDate,
    ratingDate: order.ratingDate,
    // 确保数值类型正确
    totalPrice: Number(order.totalPrice),
    rating: order.rating ? Number(order.rating) : null,
    roomCount: Number(order.roomCount),
    // 确保字符串字段不为null
    comment: order.comment || '',
    orderRemark: order.orderRemark || '',
  };
};

/**
 * 批量格式化订单数据
 * @param {Array} orders - 订单列表
 * @returns {Array} 格式化后的订单列表
 */
export const formatOrdersList = (orders) => {
  if (!orders || !Array.isArray(orders)) {
    return [];
  }
  
  return orders.map(formatOrderData);
};
