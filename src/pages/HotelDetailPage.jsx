import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RoomForm from '../components/room/RoomForm'
import HotelDetailHeader from '../components/room/HotelDetailHeader'
import DisneyBackground from '../components/common/DisneyBackground'
import { useRooms } from '../hooks/useRooms'
import useHotelStore from '../store/hotelStore'
import useSearchStore from '../store/searchStore'

function HotelDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedHotelId, setSelectedHotelId } = useHotelStore();
  const { checkIn, checkOut, rooms: roomCount, setDateRange, setRooms } = useSearchStore();
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  
  // 从URL参数获取数据
  const hotelIdFromUrl = searchParams.get('hotelId');
  const checkInFromUrl = searchParams.get('checkIn');
  const checkOutFromUrl = searchParams.get('checkOut');
  const roomsFromUrl = searchParams.get('rooms');
  
  // 只在首次加载时同步URL参数到store
  useEffect(() => {
    // 只在组件首次挂载时执行一次
    const initializeFromUrl = () => {
      if (hotelIdFromUrl && hotelIdFromUrl !== selectedHotelId) {
        setSelectedHotelId(hotelIdFromUrl);
      }
      
      if (checkInFromUrl && checkOutFromUrl) {
        setDateRange(checkInFromUrl, checkOutFromUrl);
      }
      
      if (roomsFromUrl) {
        setRooms(parseInt(roomsFromUrl));
      }
      
      // 标记已初始化，触发首次数据加载
      setHasInitialLoad(true);
    };

    initializeFromUrl();
  }, []); // 空依赖数组，确保只在组件挂载时执行一次
  
  // 使用useRooms hook - 不自动获取数据，由搜索触发
  const { rooms: roomsData, loading: roomsLoading, error: roomsError, searchRooms } = useRooms(
    selectedHotelId || hotelIdFromUrl,
    checkIn || checkInFromUrl,
    checkOut || checkOutFromUrl,
    roomCount || parseInt(roomsFromUrl) || 1,
    false // 不自动获取数据
  );
  
  // 首次加载时获取数据
  useEffect(() => {
    if (hasInitialLoad && (selectedHotelId || hotelIdFromUrl) && (checkIn || checkInFromUrl) && (checkOut || checkOutFromUrl)) {
      searchRooms(
        selectedHotelId || hotelIdFromUrl,
        checkIn || checkInFromUrl,
        checkOut || checkOutFromUrl,
        roomCount || parseInt(roomsFromUrl) || 1
      );
    }
  }, [hasInitialLoad]);
  
  // 更新URL参数的函数
  const updateUrlParams = () => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedHotelId) newParams.set('hotelId', selectedHotelId);
    if (checkIn) newParams.set('checkIn', checkIn);
    if (checkOut) newParams.set('checkOut', checkOut);
    if (roomCount) newParams.set('rooms', roomCount.toString());
    setSearchParams(newParams);
  };
  
  // 搜索处理函数
  const handleSearch = () => {
    // 更新URL参数
    updateUrlParams();
    
    // 触发房间搜索
    if (selectedHotelId && checkIn && checkOut && roomCount) {
      searchRooms(selectedHotelId, checkIn, checkOut, roomCount);
    }
  };
  
  console.log('HotelDetailPage - Rooms Data:', { roomsData, roomsLoading, roomsError });
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Dedicated Hotel Detail Header - covers global header completely */}
      <HotelDetailHeader />
      
      {/* 迪士尼星空背景 */}
      <DisneyBackground />
      
      {/* Main Content - adjusted for header height */}
      <div className="relative z-10 p-4 flex items-center justify-center min-h-screen pt-24">
        <div className="w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw]">
          <RoomForm 
            roomsData={roomsData}
            roomsLoading={roomsLoading}
            roomsError={roomsError}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default HotelDetailPage