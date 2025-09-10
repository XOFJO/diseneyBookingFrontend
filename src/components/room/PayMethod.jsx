import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const PayMethod = ({ isOpen, onClose, totalPrice }) => {
  const [selectedMethod, setSelectedMethod] = useState('wechat');

  const handlePayment = () => {
    toast.success('Payment successful!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    onClose();
  };

  const paymentMethods = [
    {
      id: 'wechat',
      name: 'WeChat Pay',
      icon: '💬',
      recommended: true
    },
    {
      id: 'alipay',
      name: 'Alipay',
      icon: '🅰️',
      recommended: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Choose Payment Method</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-xl" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Price Display */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ¥{totalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      If you haven't paid yet, your order will be cancelled after 29:44 minutes, and the items and services in this order will no longer be reserved for you. Please note.
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Please select a payment method</h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedMethod === method.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedMethod === method.id && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          
                          <div className="text-3xl">{method.icon}</div>
                          
                          <div className="flex-1">
                            <span className="font-medium text-gray-800">{method.name}</span>
                            {method.recommended && (
                              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Payment Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>Confirm Payment</span>
                </motion.button>

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <div className="text-blue-500 mt-0.5">ℹ️</div>
                    <div className="text-xs text-gray-600">
                      After clicking Pay Now, you will be redirected to a third-party website to complete the payment. All personal information you fill in on the third-party website (such as bank card numbers and other payment information) will be collected and processed directly by the third-party website.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PayMethod;