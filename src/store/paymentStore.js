import { create } from "zustand";

const usePaymentStore = create((set, get) => ({
  // Payment data
  totalPrice: 0,
  orderRemark: '',
  paymentMethod: 'wechat',
  
  // Order information
  orderData: {
    hotelId: null,
    themeName: '',
    roomCount: 1,
    checkIn: '',
    checkOut: '',
    userId: 1, // Default user ID, should be obtained from user authentication in real application
  },
  
  // Payment status
  isProcessing: false,
  paymentSuccess: false,
  
  // Actions
  setTotalPrice: (price) => set({ totalPrice: price }),
  
  setOrderRemark: (remark) => set({ orderRemark: remark }),
  
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  
  setOrderData: (data) => set(state => ({
    orderData: { ...state.orderData, ...data }
  })),
  
  setProcessing: (processing) => set({ isProcessing: processing }),
  
  setPaymentSuccess: (success) => set({ paymentSuccess: success }),
  
  // Get complete order data for API call
  getCompleteOrderData: () => {
    const state = get();
    return {
      hotelId: state.orderData.hotelId,
      themeName: state.orderData.themeName,
      roomCount: state.orderData.roomCount,
      checkIn: state.orderData.checkIn,
      checkOut: state.orderData.checkOut,
      totalPrice: state.totalPrice,
      userId: state.orderData.userId,
      orderRemark: state.orderRemark
    };
  },
  
  // Reset payment state
  resetPayment: () => set({
    totalPrice: 0,
    orderRemark: '',
    paymentMethod: 'wechat',
    isProcessing: false,
    paymentSuccess: false,
    orderData: {
      hotelId: null,
      themeName: '',
      roomCount: 1,
      checkIn: '',
      checkOut: '',
      userId: 1,
    }
  }),
  
  // Validation
  isOrderDataValid: () => {
    const { orderData, totalPrice } = get();
    return orderData.hotelId && 
           orderData.themeName && 
           orderData.checkIn && 
           orderData.checkOut && 
           orderData.roomCount > 0 && 
           totalPrice > 0;
  }
}));

export default usePaymentStore;