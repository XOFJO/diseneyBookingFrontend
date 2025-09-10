import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const RoomReview = ({ isOpen, onClose }) => {
  const [reviews] = useState([
    {
      id: 2,
      userName: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5.0,
      date: "2024-12-10",
      comment: "Amazing experience! The room was spacious and beautifully decorated. Great value for money and the location couldn't be better. The booking process was smooth and check-in was quick."
    },
    {
      id: 3,
      userName: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      date: "2024-12-08",
      comment: "Fantastic accommodation with modern facilities and excellent service. The room was spotless and the bed was incredibly comfortable. Perfect for both business and leisure travelers."
    },
    {
      id: 4,
      userName: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.2,
      date: "2024-12-05",
      comment: "Great location and friendly staff. The room was clean and had all the necessary amenities. The only minor issue was the air conditioning, but overall a pleasant stay."
    },
    {
      id: 5,
      userName: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      date: "2024-12-02",
      comment: "Exceeded all expectations! The room was luxurious, the view was breathtaking, and the service was impeccable. The breakfast was delicious and the spa facilities were top-notch."
    },
    {
      id: 6,
      userName: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      date: "2024-11-28",
      comment: "Wonderful stay for our anniversary. The room was romantic and beautifully appointed. The concierge helped us plan perfect evening activities. Highly recommend for couples."
    },
    {
      id: 7,
      userName: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      rating: 4.4,
      date: "2024-11-25",
      comment: "Perfect for business travel. Fast wifi, comfortable workspace, and excellent room service. The location made it easy to reach all my meetings. Will definitely book again."
    },
    {
      id: 8,
      userName: "Robert Kim",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
      rating: 3.8,
      date: "2024-11-20",
      comment: "Decent stay overall. The room was comfortable and the location was convenient. Staff was helpful though check-in took longer than expected. Good value for the price."
    },
    {
      id: 9,
      userName: "Jennifer Lee",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      date: "2024-11-18",
      comment: "Lovely hotel with beautiful architecture. The room was spacious and well-designed. The restaurant had excellent food and the staff went above and beyond to make our stay special."
    },
    {
      id: 10,
      userName: "Alex Turner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.3,
      date: "2024-11-15",
      comment: "Good location and clean facilities. The room had everything we needed for our short stay. The front desk staff was particularly helpful with local recommendations."
    },
    {
      id: 11,
      userName: "Sophie Martin",
      avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      date: "2024-11-12",
      comment: "Outstanding service and beautiful accommodations. The room was pristine and the amenities were first-class. The pool and fitness center were excellent. Highly recommended!"
    },
    {
      id: 12,
      userName: "Carlos Santos",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      rating: 4.1,
      date: "2024-11-08",
      comment: "Nice hotel in a great location. The room was comfortable and the staff was friendly. The only downside was some noise from the street, but the quality of service made up for it."
    },
    {
      id: 13,
      userName: "Rachel Davis",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      date: "2024-11-05",
      comment: "Absolutely perfect stay! The room was immaculate, the bed was incredibly comfortable, and the bathroom was luxurious. The hotel staff anticipated every need. Can't wait to return!"
    }
  ])

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        <span className="text-lg font-bold text-gray-800">{rating.toFixed(1)}</span>
        <div className="flex space-x-1 ml-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-sm ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-3xl max-h-[67vh] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <Dialog.Title as="h2" className="text-xl font-bold text-gray-800">
                    Customer Reviews
                  </Dialog.Title>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-xl" />
                  </motion.button>
                </div>

                {/* Reviews Content */}
                <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(67vh - 140px)' }}>
                  <div className="space-y-3">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                        tabIndex={0}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Avatar */}
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={review.avatar}
                            alt={`${review.userName}'s avatar`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          />
                          
                          {/* Review Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="text-base font-semibold text-gray-800 mb-1">
                                  {review.userName}
                                </h4>
                                {renderStars(review.rating)}
                              </div>
                              <time className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                                {review.date}
                              </time>
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed text-sm">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 text-sm">
                      {reviews.length} total reviews
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RoomReview