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

export const getOrders = async () => {
  const response = await apiClient.get('api/users/1/orders');
  return response.data;
};

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

export default apiClient;

