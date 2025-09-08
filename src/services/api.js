import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://disneybookingbackend-production.up.railway.app", 
  timeout: 10000,
});

export default apiClient;

