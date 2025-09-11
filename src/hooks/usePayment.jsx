import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { createOrder } from '../services/api';
import usePaymentStore from '../store/paymentStore';
import useSearchStore from '../store/searchStore';
import useHotelStore from '../store/hotelStore';

const usePayment = () => {
  const { 
    totalPrice, 
    orderRemark, 
    paymentMethod,
    isProcessing,
    setProcessing,
    setPaymentSuccess,
    getCompleteOrderData,
    setOrderData,
    setTotalPrice,
    setOrderRemark,
    setPaymentMethod,
    isOrderDataValid
  } = usePaymentStore();

  const { selectedHotel, checkIn, checkOut, rooms } = useSearchStore();
  const { selectedHotelId } = useHotelStore();

  // Initialize order data with room and hotel information
  const initializeOrderData = useCallback((selectedRoom, actualRoomCount = null) => {
    const hotelId = selectedHotelId || selectedHotel?.id;
    const themeName = selectedRoom?.themeName || selectedRoom?.theme || '';
    
    setOrderData({
      hotelId: hotelId,
      themeName: themeName,
      roomCount: actualRoomCount !== null ? actualRoomCount : rooms,
      checkIn: checkIn,
      checkOut: checkOut
    });
  }, [selectedHotelId, selectedHotel, rooms, checkIn, checkOut, setOrderData]);

  // Update total price in payment store
  const updatePrice = useCallback((price) => {
    setTotalPrice(price);
  }, [setTotalPrice]);

  // Update order remarks in payment store
  const updateRemark = useCallback((remark) => {
    setOrderRemark(remark);
  }, [setOrderRemark]);

  // Update selected payment method
  const updatePaymentMethod = useCallback((method) => {
    setPaymentMethod(method);
  }, [setPaymentMethod]);

  // Handle payment process and API call
  const handlePayment = useCallback(async () => {
    if (!isOrderDataValid()) {
      toast.error('Order information is incomplete', {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    try {
      setProcessing(true);
      
      const orderData = getCompleteOrderData();
      console.log('Submitting order:', orderData);
      
      const response = await createOrder(orderData);
      console.log('Order created successfully:', response);
      
      setPaymentSuccess(true);
      
      toast.success('Payment successful! Your booking has been confirmed.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      return true;
    } catch (error) {
      console.error('Payment failed:', error);
      
      const errorMessage = error.response?.data?.message || 'Payment failed. Please try again.';
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      return false;
    } finally {
      setProcessing(false);
    }
  }, [isOrderDataValid, getCompleteOrderData, setProcessing, setPaymentSuccess]);

  return {
    // State
    totalPrice,
    orderRemark,
    paymentMethod,
    isProcessing,
    
    // Actions
    initializeOrderData,
    updatePrice,
    updateRemark,
    updatePaymentMethod,
    handlePayment,
    
    // Validation
    isOrderValid: isOrderDataValid
  };
};

export default usePayment;