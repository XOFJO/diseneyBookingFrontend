import React from "react";
import HotelCard from "./HotelCard";

function HotelList() {
  // 临时固定数据，之后会从后端接口获取
  const mockHotels = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      name: "豪华乐园景观房",
      address: "上海市浦东新区迪士尼大道1号",
      description: "享受迪士尼乐园的绝佳景观，配备2张双人床，可入住3位成人，房间宽敞舒适，设施齐全",
      price: 3154,
      themes: ["乐园景观", "亲子", "高档"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      name: "迪士尼城堡主题套房",
      address: "上海市浦东新区迪士尼大道888号",
      description: "独特的城堡主题装修，一室一厅布局，适合情侣入住，浪漫氛围浓厚，拥有私人阳台",
      price: 4280,
      themes: ["城堡主题", "浪漫", "套房", "情侣"]
    }
  ];

  const handleViewRoom = (hotelId) => {
    console.log('查看房间信息:', hotelId);
    // 这里之后会添加跳转到房间详情页的逻辑
  };

  const handleReview = (hotelId) => {
    console.log('查看评论:', hotelId);
    // 这里之后会添加查看评论的逻辑
  };

  return (
    <div className="fixed left-1/2 top-48 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
      {mockHotels.map((hotel) => (
        <div key={hotel.id} className="mb-4">
          <HotelCard
            image={hotel.image}
            name={hotel.name}
            address={hotel.address}
            description={hotel.description}
            price={hotel.price}
            themes={hotel.themes}
            onViewRoom={() => handleViewRoom(hotel.id)}
            onReview={() => handleReview(hotel.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default HotelList;