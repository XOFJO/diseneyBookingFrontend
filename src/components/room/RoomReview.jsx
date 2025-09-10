import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const RoomReview = ({ isOpen, onClose }) => {
  const [reviews] = useState([
    {
      id: 1,
      userName: "Hakuna Matata",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
      rating: 4.5,
      timeAgo: "24 days ago",
      comment: "The room was absolutely wonderful! Clean, comfortable, and perfectly located. The staff was incredibly helpful and the amenities exceeded our expectations. Would definitely stay here again!"
    },
    {
      id: 2,
      userName: "Hakuna Mattaa",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5.0,
      timeAgo: "24 days ago",
      comment: "Amazing experience! The room was spacious and beautifully decorated. Great value for money and the location couldn't be better. The booking process was smooth and check-in was quick."
    },
    {
      id: 3,
      userName: "Loft Bed Package",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      timeAgo: "24 days ago",
      comment: "Fantastic accommodation with modern facilities and excellent service. The room was spotless and the bed was incredibly comfortable. Perfect for both business and leisure travelers."
    }
  ])

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        <span className="text-2xl font-bold text-gray-800">{rating.toFixed(1)}</span>
        <div className="flex space-x-1 ml-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-lg ${
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-w-4xl max-h-[90vh] mx-auto my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </motion.button>
            </div>

            {/* Reviews Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={review.avatar}
                        alt={review.userName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      
                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">
                              {review.userName}
                            </h4>
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                            {review.timeAgo}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed text-base">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">
                  {reviews.length} total reviews
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>Load More</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default RoomReview