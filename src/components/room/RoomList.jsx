import React from "react";
import RoomCard from "./RoomCard";

function RoomList() {
  // 临时固定数据，之后会从后端接口获取
  const mockRooms = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      name: "豪华乐园景观房",
      description: "享受迪士尼乐园的绝佳景观，配备2张双人床，可入住3位成人，房间宽敞舒适，设施齐全",
      price: 3154,
      theme: "乐园景观",
      rating: 4.7
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      name: "迪士尼城堡主题套房",
      description: "独特的城堡主题装修，一室一厅布局，适合情侣入住，浪漫氛围浓厚，拥有私人阳台",
      price: 4280,
      theme: "城堡主题",
      rating: 4.9
    }
  ];

  const handleViewRoom = (roomId) => {
    console.log('查看房间详情:', roomId);
    // 这里之后会添加跳转到房间详情页的逻辑
  };

  const handleReview = (roomId) => {
    console.log('查看评论:', roomId);
    // 这里之后会添加查看评论的逻辑
  };

  return (
    <div className="fixed left-1/2 top-48 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
      {mockRooms.map((room) => (
        <div key={room.id} className="mb-4">
          <RoomCard
            image={room.image}
            name={room.name}
            description={room.description}
            price={room.price}
            theme={room.theme}
            rating={room.rating}
            onViewRoom={() => handleViewRoom(room.id)}
            onReview={() => handleReview(room.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default RoomList;