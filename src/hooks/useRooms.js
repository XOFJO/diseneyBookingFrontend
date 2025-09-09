import { useState, useEffect } from 'react';
import { getRooms } from '../services/hotelService';

/**
 * 房间查询 Hook
 * @param {string} hotelId - 酒店ID
 * @param {string} checkIn - 入住日期
 * @param {string} checkOut - 退房日期
 * @param {number} availableRoomNumber - 需要的房间数量
 * @param {boolean} enabled - 是否启用查询（默认为true）
 */
export const useRooms = (hotelId, checkIn, checkOut, availableRoomNumber, enabled = true) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 如果未启用或缺少必要参数，则不执行查询
    if (!enabled || !hotelId || !checkIn || !checkOut || !availableRoomNumber) {
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
  }, [hotelId, checkIn, checkOut, availableRoomNumber, enabled]);

  // 手动刷新函数
  const refetchRooms = async () => {
    if (!hotelId || !checkIn || !checkOut || !availableRoomNumber) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const roomData = await getRooms(hotelId, checkIn, checkOut, availableRoomNumber);
      setRooms(roomData);
    } catch (err) {
      console.error('Error refetching rooms:', err);
      setError(err.message || 'Failed to fetch rooms');
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    rooms,
    loading,
    error,
    refetchRooms
  };
};

export default useRooms;
