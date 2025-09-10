import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const PayMethod = ({ isOpen, onClose, totalPrice }) => {
  const [selectedMethod, setSelectedMethod] = useState('wechat');

  const handlePayment = () => {
    toast.success('Payment successful!', {
      position: "top-right",
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h2" className="text-xl font-bold">
                      Choose Payment Method
                    </Dialog.Title>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2 text-white hover:text-gray-200 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-xl" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Price Display */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 p-4 rounded-lg mb-6"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        ¥{totalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Please complete the payment within 15 minutes
                      </div>
                    </div>
                  </motion.div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Please select a payment method
                    </h3>
                    <div className="space-y-3">
                      {paymentMethods.map((method, index) => (
                        <motion.div
                          key={method.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            selectedMethod === method.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              selectedMethod === method.id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedMethod === method.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 bg-white rounded-full"
                                />
                              )}
                            </div>
                            
                            <div className="text-3xl">{method.icon}</div>
                            
                            <div className="flex-1">
                              <span className="font-medium text-gray-800">{method.name}</span>
                              {method.recommended && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
                                >
                                  Recommended
                                </motion.span>
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
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span>Confirm Payment</span>
                  </motion.button>

                  {/* Security Notice */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="text-blue-500 mt-0.5">ℹ️</div>
                      <div className="text-xs text-gray-600">
                        For your account security, please do not disclose your payment password to anyone. DisneyBooking will never ask you for your password.
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PayMethod;