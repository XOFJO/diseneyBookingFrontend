import { mockHotels } from "./mockData";

export const getHotels = async () => {
  // 模拟异步请求
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHotels), 500);
  });
};