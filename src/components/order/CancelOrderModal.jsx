import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function CancelOrderModal({ isOpen, onClose, onConfirm, orderInfo, isLoading }) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-lg rounded-2xl border border-slate-300/20 p-6 max-w-md w-full mx-4"
          style={{
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(148, 163, 184, 0.1)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
          </button>

          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500/20 rounded-full p-3">
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                className="text-orange-400 text-2xl" 
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-100 text-center mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            确认取消订单
          </h3>

          {/* Order Info */}
          <div className="bg-slate-700/50 rounded-lg p-4 mb-6 border border-slate-500/30">
            <div className="text-sm text-slate-300 space-y-2">
              <div>
                <span className="text-amber-400">酒店：</span>
                <span className="text-slate-100">{orderInfo?.hotelName}</span>
              </div>
              <div>
                <span className="text-amber-400">房间：</span>
                <span className="text-slate-100">{orderInfo?.roomName}</span>
              </div>
              <div>
                <span className="text-amber-400">日期：</span>
                <span className="text-slate-100">{orderInfo?.checkIn} - {orderInfo?.checkOut}</span>
              </div>
              <div>
                <span className="text-amber-400">金额：</span>
                <span className="text-slate-100 font-bold">¥{orderInfo?.totalPrice?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-orange-900/30 border border-orange-500/30 rounded-lg p-4 mb-6">
            <div className="text-orange-200 text-sm space-y-2" style={{ fontFamily: 'Georgia, serif' }}>
              <p className="font-medium">⚠️ 重要提醒</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>订单取消后将无法恢复</li>
                <li>退款将按照酒店政策处理</li>
                <li>可能产生取消费用</li>
                <li>建议仔细考虑后再确认</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                isLoading
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 shadow-md'
              }`}
              style={{
                fontFamily: 'Georgia, serif',
                boxShadow: !isLoading ? "0 4px 12px rgba(239, 68, 68, 0.2)" : "none"
              }}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-transparent"></div>
                  <span>处理中...</span>
                </>
              ) : (
                <span>确认取消订单</span>
              )}
            </motion.button>
            
            <motion.button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-slate-200 text-slate-700 rounded-lg font-medium transition-all duration-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Georgia, serif' }}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              保留订单
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

export default CancelOrderModal;
