import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { getRoomComments } from '../../services/api'
import useHotelStore from '../../store/hotelStore'
import AIReviewSummary from '../ai/AIReviewSummary'

const RoomReview = ({ isOpen, onClose, roomId, roomTheme }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { selectedHotelId } = useHotelStore()

  // Generate default avatar based on userName
  const generateAvatar = (userName) => {
    const avatars = [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face"
    ];
    const hash = userName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[hash % avatars.length];
  }

  // Format date from backend format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // If it's already in YYYY-MM-DD format, return as is
    if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // If it's a full datetime or needs parsing
    const date = new Date(dateString);
    // Use getFullYear, getMonth, getDate to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Fetch reviews from backend
  const fetchReviews = async () => {
    // Use selectedHotelId from store, or fallback to 1 for testing
    const hotelIdToUse = selectedHotelId || 1;
    
    if (!hotelIdToUse || !roomTheme) {
      console.log('Missing required data:', { hotelIdToUse, roomTheme, selectedHotelId });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await getRoomComments(hotelIdToUse, roomTheme);

      console.log('API call made with params:', { hotelId: hotelIdToUse, themeName: roomTheme });

      console.log('API Response:', response);

      // Filter out invalid comments and transform data
      const validComments = response.filter(comment => 
        comment.comment && 
        comment.rating && 
        comment.userName && 
        comment.ratingDate
      );

      const transformedReviews = validComments.map((comment, index) => ({
        id: index + 1,
        userName: comment.userName,
        avatar: generateAvatar(comment.userName),
        rating: parseFloat(comment.rating),
        date: formatDate(comment.ratingDate),
        comment: comment.comment
      }));

      console.log('Transformed Reviews:', transformedReviews);
      setReviews(transformedReviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
      // Fallback to empty array
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch reviews when modal opens and we have the required data
  useEffect(() => {
    if (isOpen) {
      console.log('RoomReview opened with:', { 
        roomId, 
        roomTheme, 
        selectedHotelId,
        hasRequiredData: !!(selectedHotelId && roomTheme)
      });
      
      if (roomTheme) {
        fetchReviews();
      } else {
        console.warn('Missing required data for API call:', { selectedHotelId, roomTheme });
      }
    }
  }, [isOpen, selectedHotelId, roomTheme]);


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

                {/* AI Summary Section */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <AIReviewSummary 
                    roomTheme={roomTheme || "Disney Theme Room"} 
                    className="mb-0"
                  />
                </div>

                {/* Reviews Content */}
                <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(67vh - 200px)' }}>
                  {loading && (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-gray-600">Loading reviews...</span>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <div className="text-red-500 mb-2">⚠️</div>
                        <p className="text-red-600 text-sm">{error}</p>
                        <button
                          onClick={fetchReviews}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          Try again
                        </button>
                      </div>
                    </div>
                  )}

                  {!loading && !error && reviews.length === 0 && (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">💬</div>
                        <p className="text-gray-500 text-sm">No reviews available for this room theme</p>
                        <p className="text-gray-400 text-xs mt-1">
                          Hotel: {selectedHotelId || 1}, Theme: {roomTheme}
                        </p>
                      </div>
                    </div>
                  )}

                  {!loading && !error && reviews.length > 0 && (
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
                  )}
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