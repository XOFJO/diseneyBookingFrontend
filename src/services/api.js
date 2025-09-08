import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://disneybookingbackend-production.up.railway.app", 
  timeout: 10000,
});

export const getHotelNames = async () => {
  const response = await apiClient.get('/api/hotels/names');
  return response.data;
};

export default apiClient;

