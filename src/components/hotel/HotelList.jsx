import { useEffect } from "react";
import HotelCard from "./HotelCard";
import useHotels from "../../hooks/useHotels";
import LoadingSpinner from "../common/LoadingSpinner";

function HotelList() {
  const { hotels, loading, error, searchHotels } = useHotels();

  // 组件加载时执行初始搜索（获取所有酒店）
  useEffect(() => {
    searchHotels({address: "", themes: []});
  }, [searchHotels]);

  const handleViewRoom = (hotelId) => {
    console.log('查看房间信息:', hotelId);
    // 这里之后会添加跳转到房间详情页的逻辑
  };

  const handleReview = (hotelId) => {
    console.log('查看评论:', hotelId);
    // 这里之后会添加查看评论的逻辑
  };

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div className="fixed left-1/2 top-48 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // 如果有错误，显示错误信息
  if (error) {
    return (
      <div className="fixed left-1/2 top-48 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
        <div className="flex justify-center items-center py-20">
          <div className="text-red-400 text-center">
            <p className="text-lg font-semibold mb-2">搜索失败</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // 如果没有酒店数据，显示空状态
  if (!hotels || hotels.length === 0) {
    return (
      <div className="fixed left-1/2 top-48 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-400 text-center">
            <p className="text-lg font-semibold mb-2">未找到酒店</p>
            <p className="text-sm">请尝试调整搜索条件</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-1/2 top-48 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="mb-4">
          <HotelCard
            image={hotel.images && hotel.images.length > 0 ? hotel.images[0] : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
            name={hotel.name || '未知酒店'}
            address={hotel.address || '地址未知'}
            description={hotel.description || '暂无描述'}
            price={hotel.minimumPrice || 0}
            themes={hotel.themes ? hotel.themes.map(theme => theme.themeName) : []}
            rating={typeof hotel.rating === 'number' ? hotel.rating : 4.5}
            onViewRoom={() => handleViewRoom(hotel.id)}
            onReview={() => handleReview(hotel.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default HotelList;