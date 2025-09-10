import { useState, useEffect } from 'react';
import { getRooms } from '../services/hotelService';

/**
 * 房间查询 Hook
 * @param {string} hotelId - 酒店ID
 * @param {string} checkIn - 入住日期
 * @param {string} checkOut - 退房日期
 * @param {number} availableRoomNumber - 需要的房间数量
 * @param {boolean} autoFetch - 是否自动获取数据（仅用于首次加载）
 */
export const useRooms = (hotelId, checkIn, checkOut, availableRoomNumber, autoFetch = false) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 只有在autoFetch为true且有必要参数时才自动获取数据（用于首次加载）
    if (!autoFetch || !hotelId || !checkIn || !checkOut || !availableRoomNumber) {
      return;
    }

    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const roomData = await getRooms(hotelId, checkIn, checkOut, availableRoomNumber);
        setRooms(roomData);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError(err.message || 'Failed to fetch rooms');
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [autoFetch]); // 只依赖autoFetch，不依赖其他参数

  // 手动搜索函数 - 使用当前传入的参数
  const searchRooms = async (searchHotelId, searchCheckIn, searchCheckOut, searchRoomNumber) => {
    if (!searchHotelId || !searchCheckIn || !searchCheckOut || !searchRoomNumber) {
      console.warn('Missing required parameters for room search');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const roomData = await getRooms(searchHotelId, searchCheckIn, searchCheckOut, searchRoomNumber);
      setRooms(roomData);
    } catch (err) {
      console.error('Error searching rooms:', err);
      setError(err.message || 'Failed to search rooms');
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // 手动刷新函数 - 使用hook参数
  const refetchRooms = async () => {
    return searchRooms(hotelId, checkIn, checkOut, availableRoomNumber);
  };
    
  return {
    rooms,
    loading,
    error,
    refetchRooms,
    searchRooms
  };
};

export default useRooms;
