import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://disneybookingbackend-production.up.railway.app", 
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

export const getOrders=async()=>{
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

export const cancelOrder = async (orderId) => {
  const response = await apiClient.patch(`/api/orders/${orderId}/cancel`);
  return response; // 返回完整的 response 对象，包含 status
}

export default apiClient;
