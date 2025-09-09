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

export default apiClient;

