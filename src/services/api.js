import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://disneybookingbackend-production-4ce8.up.railway.app",
  timeout: 10000,
});

export const getHotelNames = async () => {
  const response = await apiClient.get('/api/hotels/names');
  return response.data;
};

export const searchHotels = async (searchParams) => {
  const response = await apiClient.post('/api/hotels/search', searchParams);
  return response.data;
};
//第二个页面从后台获取城市列表和主题列表
export const getHotelCities = async () => {
  const response = await apiClient.get('/api/hotels/cities');
  return response.data;
}

export const getHotelThemes = async () => {
  const response = await apiClient.get('/api/themes/names');
  return response.data;
}

// 根据条件查询房间
export const searchRooms = async (hotelId, checkIn, checkOut, availableRoomNumber) => {
  const response = await apiClient.get('/api/rooms', {
    params: {
      hotelId,
      checkIn,
      checkOut,
      availableRoomNumber
    }
  });
  return response.data;
};

export const getOrders = async () => {
  const response = await apiClient.get('api/users/1/orders');
  return response.data;
};

export const sentComments = async (orderId, commentData) => {
  const response = await apiClient.post(`/api/orders/${orderId}/comments`, {
    rating: commentData.rating,
    comment: commentData.comment
  });
  return response; // 返回完整的 response 对象，包含 status
};
// 获取房间评论
export const getRoomComments = async (hotelId, themeName) => {
  const response = await apiClient.get('/api/comments', {
    params: {
      hotelId,
      themeName
    }
  });
  return response.data;
};


export const cancelOrder = async (orderId) => {
  const response = await apiClient.patch(`/api/orders/${orderId}/cancel`);
  return response; // 返回完整的 response 对象，包含 status
}

// User API functions
export const getUserInfo = async (userId = 1) => {
  const response = await apiClient.get(`/api/users/${userId}`);
  return response.data;
};

export const changeUserPassword = async (userId = 1, oldPassword, newPassword) => {
  const response = await apiClient.put(`/api/users/${userId}/password`, {
    oldPassword,
    newPassword
  });
  return response.data;
};

export const getUserFootprints = async (userId = 1) => {
  const response = await apiClient.get(`/api/users/${userId}/footprints`);
  return response.data;
};

export const getUserAchievements = async (userId = 1) => {
  const response = await apiClient.get(`/api/users/${userId}/achievements`);
  return response.data;
};

// 创建订单
export const createOrder = async (orderData) => {
  const response = await apiClient.post('/api/orders', {
    hotelId: orderData.hotelId,
    themeName: orderData.themeName,
    roomCount: orderData.roomCount,
    checkIn: orderData.checkIn,
    checkOut: orderData.checkOut,
    totalPrice: orderData.totalPrice,
    userId: orderData.userId,
    orderRemark: orderData.orderRemark
  });
  return response.data;
};

export default apiClient;
