import React, { useEffect, useState } from "react";
import apiClient from "../../services/api"; // 引入 axios 客户端

function HotelList() {
  const [hotels, setHotels] = useState([]); // 状态存储酒店数据
  const [loading, setLoading] = useState(true); // 状态存储加载状态
  const [error, setError] = useState(null); // 状态存储错误信息

  useEffect(() => {
    // 使用 axios 获取酒店数据
    const fetchHotels = async () => {
      try {
        const response = await apiClient.get("/api/hotels/names"); // 调用 API
        setHotels(response.data); // 将数据存储到状态中
      } catch (err) {
        setError(err.message); // 捕获错误信息
      } finally {
        setLoading(false); // 设置加载完成
      } 
    };

    fetchHotels(); // 调用函数
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 显示加载状态
  }

  if (error) {
    return <div>Error: {error}</div>; // 显示错误信息
  }

  return (
    <div>
      <h1>Hotel List</h1>
      <ul>
        {hotels.map((hotel, index) => (
          <li key={index}>{hotel}</li> // 显示酒店名称
        ))}
      </ul>
    </div>
  );
}

export default HotelList;