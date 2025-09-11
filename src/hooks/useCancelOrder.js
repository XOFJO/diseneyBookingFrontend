import { useState } from 'react';
import { cancelOrder } from '../services/api';

export const useCancelOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelOrderById = async (orderId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await cancelOrder(orderId);
      
      // 检查状态码是否为200
      if (response.status === 200) {
        setIsLoading(false);
        return true; // 取消成功
      } else {
        setError(`操作失败，状态码: ${response.status}`);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setIsLoading(false);
      
      // 根据错误类型设置不同的错误信息
      if (err.response) {
        const { status } = err.response;
        switch (status) {
          case 400:
            setError(`订单状态不允许取消，状态码: ${status}`);
            break;
          case 401:
            setError(`请先登录，状态码: ${status}`);
            break;
          case 403:
            setError(`没有权限取消此订单，状态码: ${status}`);
            break;
          case 404:
            setError(`订单不存在，状态码: ${status}`);
            break;
          case 409:
            setError(`订单已被取消或完成，状态码: ${status}`);
            break;
          case 500:
            setError(`服务器错误，状态码: ${status}`);
            break;
          default:
            setError(`操作失败，状态码: ${status}`);
        }
      } else if (err.request) {
        setError('网络连接错误，请检查网络');
      } else {
        setError(`取消订单失败: ${err.message}`);
      }
      
      return false;
    }
  };

  return {
    cancelOrderById,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};
