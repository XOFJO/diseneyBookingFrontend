import { useState } from 'react';
import { sentComments } from '../services/api';

/**
 * 评论管理Hook
 * @returns {Object} 包含评论操作方法和状态的对象
 */
export const useComments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 发送评论和评分
   * @param {number} orderId - 订单ID
   * @param {Object} commentData - 评论数据 {rating, comment}
   * @returns {Promise<boolean>} 是否发送成功
   */
  const submitComment = async (orderId, commentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sentComments(orderId, commentData);
      console.log('API响应:', response);
      
      // 检查返回的状态码，只有200才算成功
      if (response.status === 200) {
        console.log('评论发送成功');
        setLoading(false);
        return true;
      } else {
        // 状态码不是200，视为失败
        const errorMessage = `操作失败，状态码: ${response.status}`;
        console.error(errorMessage);
        setError(errorMessage);
        setLoading(false);
        return false;
      }
    } catch (err) {
      console.error('发送评论失败:', err);
      
      // 根据API返回的状态码生成具体的错误信息
      let errorMessage = '发送评论失败，请重试';
      
      if (err.response) {
        const status = err.response.status;
        const serverMessage = err.response.data?.message;
        
        switch (status) {
          case 400:
            errorMessage = serverMessage || '请求参数错误，请检查评分和评论内容';
            break;
          case 401:
            errorMessage = '用户未登录，请重新登录后再试';
            break;
          case 403:
            errorMessage = '没有权限评论此订单';
            break;
          case 404:
            errorMessage = '订单不存在或已被删除';
            break;
          case 409:
            errorMessage = '该订单已经评价过了';
            break;
          case 500:
            errorMessage = serverMessage || '服务器内部错误，请稍后重试';
            break;
          case 502:
            errorMessage = '网关错误，请稍后重试';
            break;
          case 503:
            errorMessage = '服务暂时不可用，请稍后重试';
            break;
          default:
            errorMessage = serverMessage || `请求失败 (状态码: ${status})`;
        }
      } else if (err.request) {
        errorMessage = '网络连接失败，请检查网络连接';
      } else {
        errorMessage = `请求配置错误: ${err.message}`;
      }
      
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  /**
   * 清除错误状态
   */
  const clearError = () => {
    setError(null);
  };

  return {
    // 状态
    loading,
    error,
    
    // 操作方法
    submitComment,
    clearError,
    
    // 便捷的状态检查
    isSubmitting: loading,
    hasError: !!error,
  };
};

export default useComments;
